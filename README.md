# Quazar
<img src="assets/quazar_logo.png" alt="quazar logo" width="200" />
**Live Demo:** https://quazar--quazarai.us-central1.hosted.app/

Quazar is an open-source, hackathon-born web app that uses a chain of LLM-powered agents to generate and host live, interactive multiplayer quizzes—no manual question writing required.

---

# 🚀 Features
- **Quiz Generation:** Generate multiple choice questins on any topic, in under a minute (per quiz), using multiple Agents, that verifies input, summarizes it, researches about a topic, creates questions, and         
  validates them (explained more in details below).
- **Multiplayer Gameplay:** Host games, join via room code, real-time leaderboards, and most importantly, learn and have fun!
- **Quiz Analytics**: Easily get detailed analytics generated from your games, made for teachers who want to know how well did their quiz go.
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

1. The user chooses a quiz from its list of generated quizzes. And then emits the server with the quizUrl in a host event.
2. The server receives the url from the host, and identfies it as a one, by saving it as a session of type "host". Then the server emits back to the host with a RoomId (e.g. 522192)
3. Then, players can connect to the game, with the roomID, emitting to the host "player_joined"
4. The server saves them, and identifies them as players.
5. When the host clicks on the start button, an object of question and answers will be emitted to both the player and host.
6. If a player clicks on an answer, it sends it to the host, where it's validated
7. If the user is right, score will be added based on the duration it took to respond
8. If either a question runs out of time, or the host ended the question, it emits to the server, which emits back a leaderboard to both the client and the host.
9. This goes until the questions end, when the server detects a final_question, it'll send a final_leaderboard instead of the regular leaderboard, which showcases the winners, instead of a regular leaderboard.
    
## Analytics
1. The player's response data is being saved in the end of every game, to the supabase DB.
2. When a user (teacher) clicks on the Analytics panel, a list of all of the game analytics generated automatically will appear. when a teacher clicks on a one, it transforms the data into useful analytics, and visuallizes them.
3. when the user clicks on the AI summary button, it summarizes these analytics into conclusions, and explains them in a consise, easily understandable natural language.

---
## 🚧 Setup
Prerequesits: 
1. A supabase account
2. nodejs and python with pip
3. an openai API key

1. Clone the repo
2. create a .env inside of the api folder, with 
```.env
OPENAI_API_KEY=<>
SUPABASE_ANON_KEY=<>
SUPABASE_URL=<>
```
3. create a .env.local inside of the app dir
---

Made with ❤️ by ZOP 
Submitted to the [AlgoArena Hackathon](https://algoarena.devpost.com/)  
