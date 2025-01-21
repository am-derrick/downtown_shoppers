import requests
import os
from dotenv import load_dotenv

load_dotenv()

def test_auth():
    auth_url = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken"
    
    consumer_key = os.getenv('PESAPAL_CONSUMER_KEY').strip()
    consumer_secret = os.getenv('PESAPAL_CONSUMER_SECRET').strip()
    
    print(f"Consumer Key length: {len(consumer_key)}")
    print(f"Consumer Secret length: {len(consumer_secret)}")
    
    auth_data = {
        "consumer_key": consumer_key,
        "consumer_secret": consumer_secret
    }
    
    response = requests.post(
        auth_url,
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json=auth_data
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    test_auth()