from os import abort
from flask import Flask, render_template, request, jsonify
import json
import requests
'''BASE_URL = "https://services.nvd.nist.gov/rest/json/cve/2.0"'''
def get_cve_by_id(cve_id):
    url = f"https://services.nvd.nist.gov/rest/json/cve/2.0"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  
    else:
        return None
app = Flask(__name__)
@app.route('/cves/list')
def cve_list():
    with open('cve_data.json') as f:
        data = json.load(f)

    
    if 'vulnerabilities' not in data:
        return "No CVE data available", 404

    vulnerabilities = data['vulnerabilities']

    page = int(request.args.get('page', 1))
    per_page = 10
    total_records = len(vulnerabilities)
    start_index = (page - 1) * per_page
    end_index = start_index + per_page
    cves = vulnerabilities[start_index:end_index]

    return render_template('index.html', cves=cves, page=page, per_page=per_page, total_records=total_records)

@app.route('/cve/details/<cve_id>')
def cve_details(cve_id):
    with open('cve_data.json') as f:
        data = json.load(f)
    
  
    cve = next((item for item in data.get('vulnerabilities', []) if item['cve']['id'] == cve_id), None)
    
    if cve is None:
        return "CVE not found", 404
    
    return render_template('cve_detail.html', cve=cve)
if __name__ == '__main__':
    app.run(debug=True)
