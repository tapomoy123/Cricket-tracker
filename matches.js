const matchesContainer = document.getElementById("matches");

fetch("https://api.cricapi.com/v1/matches?apikey=c94f870b-153c-4750-8315-a79ff72e4f82&offset=0")
  .then(response => response.json())
  .then(data => {
    const matches = data.data;

    const filteredMatches = matches.filter(match =>
      match.status === "not started" || match.status === "live"
    );

    if (filteredMatches.length === 0) {
      matchesContainer.innerHTML = `
        <div class="match-card">
          No upcoming or live matches right now.
        </div>`;
      return;
    }

    matchesContainer.innerHTML = "";

    filteredMatches.forEach(match => {
      const card = document.createElement("div");
      card.className = "match-card";
      card.innerHTML = `
        <div class="match-title">${match.name}</div>
        <div class="match-innings">${match.venue} | ${match.date}</div>
        <div class="match-status">${match.status.toUpperCase()}</div>
      `;
      matchesContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching matches:", error);
    matchesContainer.innerHTML = `
      <div class="match-card">Failed to load matches.</div>`;
  });
