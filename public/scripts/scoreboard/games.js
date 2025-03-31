window.onload = function () {

    const gameInfo = document.getElementById('game-info');

    // Get game ID from the URL
    const pathSegments = window.location.pathname.split('/');
    const gameId = pathSegments[pathSegments.length - 1];

    // Get the current sport from localStorage
    const currentSport = localStorage.getItem('currentSport');

    // Fetch game data
    const options = {method: 'GET'};
    fetch(`http://site.api.espn.com/apis/site/v2/sports/${currentSport}/scoreboard/${gameId}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayGameDetails(data);
        })
        .catch(err => {
            console.error('Error fetching game details:', err);
        });

    function displayGameDetails(data) {
        console.log(data);

        // Create container for game details
        const container = document.createElement('div');
        container.className = 'game-container';

        // Get competition data
        const competition = data.competitions[0];
        const homeTeam = competition.competitors[0];
        const awayTeam = competition.competitors[1];

        // Format date and time
        const gameDate = new Date(data.date);


        // Create game header
        const header = document.createElement('div');
        header.className = 'game-header';
        header.innerHTML = `
            <h1>${data.name}</h1>
            <p class="game-status">${data.status.type.detail}</p>`;

        // Create scoreboard
        const scoreboard = document.createElement('div');
        scoreboard.className = 'game-scoreboard';
        scoreboard.innerHTML = `
            <div class="team away">
                <img src="${awayTeam.team.logo}" alt="${awayTeam.team.displayName}" class="team-logo">
                <h2>${awayTeam.team.displayName}</h2>
                <p class="score">${awayTeam.score}</p>
            </div>
            <div class="vs">VS</div>
            <div class="team home">
                <img src="${homeTeam.team.logo}" alt="${homeTeam.team.displayName}" class="team-logo">
                <h2>${homeTeam.team.displayName}</h2>
                <p class="score">${homeTeam.score}</p>
            </div>
        `;

        // Create venue information
        const venueInfo = document.createElement('div');
        venueInfo.className = 'venue-info';

        if (competition.venue) {
            venueInfo.innerHTML = `
                <h3>Venue Information</h3>
                <p>${competition.venue.fullName}</p>
                <p>${competition.venue.address?.city || ''}, ${competition.venue.address?.state || ''}</p>
            `;
        }

        // Create game stats if available
        const statsSection = document.createElement('div');
        statsSection.className = 'stats-section';

        if (competition.stats && competition.stats.length > 0) {
            statsSection.innerHTML = '<h3>Game Statistics</h3>';
            const statsList = document.createElement('ul');

            competition.stats.forEach(stat => {
                const statItem = document.createElement('li');
                statItem.innerHTML = `<strong>${stat.name}:</strong> ${stat.displayValue}`;
                statsList.appendChild(statItem);
            });

            statsSection.appendChild(statsList);
        }

        // Assemble all elements
        container.appendChild(header);
        container.appendChild(scoreboard);
        container.appendChild(venueInfo);

        if (competition.stats && competition.stats.length > 0) {
            container.appendChild(statsSection);
        }

        // Add highlights or additional information if available
        if (data.headlines && data.headlines.length > 0) {
            const highlights = document.createElement('div');
            highlights.className = 'highlights';
            highlights.innerHTML = `
                <h3>Highlights</h3>
                <h4>${data.headlines[0].shortLinkText}</h4>
                <p>${data.headlines[0].description}</p>
            `;
            container.appendChild(highlights);
        }

        // Clear the loading message and display the game details
        gameInfo.innerHTML = '';
        gameInfo.appendChild(container);
    }

}