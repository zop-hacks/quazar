import asyncio
import httpx
import os
import mimetypes
import tempfile
from pdfminer.high_level import extract_text
import tiktoken

from quiz_gen.type_annotations import FileError

async def file_handler(source_url: str):
    # Download the file
    async with httpx.AsyncClient() as client:
        resp = await client.get(source_url)
        resp.raise_for_status()
        data = resp.content

    content_type = resp.headers.get("content-type", "").split(";")[0].strip()
    ext = mimetypes.guess_extension(content_type) or ""
    if not ext:
        path_part = source_url.rsplit("/", 1)[-1]
        _, ext = os.path.splitext(path_part)
    ext = ext.lower()

    # Creates a temp file
    with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
        local_path = tmp.name
        tmp.write(data)

    try:
        # If it’s a PDF, extract text & count tokens
        if ext == ".pdf":
            raw_text = await extract_pdf_text(local_path)
            num_tokens = await count_tokens(raw_text)
            if num_tokens < 15000:
                return raw_text
            else: 
                raise FileError(f"File/s over the token limit of 15000. [{num_tokens}]")
        else:
            raise FileError(f"Unsuported file format [{ext}]")
    finally:
        # cleanup
        if os.path.exists(local_path):
            os.remove(local_path)



async def extract_pdf_text(path: str) -> str:
    """
    Async wrapper around pdfminer.six's extract_text.
    """
    return await asyncio.to_thread(extract_text, path) or ""


async def count_tokens(text: str, model_name: str = "gpt-3.5-turbo") -> int:
    """
    Async wrapper around tiktoken encoding.
    """
    def _count():
        enc = tiktoken.encoding_for_model(model_name)
        return len(enc.encode(text))
    return await asyncio.to_thread(_count)
