const API_KEY = "YOUR_API_KEY"; // ← tu wklej swój klucz
const newsContainer = document.getElementById("news-container");

fetch(`https://newsapi.org/v2/top-headlines?country=pl&apiKey=${62b99eec8f334bca80554e8c7a7e8cc3}`)
  .then(response => response.json())
  .then(data => {
    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "Brak opisu"}</p>
        <a href="${article.url}" target="_blank">Czytaj więcej</a>
      `;
      newsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Błąd pobierania newsów:", error);
    newsContainer.innerHTML = "<p>Nie udało się załadować wiadomości.</p>";
  });
