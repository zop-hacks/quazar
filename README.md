# Quazar
<img src="assets/quazar_logo.png" alt="quazar logo" width="200" />
**Live Demo:** https://quazar--quazarai.us-central1.hosted.app/

Quazar is an open-source, hackathon-born web app that uses a chain of LLM-powered agents to generate and host live, interactive multiplayer quizzes—no manual question writing required.

self hosting setup: [Self-Host](README.md#-setup)
---

# 🚀 Features
- **Quiz Generation:** Generate multiple choice questins on any topic, in under a minute (per quiz), using multiple Agents, that verifies input, summarizes it, researches about a topic, creates questions, and         
  validates them. [explained in more details below](#quiz-generation)
- **Multiplayer Gameplay:** Host games, join via room code, real-time leaderboards, and most importantly, learn and have fun! [explained in more details below](#multiplayer-game-flow)
- **Quiz Analytics**: Easily get detailed analytics generated from your games, made for teachers who want to know how well did their quiz go.[explained in more details below](#analytics)
  the analytics can be easily summarized into conclusions, by clicking on the *AI summary button*.
- **Edit Quizzes**: Modify, delete, or add questions, it's self-explanatory.
---

# 🔍 Architecture
## Quiz Generation
The user info is emitted to the FastAPI server using socketio, in order to provide the user with messages, of the current state of the quiz (such as summarizing)
A quiz is generated using multiple LLMs, in the following structure:
![Agent Pipeline Diagram](assets/agents.png)

| Agent  | Role                                                                 |
|--------|----------------------------------------------------------------------|
| **Val**  | Validates inputs; rejects NSFW/dangerous/gibberish with `ContentError`. |
| **Sam**  | Structures your topic/details into a strict JSON schema.            |
| **Pam**  | (Optional) Summarizes any uploaded PDFs or docs.                    |
| **Roby** | Enriches Sam’s skeleton with background research and key concepts.  |
| **Nandy**| Generates the initial set of Q&A pairs (exactly as many as you request). |
| **Mal**  | Polishes each into a timed MCQ with three distractors.              |
| **Blip** | Reviews clarity & audience fit—flags errors for regeneration.      |
| **Nan**  | Fallback: replaces any flagged question with a fresh one.           |
---

after a quiz is generated, it's being saved on a supabase DB.

## Multiplayer Game Flow

1. The user (teacher) chooses a quiz from its list of generated quizzes. And then emits the server with the quizUrl in a host event.
2. The server receives the url from the host, and identfies it as a one, by saving it as a session of type "host". Then the server emits "room_created" back to the host with a room_id (e.g. 522192). and the host enters a "lobby" state, displaying players that joined.
3. Then, players can connect to the game, with the room_id, emitting to the server with "connect_player" and their room_id.
4. The server saves them, and identifies them as players.
5. When the host clicks on the start button, an object of question and answers will be emitted to both the player and host, "question_response" for the host and "client_question_response" for the player. and a default question_status of "not_answered" will be set automatically for all players, and change if the player will answer.
6. If a player clicks on an answer, it sends it to the host, where it's validated. the server will save the current score of the player, and the question_status.
7. If the user is right, score will be added based on the duration it took to respond, either way, the server will save a new status message, "right", "wrong", or "not_answered" if answered late.
8. If either a question runs out of time, or the host ended the question, it emits to the server, which emits back a leaderboard to both the client and the host.
9. This goes until the questions end, when the server detects a final_question, it'll send a final_leaderboard instead of the regular leaderboard, which showcases the winners, instead of a regular leaderboard.

#### Scoring
When a player answers, we compute their score as:
- **maxScore** = 1000  
- **minScore** = 500  
- **totalTime** = question time limit in seconds  
- **responseTime** = seconds until the player answered

score = round(min_score + (max_score-min_score) * ((total_secs-time_taken)/total_secs)**1.5)

## Analytics
1. The player's response data is being saved in the end of every game, to the supabase DB.
2. When a user (teacher) clicks on the Analytics panel, a list of all of the game analytics generated automatically will appear. when a teacher clicks on a one, it transforms the data into useful analytics, and visuallizes them.
3. when the user clicks on the AI summary button, it summarizes these analytics into conclusions, and explains them in a consise, easily understandable natural language.

---
## 🚧 Setup
I would highly advise to [try the demo](https://quazar--quazarai.us-central1.hosted.app) instead, since this setup is quite complex.

Prerequesits: 
1. A supabase account
2. nodejs, (with pnpm) and python with pip
3. an openai API key

1. Clone the repo
2. create a .env inside of the api folder, with 
```.env
OPENAI_API_KEY=<>
SUPABASE_ANON_KEY=<>
SUPABASE_URL=<>
```
3. create a .env.local inside of the app dir with a
   ```
   NEXT_PUBLIC_SUPABASE_URL=<>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<>
   ```
4. create a two supabase tables, of "quizzes" (for saving quizzes) and "game_results" (for saving analytics)

quizzes:
``` sql
create table public.quizzes (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  title text not null,
  questions jsonb not null,
  user_id uuid not null,
  is_public boolean not null default false,
  url uuid null default gen_random_uuid (),
  description text null,
  gathered_info text null,
  user_info jsonb null,
  constraint quizzes_pkey primary key (id),
  constraint quizzes_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete set null
) TABLESPACE pg_default;
```
game_results:
``` sql
create table public.game_results (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  user_id uuid not null default auth.uid (),
  player_data jsonb not null,
  question_results jsonb not null,
  player_count smallint not null,
  info_summary jsonb null,
  raw_data jsonb not null,
  quiz_title text not null,
  constraint game_results_pkey primary key (id),
  constraint game_results_user_id_fkey foreign KEY (user_id) references auth.users (id)
) TABLESPACE pg_default;
```
5. goto the api directory, and install the requirements.txt, or your hosting provider with pip install -r requirements.txt
6. goto the app directory, and install the pnpm packages with pnpm i.
7. run pnpm run dev to start the client application
8. and open a seperate terminal, and run uvicorn main:app --host 0.0.0.0 --port 8000.
9. in app/lib/utils.ts change the API_ADRESS to localhost:8000, or your own api address.


---

Made with ❤️ by ZOP 
