document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

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

    // Attempt to locate the user automatically
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // Get the main content area element
    const mainContentInner = document.getElementById('map');

    // Get the button elements
    const reportIncidentButton = document.getElementById('report-incident-button');
    const viewReportsButton = document.getElementById('view-reports-button');
    const mapButton = document.getElementById('map-button');
    const emergencyContactsButton = document.querySelector('.btn-emergency-contacts');
    const floodSafetyTipsButton = document.querySelector('.btn-flood-safety-tips');
    const historicalDataButton = document.querySelector('.btn-historical-data');
    const settingsButton = document.querySelector('.btn-settings');

    // Add event listeners to the buttons
    reportIncidentButton.addEventListener('click', () => {
        displayContent('report-incident');
    });

    viewReportsButton.addEventListener('click', () => {
        displayContent('view-reports');
    });

    mapButton.addEventListener('click', () => {
        displayContent('map');
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

    settingsButton.addEventListener('click', () => {
        displayContent('settings');
    });

    // Function to display content
    function displayContent(contentType) {
        // Clear the main content area
        mainContentInner.innerHTML = '';

        // Display the corresponding content
        switch (contentType) {
            case 'report-incident':
                mainContentInner.innerHTML = `
          <h2>Report Incident</h2>
          <p>This is the report incident content.</p>
        `;
                break;
            case 'view-reports':
                mainContentInner.innerHTML = `
          <h2>View Reports</h2>
          <p>This is the view reports content.</p>
        `;
                break;
            case 'map':
                // Initialize the map here
                mainContentInner.innerHTML = `
          <h2>Map</h2>
          <p>This is the map content.</p>
        `;
                map.invalidateSize();
                break;
            case 'emergency-contacts':
                mainContentInner.innerHTML = `
          <h2>Emergency Contacts</h2>
          <p>This is the emergency contacts content.</p>
        `;
                break;
            case 'flood-safety-tips':
                mainContentInner.innerHTML = `
          <h2>Flood Safety Tips</h2>
          <p>This is the flood safety tips content.</p>
        `;
                break;
            case 'historical-data':
                mainContentInner.innerHTML = `
          <h2>Historical Data</h2>
          <p>This is the historical data content.</p>
        `;
                break;
            case 'settings':
                mainContentInner.innerHTML = `
          <h2>Settings</h2>
          <p>This is the settings content.</p>
        `;
                break;
            default:
                console.error(`Unknown content type: ${contentType}`);
        }
    }
});