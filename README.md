# NVD-API-Management
This project, involving the consumption of CVE data from the NVD API, covers the end-to-end workflow, from fetching the data, cleaning, storing, and providing a UI for interaction. Here's a summary of the approach:

#Problem Breakdown:#
#CVE Data Consumption:

The project consumes CVE information via the NVD API.
To handle large datasets, the API supports pagination using startIndex and resultsPerPage. This allows data fetching in chunks, ensuring scalability.
#Data Cleansing and Storage:

Data is cleaned to remove duplicates and ensure quality.
The cleaned data is stored in a JSON file (cve_data.json) which serves as the project's database. This could be easily replaced with a more robust database (e.g., SQLite, PostgreSQL) if needed.
Synchronization in Batch Mode:

The data synchronization runs periodically to refresh the stored CVE details.
This can be customized to run a full data refresh or incrementally update the modified data.
Develop API:

#Flask-based APIs are developed to allow querying of CVE data by multiple parameters:
CVE ID
CVE ID's year
CVE Score
Last modified within N days.
API documentation is structured to detail each operation and its parameters.
#Frontend Visualization:

A clean and simple web interface is created using HTML, CSS, and JavaScript.
A paginated table displays CVE entries with navigation.
Detailed CVE pages show CVSS metrics, descriptions, and other relevant information.
#Testing and Best Practices:

Unit tests are designed to ensure that API endpoints function correctly.
Code follows industry best practices with clear documentation and safe coding techniques.
Code:
Backend (app.py and fetch_cv.py):

app.py: Flask app for serving the UI and APIs.
fetch_cv.py: Script for fetching and storing CVE data.
Frontend:

HTML templates (index.html, cve-detail.html) provide the layout for the list view and detailed view.
CSS files (styles.css, styles1.css) for a clean and responsive interface.

Input and Output:
Input:
Input to the system is the API response fetched from the NVD endpoint.
Output:
Output is a paginated web view of CVE entries along with detailed views for each CVE.
Screenshots:
screenshots of the UI rendering the list of CVEs and a detailed CVE page after deploying the Flask app locally is in the file


#STEPS TO RUN THE PROJECT
1. Create a Virtual Environment (if not already created):
Open a terminal and navigate to project directory.
Run the following command to create a virtual environment:

code
python -m venv env

This will create a virtual environment named env in your project directory.

2. Activate the Virtual Environment:
On Windows:

code
.\env\Scripts\activate

On macOS/Linux:

Copy code
source env/bin/activate

Once activated, your terminal should show the name of the environment in parentheses, like (env).

3. Install dependencies:
If your project has dependencies, you can install them with pip after activating the environment:

code
pip install -r requirements.txt

4. Run Python Files:
After activating the virtual environment, you can run your Python files as you normally would:

  To store the data in your json file

code
python fetch_cve.py

To run the flask application

code
python app.py


5. Deactivate the Environment:
When you're done, deactivate the virtual environment by running
Code
.\env\Scripts\deactivate


Regards
Taniya Johnson
