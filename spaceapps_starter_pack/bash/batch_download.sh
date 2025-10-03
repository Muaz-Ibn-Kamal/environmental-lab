#!/usr/bin/env bash
set -euo pipefail
URL_LIST="${1:-urls.txt}"; COOKIE_JAR=".ed_cookies"; NETRC="$HOME/.netrc"
[ -f "$URL_LIST" ] || { echo "Provide a file with one URL per line."; exit 1; }
[ -f "$NETRC" ] || { cat <<EOF
Create ~/.netrc with Earthdata credentials:
machine urs.earthdata.nasa.gov
  login YOUR_USERNAME
  password YOUR_PASSWORD
EOF
exit 1; }
mkdir -p downloads
while IFS= read -r url; do
  [ -z "$url" ] && continue
  echo "Downloading: $url"
  curl -L -b "$COOKIE_JAR" -c "$COOKIE_JAR" --netrc-file "$NETRC" -o "downloads/$(basename "$url")" "$url"
done < "$URL_LIST"
echo "Done. Files in ./downloads"
