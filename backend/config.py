from dotenv import load_dotenv; load_dotenv()
import os
MONGO_URL="mongodb+srv://{}:{}@org-cluster.wjpxb.mongodb.net/{}?retryWrites=true&w=majority".format(
    os.getenv("MONGO_USER"),
    os.getenv("MONGO_PW"),
    os.getenv("MONGO_DB"),
)