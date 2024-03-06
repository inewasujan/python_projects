import pdf_reader
import lookup
import gpt

question = "Tax file number?"
keywords = question.split(" ")

chunks = pdf_reader.chunk_pdf("immi.pdf")
matches= lookup.find_matches(chunks, keywords)

for chunk_id in matches.keys():    
    chunk = chunks[chunk_id]
    response = gpt.answer_question(chunk, question)
    break

print(response)