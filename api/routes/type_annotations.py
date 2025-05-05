from typing import List
from pydantic import BaseModel, Field

class QuestionAnalytics(BaseModel):
    question: str
    correct: int
    wrong: int
    not_answered: int
    total: int
    correct_percentage: float = Field(..., alias="correctPercentage")

class PlayerAnalytics(BaseModel):
    username: str
    correct: int
    wrong: int
    not_answered: int
    total: int
    correct_percentage: float = Field(..., alias="correctPercentage")

class AverageQuestions(BaseModel): 
    correct: float
    wrong: float
    not_answered: float

class AnalyticsData(BaseModel):
    question_analytics: List[QuestionAnalytics]
    player_analytics: List[PlayerAnalytics]
    hard_questions: List[QuestionAnalytics] = None
    easy_questions: List[QuestionAnalytics] = None
    avg_questions: AverageQuestions
    id: int
