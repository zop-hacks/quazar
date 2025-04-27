from pydantic import BaseModel, Field
from typing import Optional, Any, Annotated, List
from enum import Enum

class QAPair(BaseModel):
    question: str
    answer: str

class QuizOutput(BaseModel):
    qa_pairs: List[QAPair]

class DifficultyLevelEnum(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"
    assistant = "assistant"

from pydantic import BaseModel, Field
from typing import Optional, Any, Annotated, List
from enum import Enum

class QAPair(BaseModel):
    question: str
    answer: str

class QuizOutput(BaseModel):
    qa_pairs: List[QAPair]

class DifficultyLevelEnum(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"
    assistant = "assistant"

class Details(BaseModel):
    token: str

    topic: Annotated[
        str,
        Field(
            min_length=2,
            max_length=100,
            description="Quiz topic must be at least 2 characters and at most 100 characters.",
        ),
    ]

    sourceMaterial: Optional[Any] = Field(
        default=None,
        description="Optional source material (any type).",
    )

    focusAreas: Optional[
        Annotated[
            str,
            Field(
                max_length=200,
                description="Focus areas must not exceed 200 characters.",
            ),
        ]
    ] = None

    targetAudience: Annotated[
        str,
        Field(
            min_length=2,
            max_length=100,
            description="Target audience must be at least 2 characters and at most 100 characters.",
        ),
    ]

    difficultyLevel: DifficultyLevelEnum = Field(
        ...,
        description="Difficulty level must be one of: easy, medium, hard, assistant.",
    )

    numberOfQuestions: Annotated[
        int,
        Field(
            ge=1,
            le=50,
            description="Number of questions must be between 1 and 50.",
        ),
    ]

    objective: Annotated[
        str,
        Field(
            min_length=2,
            max_length=300,
            description="Objective must be at least 2 characters and at most 300 characters.",
        ),
    ]

    additionalInfo: Optional[
        Annotated[
            str,
            Field(
                max_length=500,
                description="Additional information must not exceed 500 characters.",
            ),
        ]
    ] = None


class ContentError(Exception):
    """Exception raised for unrelated content.
    This error is raised whenever Val detects unrelated or dangerous content.

    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return self.message

class FileError(Exception):
    """Exception raised for unsupported file formats. or for Content being over the token limit.
    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return self.message

class QuestionCreatingError(Exception):
    """Error raised on rare edge agent cases, when Blip finds a question to be wrong more than 5 times.
    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return self.message


class ContentError(Exception):
    """Exception raised for unrelated content.
    This error is raised whenever Val detects unrelated or dangerous content.

    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return self.message

class FileError(Exception):
    """Exception raised for unsupported file formats. or for Content being over the token limit.
    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return self.message

class QuestionCreatingError(Exception):
    """Error raised on rare edge agent cases, when Blip finds a question to be wrong more than 5 times.
    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    
    def __str__(self):
        return self.message