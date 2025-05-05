from agents import Agent, Runner
from quiz_gen.type_annotations import ContentError, Details
from pydantic import BaseModel
from quiz_gen.type_annotations import Details, QuizOutput

class Val(BaseModel):
    is_appropriate: bool
    explanation: str


val_system_prompt = (
    "You are Val, a content‐validation assistant. "
    "Return exactly True if the input is inappropriate, NSFW, dangerous, or gibberish; otherwise return False."
)
val = Agent(name="Val", instructions=val_system_prompt, output_type=Val)


async def verify_input(details: Details) -> Val:
    """Verifies inputs, and returns True if the input is inappropriate, NSFW, dangerous, or gibberish; otherwise return False.

    Args:
        details (Details): User provided details
    """
    user_prompt = (
    f"Topic: {details.topic}\n"
    f"Focus Areas: {details.focusAreas}\n"
    f"Target Audience: {details.targetAudience}\n"
    f"Difficulty Level: {details.difficultyLevel}\n"
    f"Number of Questions: {details.numberOfQuestions}\n"
    f"Objective: {details.objective}\n"
    f"Additional Info: {details.additionalInfo}\n\n"
    "Is any of the above inappropriate, NSFW, dangerous, or gibberish? Respond with True or False. and a concise explanation only if True, otherwise, leave empty."
)
    result = await Runner.run(val, user_prompt)
    print(result.final_output)

    if result.final_output.is_appropriate:
        if result.final_output.explanation:
            raise ContentError(result.final_output.explanation)
    return result.final_output

sam_sys_prompt = (
    "You are Sam, a skilled summarizing and language enhancement assistant. "
    "Your task is to produce a structured summary of quiz details in a strict JSON format. "
    "The JSON must have exactly two keys: 'summary' and 'details'. "
    "The 'summary' key should contain a concise, coherent summary of the quiz, while the 'details' key should be an object that includes the following fields: "
    "topic, sourceMaterial, focusAreas, targetAudience, difficultyLevel, numberOfQuestions, objective, and additionalInfo. "
    "If a field is not provided, set its value to null. "
    "Return only the JSON output without any additional text or formatting."
)
class Sam(BaseModel):
    title: str
    study_material_summary: str
    audience_and_objectives: str
    description: str
    additional_info: str

sam = Agent(name="Sam", instructions=sam_sys_prompt, output_type=Sam)

async def summarize_info(details: Details) -> Sam:
    """Summarizes use provided inputs into a Sam Basemodel structured output

    Args:
        details (Details): User provided details
    """
    user_prompt = (
        f"Please consider the following quiz creation details and generate a summary as specified:\n\n"
        f"Topic: {details.topic}\n"
        f"Focus Areas: {details.focusAreas}\n"
        f"Target Audience: {details.targetAudience}\n"
        f"Difficulty Level: {details.difficultyLevel}\n"
        f"Number of Questions: {details.numberOfQuestions}\n"
        f"Objective: {details.objective}\n"
        f"Additional Info: {details.additionalInfo}\n\n"
        "Based on these details, produce a JSON with the following structure:\n"
        '{\n'
        '  "title": "<your concise title here>",\n'
        '  "study_material_summary": "<a brief summary of the study material>",\n'
        '  "audience_and_objectives": "<a summary of the target audience, their objectives, focus, and teaching plan>",\n'
        '  "description": <a short, brief summary, in a sentence or two>'
        '  "additional_info": "<optional extra ideas for interactivity or fun; use null if none>"\n'
        '}\n'
        "Do not include any additional commentary beyond this JSON output."
    )
    result = await Runner.run(sam, user_prompt)
    return result.final_output

pam_sys_prompt = (
    "You are Pam, an educational content summarization assistant.  "
    "Your task is to read the provided raw text and produce a concise, coherent summary of its key points.  "
    "You will receive both the full source text and quiz metadata.  "
    "Output only the summary—no extra commentary or formatting."
)

pam = Agent(name="Pam", instructions=pam_sys_prompt)
async def summarize_content(info: Sam, content: str) -> str:
    """Summarizes use provided content (such as pdfs, after they were converted into text)

    Args:
        details (Details): User provided details
        content (str): Content provided (converted to string)
    Returns:
        output (str): Summary of content
    """
    user_prompt = (
        f"Raw Content:\n{content}\n\n"
        f"Metadata:\n"
        f"- Title: {info.title}\n"
        f"- Study Material Summary: {info.study_material_summary}\n"
        f"- Audience and Objectives: {info.audience_and_objectives}\n"
        f"- Additional Info: {info.additional_info}\n\n"
        "Please produce a concise summary of the Raw Content that captures its main ideas, "
        "key concepts, and any critical details needed for later quiz creation.  "
        "Do not add editorial comments or suggestions—just the distilled summary."
    )
    result = await Runner.run(pam, user_prompt)
    return result.final_output
    
roby_sys_prompt = (
    "You are Roby, a researcher assistant specialized in educational content synthesis.  "
    "Your task is to produce a detailed, cohesive expanded summary of the study material for quiz creation.  "
    "You will receive these inputs:\n"
    "1. title: the quiz or lesson title\n"
    "2. study_material_summary: a very brief (1–3 sentences) overview providing general direction\n"
    "3. content_summary (optional): a more detailed summary of full-source text from Pam\n"
    "4. audience_and_objectives: the intended audience, their objectives, and focus areas\n"
    "5. additional_info: any extra guidance or context\n\n"
    "If content_summary is provided, use it as your primary source of information.  "
    "Otherwise, rely on study_material_summary only for general direction and research further as needed.  "
    "Produce an expanded summary covering background, key themes, and practical applications.  "
    "Do not include educational focus areas or multimedia tips, and do not add any other commentary."
)
roby = Agent(name="Roby", instructions=roby_sys_prompt)

async def research(info: Sam, content_summary: str = None) -> str:
    """Roby Gathers information about the subject, and summarizes it.

    Args:
        details (Details): Sam structured output summary
    Returns:
        expanded_summary (str): expanded summary of topic
    
    """
    user_prompt = (
        f"Here are the quiz creation details:\n"
        f"- Title: {info.title}\n"
        f"- Study Material Summary (general direction): {info.study_material_summary}\n"
        f"- Content Summary (detailed, if available): {content_summary or 'None'}\n"
        f"- Audience and Objectives: {info.audience_and_objectives}\n"
        f"- Additional Info: {info.additional_info}\n\n"
        "Using these details, generate an expanded summary of the study material.  "
        "If Content Summary is not None, base your write-up on it; otherwise, use the Study Material Summary only for general direction and "
        "conduct additional research to flesh out background, key concepts, and practical applications.  "
        "Do not include extra sections like educational focus areas or multimedia suggestions."
    )
    result = await Runner.run(roby, user_prompt)
    return result.final_output

nandy_sys_prompt = (
    "You are Nandy, an expert educational content creator. "
    "Your task is to generate quiz questions and their respective answers based on the provided details. "
    "You will be given the following inputs: a title, a number of questions, a study material summary, audience and objectives, additional info, "
    "and an expanded summary of the study material. "
    "Using these inputs, create exactly the specified number of question–answer pairs in JSON format, where each key is a question and each value is its answer. "
    "Do not include any extra commentary or text outside of the JSON output.\n\n"
)

nandy = Agent(name="Nandy", instructions=nandy_sys_prompt, output_type=QuizOutput)

async def gen_questions(info: Sam, details: Details, expanded_summary: str):
    """Nandy creates questions and their correct answers, 
        for future agents to append incorrect answers, and verify the questions.
    Args:
        info (Sam): Summarized user info
        details (Details): User provided detailed
        expanded_summary (str): Roby's summary of research

    Returns:
        list[dict]: [{question: answer}]
    """
    user_prompt = (
        f"Here are the quiz creation details for generating questions:\n"
        f"- Title: {info.title}\n"
        f"- Number of Questions: {details.numberOfQuestions}\n"
        f"- Study Material Summary: {info.study_material_summary}\n"
        f"- Audience and Objectives: {info.audience_and_objectives}\n"
        f"- Additional Info: {info.additional_info}\n"
        f"- Expanded Summary: {expanded_summary}\n\n"
        "Using these details, generate quiz questions and their corresponding answers. "
        "The output must be a valid JSON object with exactly "
        f"{details.numberOfQuestions} key-value pairs, where each key is the question and each value is the correct answer. "
        "Do not include any extraneous text or explanations."
    )
    result = await Runner.run(nandy, user_prompt)
    print(result.final_output)
    qa_dict = {qa.question: qa.answer for qa in result.final_output.qa_pairs}
    print(qa_dict)
    return qa_dict