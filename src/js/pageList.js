const PageList = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    document.getElementById("second-title").style.display = "block"
    document.getElementById("text-welcome").style.display = "block"

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => {
        let platforms = "";
        article.parent_platforms.map((platform) => {
          platforms += `<img src="./src/asset/images/${platform.platform.slug}.svg" >`;
        });
        return `<article class="cardGame">
              <a href="#pagedetail/${article.id}">
              <div class="single-image">
                <img src=${article.background_image} class="image" />
                    <div class="img-overlay">
                        <div class="text-overlay">
                          <p class="date-rate">${article.released}</p>
                          <p class="date-rate">${article.rating}/${article.rating_top} - ${article.ratings_count} votes</p>
                          <p class="over-tag">${article.tags.map((x) => x.name).join(',  ')}</p>
                        </div>
                    </div>
              </div>
              <h1>${article.name}</h1>
              <div class="icon-container">
              <p>${platforms}</p>
              </div>
              </a>
              </article>`;
      });
      const resultsContainer = document.querySelector(".page-list .articles");
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
          console.log(responseData.results);
        });
    };

    fetchList(
      `https://api.rawg.io/api/games?key=7c5b7563d72b42ca9390c0f75d7948ca`,
      cleanedArgument
    );
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
      <div class="articles">Loading...</div>
      </section>
      `;

    preparePage();
  };

  render();
};

export default PageList;
