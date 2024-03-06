import PyPDF2

def chunk_pdf(pdf_file, limit=4000, overlap=1000):
    chunks = []
    chunk =" "
    with open(pdf_file, "rb") as f:
        pdf = PyPDF2.PdfReader(f)
        for page in pdf.pages:
            chunk += page.extract_text()
            while len(chunk) > limit:
                chunks.append(chunk[:limit])
                chunk = chunk[limit:]
    
    if len(chunk):
        chunks.append(chunk)
        
    return chunks

print(chunk_pdf("immi.pdf"))
            
            
