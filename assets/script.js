document.addEventListener('DOMContentLoaded', function () {
    const rapidApiKey = '352f473677msh15fcdcfb9fa9a96p13d723jsn7de1e008d65e';
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const gameContainer = document.querySelector('.past-games');

    const teamNameToIdMapping = {
        "Atlanta Hawks": 1,
        "Boston Celtics": 2,
        "Los Angeles Lakers": 17,
        "Orlando Magic": 26,
        "Chicago Bulls": 6,
        "Brooklyn Nets": 4,
        "Cleveland Cavaliers": 7,
        "Portland Trail Blazers": 29,
        "Utah Jazz": 40,
        "Phoenix Suns": 28,
        "Dallas Mavericks": 8,
        "Charlotte Hornets": 5,
        "Miami Heat": 20,
        "Milwaukee Bucks": 21,
        "Houston Rockets": 14,
        "San Antonio Spurs": 31,
        "Detroit Pistons": 10
    };

    // Attach an event listener to the search button
    searchBtn.addEventListener('click', () => {
        const teamName = searchInput.value.trim();
        const teamID = teamNameToIdMapping[teamName];

        if (teamID) {
            fetchNBADataByTeam(teamID);
        } else {
            console.error("Team name not found in the dataset");
        }
    });

    // Function to fetch NBA data by team ID
    function fetchNBADataByTeam(teamId) {
        const apiUrl = 'https://api-nba-v1.p.rapidapi.com/games';
        const queryParams = {
            league: 'standard',
            season: '2023',
            team: teamId,
        };

        const queryString = new URLSearchParams(queryParams).toString();

        // Make a fetch request
        fetch(`${apiUrl}?${queryString}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
            },
        })
        .then(handleResponse)
        .then(data => {
            const upcomingGames = data.response.filter(game => new Date(game.date.start) > new Date());
            displayGames(upcomingGames.slice(0, 6));
        })
        .catch(handleError);
    }

    // Handle fetch response
    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    // Handle errors
    function handleError(error) {
        console.error('Error fetching NBA data:', error);
    }

    // Function to display games
    function displayGames(games) {
        // Clear the container first
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }

        games.forEach((game, index) => {
            const gameBox = createGameBox(game, index + 1);
            gameContainer.appendChild(gameBox);
        });
    }

    // Function to create a game box
    function createGameBox(game, gameNumber) {
        const gameBox = document.createElement('div');
        gameBox.classList.add('game-box');
        gameBox.id = `game${gameNumber}`;

        const teamHome = createTeamElement(game.teams.home, gameNumber, 1);
        const timeDiv = createTimeElement(game.date.start);
        const teamVisitor = createTeamElement(game.teams.visitors, gameNumber, 2);

        gameBox.appendChild(teamHome);
        gameBox.appendChild(timeDiv);
        gameBox.appendChild(teamVisitor);

        return gameBox;
    }

    // Function to create a team element
    function createTeamElement(team, gameNumber, teamNumber) {
        const teamElement = document.createElement('div');
        teamElement.classList.add('team');
        teamElement.id = `team-${teamNumber}-${gameNumber}`;

        if (team && team.logo && team.name) {
            const imgElement = document.createElement('img');
            imgElement.src = team.logo;
            imgElement.alt = `${team.name} Logo`;
            imgElement.classList.add('team-logo');

            const pNameElement = document.createElement('p');
            pNameElement.classList.add('team-name');
            pNameElement.textContent = team.name;

            teamElement.appendChild(imgElement);
            teamElement.appendChild(pNameElement);
        } else {
            // Handle the case where the team data is missing or incomplete
            const pNameElement = document.createElement('p');
            pNameElement.classList.add('team-name');
            pNameElement.textContent = "Team Data Missing";
            teamElement.appendChild(pNameElement);
        }

        return teamElement;
    }

    // Function to create a time element with date and time
    function createTimeElement(startTime) {
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        
        // Parse the start time as a Date object
        const startDate = new Date(startTime);

        // Format the date and time as desired
        const formattedDate = startDate.toLocaleDateString(); // Format the date
        const formattedTime = startDate.toLocaleTimeString(); // Format the time

        // Combine date and time in a single string
        const dateTimeString = `${formattedDate} ${formattedTime}`;

        timeDiv.textContent = dateTimeString;

        return timeDiv;
    }

});

document.addEventListener('DOMContentLoaded', function () {
    const rapidApiKey = '352f473677msh15fcdcfb9fa9a96p13d723jsn7de1e008d65e';
  
    // Function to fetch NBA data by team
    function fetchNBADataByTeam(teamName) {
        const apiUrl = 'https://api-nba-v1.p.rapidapi.com/games';
  
        const queryParams = {
            league: 'standard',
            season: '2023',
            team: teamName,
        };
  
        const queryString = new URLSearchParams(queryParams).toString();
  
        // Make a fetch request
        fetch(`${apiUrl}?${queryString}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '352f473677msh15fcdcfb9fa9a96p13d723jsn7de1e008d65e',
              'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
  
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching NBA data:', error);
        });
    }
  
    fetchNBADataByTeam('20');
});