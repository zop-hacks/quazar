from agents import Agent, Runner
from fastapi import APIRouter, Depends
from routes.type_annotations import AnalyticsData
from utils.auth_user_jwt import verify_jwt, supabase
from typing import List, Tuple
from time import sleep
router = APIRouter(prefix='/sum-info')


zoe_sys_prompt = (
    "You are Zoe, an assistant specializing in quiz analytics summaries. You receive structured quiz data in JSON form containing the following fields: player_count, quiz_conclusion, avg_questions, understood_well, fairly_understood, and hard_questions. Your job is to read those inputs and produce a concise, upbeat summary (no more than 3–4 sentences) that highlights the key takeaways: overall player performance, engagement, mastery levels, and any flagged hard questions."
    "Always write in complete sentences, avoid jargon, and keep your summary under 80 words."
)

zoe = Agent(name="zoe", instructions=zoe_sys_prompt, model="gpt-4.1-mini")


@router.post('/')
async def summarize_info(analytics: AnalyticsData, user=Depends(verify_jwt)):
    response = (
        supabase.table("game_results")
        .select("player_count, info_summary").eq("id", analytics.id).eq("user_id", user.user.id)
        .execute()
    )
    player_count = response.data[0].get("player_count", None)
    # if info_summary exists, return it.
    if response.data[0].get("info_summary", None):
        return response.data[0].get("info_summary", None)
    
    quiz_conclusion = await get_quiz_conclusion(analytics)
    struggling, afk, understood_well, fairly_understood = await get_player_stats(analytics)
    print(understood_well, fairly_understood, type(understood_well), type(fairly_understood))
    user_prompt = (
    f"player_count: {player_count}"
    f"quiz_conclusion: {quiz_conclusion}"
    f"avg_questions: {analytics.avg_questions}"
    f"understood_well: {understood_well}"
    f"fairly_understood: {fairly_understood}"
    f"hard_questions: {analytics.hard_questions}"
    "Please provide a brief summary of these results." )
    
    result = await Runner.run(zoe, user_prompt )
    print(result.final_output)
    info_sum = {"summary": result.final_output, "struggling_players": struggling, "afk_players": afk, "understood_well": understood_well, "fairly_understood": fairly_understood}
    response = (
        supabase.table("game_results")
        .update({"info_summary": info_sum})
        .eq("user_id", user.user.id).eq("id", analytics.id)
        .execute()
    )
    return info_sum

async def get_quiz_conclusion(data: AnalyticsData) -> str:
    """
    Return a high-level conclusion about the quiz based on average performance thresholds.
    """
    avg = data.avg_questions
    correct_pct = avg.correct * 100
    wrong_pct = avg.wrong * 100
    not_pct = avg.not_answered * 100

    if correct_pct > 70 and wrong_pct < 20 and not_pct < 10:
        return "Overall, players understood the learning material well."

    if 50 <= correct_pct <= 70 and wrong_pct < 40 and not_pct < 20:
        return "Overall, players fairly understood the learning material."

    if 30 <= correct_pct < 50 and wrong_pct > 40:
        return "Overall, players struggled through the quiz."

    if correct_pct < 30 and wrong_pct > 50:
        return "Overall, players had a hard time with the quiz."

    return "Overall performance is mixed; consider reviewing specific questions."


async def get_player_stats(
    data: AnalyticsData,
) -> Tuple[List[str], List[str], int, int]:
    """
    Identify players who struggled, went AFK, and count those who understood well or fairly well.
    Args:
        data(AnalyticsData): quiz analytics
    Returns:
      struggling: names of players who attempted most but had 30-50% correct
      afk: names of players who idled for >80% of questions
      count_understood_well: number of players with >70% correct
      count_fairly_understood: number of players with 50-70% correct
    """
    struggling: List[str] = []
    afk: List[str] = []
    understood_well = 0
    fairly_understood = 0

    for p in data.player_analytics:
        attempted_pct = (p.total - p.not_answered) / p.total * 100
        correct_pct = p.correct / p.total * 100
        wrong_pct = p.wrong / p.total * 100
        not_pct = p.not_answered / p.total * 100

        # AFKs
        if attempted_pct < 20:
            afk.append(p.username)
            continue

        # Struggled players
        if attempted_pct >= 80 and 30 <= correct_pct < 50 and wrong_pct > 40:
            struggling.append(p.username)
            continue

        # Understood well
        if attempted_pct >= 80 and correct_pct > 70 and wrong_pct < 20 and not_pct < 10:
            understood_well += 1
            continue

        # Fairly understood
        if attempted_pct >= 80 and 50 <= correct_pct <= 70 and wrong_pct <= 40 and not_pct <= 20:
            fairly_understood += 1

    return struggling, afk, understood_well, fairly_understood
