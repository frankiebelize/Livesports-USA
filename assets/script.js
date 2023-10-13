
document.addEventListener('DOMContentLoaded', function () {
    const rapidApiKey = 'c61023df98msh6f7beb0d10d6a8ep10dbc9jsn8be2ac7f5b08';
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const gameContainer = document.querySelector('.upcoming-games');

    /* Bank for team name to id */

    const teamNameToIdMapping = {
        "Atlanta Hawks": 1,
        "Boston Celtics": 2,
        "Brooklyn Nets": 4,
        "Charlotte Hornets": 5,
        "Chicago Bulls": 6,
        "Cleveland Cavaliers": 7,
        "Dallas Mavericks": 8,
        "Denver Nuggets": 9,
        "Detroit Pistons": 10,
        "Golden State Warriors": 11,
        "Houston Rockets": 14,
        "Indiana Pacers": 15,
        "LA Clippers": 16,
        "Los Angeles Lakers": 17,
        "Memphis Grizzlies": 19,
        "Miami Heat": 20,
        "Milwaukee Bucks": 21,
        "Minnesota Timberwolves": 22,
        "New Orleans Pelicans": 23,
        "New York Knicks": 24,
        "Oklahoma City Thunder": 25,
        "Orlando Magic": 26,
        "Philadelphia 76ers": 27,
        "Phoenix Suns": 28,
        "Portland Trail Blazers": 29,
        "Sacramento Kings": 30,
        "San Antonio Spurs": 31,
        "Toronto Raptors": 38,
        "Utah Jazz": 40,
        "Washington Wizards": 41,
    };
    
    /* Matching team name to id once search bar is clicked */

    searchBtn.addEventListener('click', () => {
        const teamName = searchInput.value.trim();
        const teamID = teamNameToIdMapping[teamName];

        if (teamID) {
            fetchNBADataByTeam(teamID);
        } else {
            console.error("Team name not found in the dataset");
        }
    });

    /* Gathering data with given id */

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

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach(element => {
          element.classList.remove('hidden'); // Remove the 'hidden' class
        });
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    function handleError(error) {
        console.error('Error fetching NBA data:', error);
    }

    function displayGames(games) {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }

        games.forEach((game, index) => {
            const gameBox = createGameBox(game, index + 1);
            gameContainer.appendChild(gameBox);
        });
    }

    /* Creating elements inside of the gamebox */

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

    /* Appending the data to the box , with a 'team data missing' catch incase of error */

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
            const pNameElement = document.createElement('p');
            pNameElement.classList.add('team-name');
            pNameElement.textContent = "Team Data Missing";
            teamElement.appendChild(pNameElement);
        }

        return teamElement;
    }

    /* Formatting the time in data file so its more readable */

    function createTimeElement(startTime) {
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        
        const startDate = new Date(startTime);

        const formattedDate = startDate.toLocaleDateString(); // Format the date
        const formattedTime = startDate.toLocaleTimeString(); // Format the time

        const dateTimeString = `${formattedDate} ${formattedTime}`;

        timeDiv.textContent = dateTimeString;

        return timeDiv;
    }

});

/* This was a function that console logs the team for id, so I could make the team:id bank in the beginning.
I went through every number to get the team. Was awesome! (not really) */

document.addEventListener('DOMContentLoaded', function () {
    const rapidApiKey = 'c61023df98msh6f7beb0d10d6a8ep10dbc9jsn8be2ac7f5b08';
  
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
              'X-RapidAPI-Key': 'c61023df98msh6f7beb0d10d6a8ep10dbc9jsn8be2ac7f5b08',
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
  
    fetchNBADataByTeam('41');
});

/* This is the 2nd API for the standings, if it doesnt work usually its just an issue with too many requests.
this can be fixed with a diff subscription, but ultimately it works */

/* Gets API data, slices for the top 3 */

document.addEventListener('DOMContentLoaded', function() {

    const url = 'https://api-basketball.p.rapidapi.com/standings?league=12&season=2023-2024';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c61023df98msh6f7beb0d10d6a8ep10dbc9jsn8be2ac7f5b08',
            'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
        },
    };

    fetch(url, options)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not okay XD');
        }
        return response.json();
    })
    .then((data) => {
        const topTeams = data.response[0].slice(0, 3).map(team => {
            if (team && team.team && team.team.name && team.team.logo) {
                return {
                    name: team.team.name,
                    logo: team.team.logo,
                    position: team.position,
                };
            } else {
                return {
                    name: "Unknown Team",
                    logo: "path_to_default_logo.png",
                    position: "N/A",
                };
            }
        });
        

        displayTopTeams(topTeams);
    })
    .catch((error) => {
        console.error('Issue (I am going to go insane):', error);
    });

    /* Appends the data to the elements */

    function displayTopTeams(teams) {
        const standingsBoxes = document.querySelectorAll('.standings-box');

        teams.forEach((team, index) => {
            const imgElement = standingsBoxes[index].querySelector('img');
            const pElement = standingsBoxes[index].querySelector('.standings-name');

            imgElement.src = team.logo;
            imgElement.alt = `Team ${index + 1} Logo`;

            pElement.textContent = `${team.position}. ${team.name}`;
        });
    }
});
