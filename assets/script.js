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

  fetchNBADataByTeam('1');
});
