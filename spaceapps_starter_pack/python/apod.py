import os, json, requests, datetime
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config.json")
NASA_API_KEY = os.environ.get("NASA_API_KEY", "DEMO_KEY")
if os.path.exists(CONFIG_PATH):
    with open(CONFIG_PATH) as cf:
        NASA_API_KEY = json.load(cf).get("NASA_API_KEY", NASA_API_KEY)
date = datetime.date.today().isoformat()
url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={date}"
r = requests.get(url, timeout=30); r.raise_for_status(); data = r.json()
print("APOD:", data.get("title")); print("Date:", data.get("date")); print("URL:", data.get("url"))
print("Explanation:", (data.get("explanation") or "")[:300], "...")
