async function fetchCveList() {
    try {
        const response = await fetch('/api/cves');
        const data = await response.json();

        const cveTable = document.getElementById('cve-table-body');
        cveTable.innerHTML = ''; 

        if (data.cves && data.cves.length > 0) {
            data.cves.forEach(cve => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><a href="/cve/details/${cve.cve_id}">${cve.cve_id}</a></td>
                    <td>${cve.source_identifier}</td>
                    <td>${new Date(cve.published_date).toLocaleDateString('en-GB') || 'N/A'}</td>
                    <td>${new Date(cve.last_modified).toLocaleDateString('en-GB') || 'N/A'}</td>
                    <td>${cve.status || 'N/A'}</td>
                `;
                cveTable.appendChild(tr);
            });
             
            document.getElementById('total-records').textContent = `Total Records: ${data.total_records}`;
            document.getElementById('current-page').textContent = `Page: ${data.page}`;
         } else {
             cveTable.innerHTML = '<tr><td colspan="5">No CVE data available</td></tr>';
         }
        
    } catch (error) {
        console.error('Error fetching CVE list:', error);
        document.getElementById('cve-list').textContent = 'An error occurred while loading data.';
    }
}
