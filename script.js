const API_KEY = '00bc1c7f-1c34-427b-8506-5b5b56c253d7';
const API_URL = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`;

// Function to fetch live scores
async function fetchLiveScores() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.status === 'success') {
      displayScores(data.data);
    } else {
      console.error('Error fetching live scores:', data);
      document.getElementById('scores').innerHTML = 'Error loading scores.';
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('scores').innerHTML = 'Failed to load scores.';
  }
}

// Function to display scores
function displayScores(matches) {
  const scoresContainer = document.getElementById('scores');
  scoresContainer.innerHTML = ''; // Clear previous content

  if (!matches.length) {
    scoresContainer.innerHTML = '<p>No live matches at the moment.</p>';
    return;
  }

  matches.forEach(match => {
    const matchCard = document.createElement('div');
    matchCard.className = 'match';

    // Team Names
    const teamText = document.createElement('div');
    teamText.className = 'team';
    teamText.textContent = `${match.teams[0]} vs ${match.teams[1]}`;

    // Score (formatted properly)
    const scoreText = document.createElement('div');
    scoreText.className = 'score';

    if (Array.isArray(match.score)) {
      const formattedScores = match.score.map(s => {
        return `${s.inning}: ${s.r}/${s.w} in ${s.o} overs`;
      }).join(' | ');
      scoreText.textContent = formattedScores;
    } else {
      scoreText.textContent = 'Score not available';
    }

    // Match status
    const statusText = document.createElement('div');
    statusText.className = 'status';
    statusText.textContent = match.status;

    // Append all to card
    matchCard.appendChild(teamText);
    matchCard.appendChild(scoreText);
    matchCard.appendChild(statusText);
    scoresContainer.appendChild(matchCard);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', fetchLiveScores);
// Refresh scores every 15 seconds
setInterval(fetchLiveScores, 15000);
