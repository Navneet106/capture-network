from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock function to read processed data
def read_processed_data():
    with open("data/processed_data.json", "r") as file:
        return json.load(file)

@app.get("/")
def home():
    return {"message": "Network Traffic Monitor API"}

@app.get("/traffic")
def get_traffic():
    data = read_processed_data()
    return data
# To run the file 
# sudo myenv/bin/python backend/packet_processor.py 