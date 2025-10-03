import requests
CMR = "https://cmr.earthdata.nasa.gov/search/granules.json"
params = {"short_name":"MCD12Q1","version":"061","temporal":"2025-01-01T00:00:00Z,2025-01-31T23:59:59Z","bounding_box":"88,20,93,26","page_size":10}
r = requests.get(CMR, params=params, timeout=60); r.raise_for_status(); js = r.json()
links=[]; 
for e in js.get("feed",{}).get("entry",[]): 
  for l in e.get("links",[]): 
    h=l.get("href"); 
    if h and h.startswith("http"): links.append(h)
print("Found", len(links), "links. Example:"); 
for h in links[:5]: print(h)
