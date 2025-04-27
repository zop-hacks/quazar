from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from quiz import socket_app

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000", "http://localhost:3001","https://localhost", "http://localhost", "https://quizar-app--quazar-test001.us-central1.hosted.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/ws", app=socket_app)