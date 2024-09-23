import requests
import json
import os

FILE_PATH = 'cve_data.json'

def fetch_cve_data(api_key, startIndex=0, resultsPerPage=10):
    url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?startIndex={startIndex}&resultsPerPage={resultsPerPage}"
    headers = {
        'apiKey': api_key.strip()
    }

    print(f"Requesting URL: {url}")
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to fetch data. {e}")
        return

    data = response.json()
    print("API response data:", json.dumps(data, indent=4))  

    if 'vulnerabilities' not in data or not data['vulnerabilities']:
        print("No vulnerabilities found in the response.")
        return
    else:
        print(f"Fetched {len(data['vulnerabilities'])} vulnerabilities.")

   
    cve_data = {"vulnerabilities": []}
    if os.path.exists(FILE_PATH):
        try:
            with open(FILE_PATH, 'r') as f:
                cve_data = json.load(f)
            print(f"Existing data loaded from {FILE_PATH}")
        except json.JSONDecodeError:
            print("Error: Failed to decode JSON from the existing file. Creating a new one.")
        except IOError as e:
            print(f"Error: Unable to read the file. {e}")

    for item in data.get('vulnerabilities', []):
        print(f"Appending item: {item}")  
        cve_data['vulnerabilities'].append(item)

    
    print("Attempting to write data to file...")
    try:
        with open(FILE_PATH, 'w') as f:
            json.dump(cve_data, f, indent=4)
            f.flush()  
        print(f"Data successfully written to {FILE_PATH}")
    except IOError as e:
        print(f"Error: Unable to write to file. {e}")

if __name__ == "__main__":
    fetch_cve_data(api_key='798ff2e7-af8d-4332-90a2-60bd10a32559', startIndex=0, resultsPerPage=10)
