document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    var map;

    // Function to handle location found
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);

        map.setView(e.latlng, 13);
    }

    // Function to handle location error
    function onLocationError(e) {
        alert("Automatic location detection failed. Please manually select your location.");
    }

    // Get the main content area element
    const mainContent = document.querySelector('.main-content');

    // Get the button elements
    const reportIncidentButton = document.getElementById('report-incident-button');
    const viewReportsButton = document.getElementById('view-reports-button');
    const emergencyContactsButton = document.querySelector('.btn-emergency-contacts');
    const floodSafetyTipsButton = document.querySelector('.btn-flood-safety-tips');
    const historicalDataButton = document.querySelector('.btn-historical-data');

    // Add event listeners to the buttons
    reportIncidentButton.addEventListener('click', () => {
        displayContent('report-incident');
    });

    viewReportsButton.addEventListener('click', () => {
        displayContent('view-reports');
    });

    emergencyContactsButton.addEventListener('click', () => {
        displayContent('emergency-contacts');
    });

    floodSafetyTipsButton.addEventListener('click', () => {
        displayContent('flood-safety-tips');
    });

    historicalDataButton.addEventListener('click', () => {
        displayContent('historical-data');
    });

    function displayContent(contentType) {
        // Clear the main content area
        mainContent.innerHTML = '';

        // Remove the map if it exists
        if (map) {
            map.remove();
            map = null;
        }

        // Display the corresponding content
        switch (contentType) {
            case 'report-incident':
                mainContent.innerHTML = `
        <h2>Report Incident</h2>
        <form id="incident-report-form">
          <!-- form fields -->
        </form>
      `;
                break;
            case 'view-reports':
                mainContent.innerHTML = `
        <h2>View Reports</h2>
        <p>This is the view reports content.</p>
      `;
                break;
            case 'emergency-contacts':
                mainContent.innerHTML = `
        <h2>Emergency Contacts</h2>
        <p>This is the emergency contacts content.</p>
      `;
                break;
            case 'flood-safety-tips':
                mainContent.innerHTML = `
        <h2>Flood Safety Tips</h2>
        <p>This is the flood safety tips content.</p>
      `;
                break;
            case 'historical-data':
                mainContent.innerHTML = `
        <h2>Historical Data</h2>
        <p>This is the historical data content.</p>
      `;
                break;
            default:
                console.error(`Unknown content type: ${contentType}`);
        }
    }

    // Initialize the map by default
    mainContent.innerHTML = '';
    map = L.map(mainContent).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Attempt to locate the user automatically
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
});