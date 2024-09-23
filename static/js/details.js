async function fetchCveDetails(cveId) {
    try {
        const response = await fetch(`/api/cve/${cveId}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('cve-details').innerHTML = data.error;
            return;
        }

        const cve = data.cve;

        // Populate CVE ID
        document.getElementById('cve-id').textContent = cve.id;

        // Populate description
        const descriptionObj = cve.descriptions.find(d => d.lang === 'en');
        document.getElementById('cve-description').textContent = descriptionObj ? descriptionObj.value : 'No description available';

        // Populate CVSS V2 metrics
        const cvssMetricV2 = cve.metrics.cvssMetricV2[0];
        document.getElementById('cve-severity').textContent = cvssMetricV2.baseSeverity || 'N/A';
        document.getElementById('cve-score').textContent = cvssMetricV2.cvssData.baseScore || 'N/A';
        document.getElementById('cve-vector').textContent = cvssMetricV2.cvssData.vectorString || 'N/A';
        document.getElementById('cve-exploitabilty-score').textContent = cvssMetricV2.exploitabilityScore || 'N/A';
        document.getElementById('cve-impact-score').textContent = cvssMetricV2.impactScore || 'N/A';

        // Populate detailed metrics
        const metrics = cvssMetricV2.cvssData;
        document.getElementById('cve-access-vector').textContent = metrics.accessVector || 'N/A';
        document.getElementById('cve-access-complexity').textContent = metrics.accessComplexity || 'N/A';
        document.getElementById('cve-authentication').textContent = metrics.authentication || 'N/A';
        document.getElementById('cve-confidentiality-impact').textContent = metrics.confidentialityImpact || 'N/A';
        document.getElementById('cve-integrity-impact').textContent = metrics.integrityImpact || 'N/A';
        document.getElementById('cve-availability-impact').textContent = metrics.availabilityImpact || 'N/A';

        // Populate CPE table
        const cpeTable = document.getElementById('cpe-table-body');
        cpeTable.innerHTML = '';  // Clear existing rows

        const cpeMatches = cve.configurations[0]?.nodes[0]?.cpeMatch || [];
        if (cpeMatches.length > 0) {
            cpeMatches.forEach(entry => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${entry.criteria}</td>
                    <td>${entry.matchCriteriaId}</td>
                    <td>${entry.vulnerable}</td>
                `;
                cpeTable.appendChild(tr);
            });
        } else {
            cpeTable.innerHTML = '<tr><td colspan="3">No CPE data available</td></tr>';
        }

    } catch (error) {
        console.error('Error fetching CVE details:', error);
        document.getElementById('cve-details').textContent = 'An error occurred while loading data.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cveId = "{{ cve_id }}";  // Use dynamic CVE ID from template
    fetchCveDetails(cveId);
});
