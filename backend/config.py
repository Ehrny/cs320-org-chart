from dotenv import load_dotenv
from pathlib import Path
import os

MONGO_URL = None
MONGO_DB = None

def load_config(configname):
    global MONGO_URL
    global MONGO_DB # This is nonsense

    print("CONFIGNAME", configname)
    
    env_path = Path('.') / configname
    load_dotenv(env_path)

    MONGO_URL = os.getenv("MONGO_URL")
    if MONGO_URL == None:
        MONGO_URL = "mongodb+srv://{}:{}@org-cluster.wjpxb.mongodb.net/{}?retryWrites=true&w=majority".format(
            os.getenv("MONGO_USER"),
            os.getenv("MONGO_PW"),
            os.getenv("MONGO_DB"),
        )
    
    MONGO_DB = os.getenv("MONGO_DB")

