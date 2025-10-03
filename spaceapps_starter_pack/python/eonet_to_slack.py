import os, json, requests
CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config.json")
SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL")
if os.path.exists(CONFIG_PATH):
    with open(CONFIG_PATH) as cf:
        SLACK_WEBHOOK_URL = SLACK_WEBHOOK_URL or json.load(cf).get("SLACK_WEBHOOK_URL")
if not SLACK_WEBHOOK_URL: raise SystemExit("Set SLACK_WEBHOOK_URL env or config.json")
EVENTS_URL = "https://eonet.gsfc.nasa.gov/api/v3/events?status=open"
resp = requests.get(EVENTS_URL, timeout=30); resp.raise_for_status(); events = resp.json().get("events", [])
for e in events[:5]:
  title=e.get("title"); cat=", ".join([c.get("title","") for c in e.get("categories", [])])
  url=e.get("sources", [{}])[0].get("url", "https://eonet.gsfc.nasa.gov/")
  requests.post(SLACK_WEBHOOK_URL, json={"text": f"New EONET Event: *{title}*\nCategory: {cat}\n{url}"}, timeout=15)
print("Posted", min(5,len(events)), "events to Slack.")
