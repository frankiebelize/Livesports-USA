
const apiUrl = 'https://api-nba-v1.p.rapidapi.com/games?date=';


function getTodaysGames() {
  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Updated apiUrl to include the date parameter
  const apiUrlWithDate = `https://api-nba-v1.p.rapidapi.com/games?date=${today}` + '&season=2023';

  fetch(apiUrlWithDate, {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '352f473677msh15fcdcfb9fa9a96p13d723jsn7de1e008d65e',
      },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('API Response:', data);

      if (data.results > 0 && data.response.length > 0) {
          displayTodaysGames(data.response);
      } else {
          console.log('No games scheduled for today.');
          // You may choose to clear the games container or show a message.
      }
  })
  .catch(error => {
      console.error('Error fetching today\'s games:', error);
  });
}





// Function to update HTML with today's games
// Function to update HTML with today's games
// Function to update HTML with today's games
function displayTodaysGames(todaysGames) {
  const todaysGamesContainer = document.querySelector('.live-games');
  todaysGamesContainer.innerHTML = ''; // Clear existing content

  todaysGames.forEach(function (game) {
      const gameBox = document.createElement('div');
      gameBox.classList.add('game-box');

      // Check if necessary properties are defined before accessing them
      const team1 = game.vTeam ? `
          <div class="team">
              <img src="${game.vTeam.logo || ''}" alt="${game.vTeam.fullName || ''}" class="team-logo">
              <p class="team-name">${game.vTeam.fullName || 'Team 1'}</p>
              <p class="team-score">${game.vTeam.score ? game.vTeam.score.points : 'N/A'}</p>
          </div>
      ` : '';

      const vs = '<div class="vs">VS</div>';

      const team2 = game.hTeam ? `
          <div class="team">
              <p class="team-score">${game.hTeam.score ? game.hTeam.score.points : 'N/A'}</p>
              <p class="team-name">${game.hTeam.fullName || 'Team 2'}</p>
              <img src="${game.hTeam.logo || ''}" alt="${game.hTeam.fullName || ''}" class="team-logo">
          </div>
      ` : '';

      // Append teams and VS to gameBox
      gameBox.innerHTML = team1 + vs + team2;

      // Append gameBox to todaysGamesContainer
      todaysGamesContainer.appendChild(gameBox);
  });
}
// Fetch today's games when the page loads
document.addEventListener('DOMContentLoaded', function () {
  getTodaysGames();

  // You can also set up a timer to periodically refresh today's games
  // setInterval(getTodaysGames, 60000); // Refresh every 1 minute
});


// You can also set up a timer to periodically refresh today's games
// setInterval(getTodaysGames, 60000); // Refresh every 1 minute
