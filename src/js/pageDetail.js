const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    document.getElementById("second-title").style.display = "none";
    document.getElementById("text-welcome").style.display = "none";

    const displayGame = (gameData) => {
      console.log(gameData);
      const {
        name,
        released,
        description,
        background_image,
        rating,
        rating_top,
        ratings_count,
        developers,
        platforms,
        publishers,
        genres,
        tags,
        stores, 
        id
      } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("img.background-image").src = background_image;
      articleDOM.querySelector("p.rating").innerHTML = rating + "/" + rating_top + " - " + ratings_count + " votes";
      articleDOM.querySelector("p.devs").innerHTML = `${developers.map((x) => x.name).join(",  ")}`;
      articleDOM.querySelector("p.platfforms").innerHTML = `${platforms.map((x) => x.platform.name).join(",  ")}`;
      articleDOM.querySelector("p.publisher").innerHTML = `${publishers.map((x) => x.name).join(",  ")}`;
      articleDOM.querySelector("p.genre").innerHTML = `${genres.map((x) => x.name).join(",  ")}`;
      articleDOM.querySelector("p.tag").innerHTML = `#${tags.map((x) => x.name).join(",  #")}`;
      articleDOM.querySelector("p.store").innerHTML = `${stores.map((x) => x.store.name).join("<br>")}`;
      
      fetch(
        `https://api.rawg.io/api/games/${id}/movies?key=7c5b7563d72b42ca9390c0f75d7948ca`
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.count > 0) {
            document.getElementById("video").innerHTML = `
                      <h2 class="rating mt-3">TRAILER</h2>
                        <video controls style="width:100%">
                            <source src="${responseData.results[0].data.max}" type="video/mp4">
                        </video>`;
          }
        })
        .catch((error) => {
          console.error(error);
        }); 
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=7c5b7563d72b42ca9390c0f75d7948ca`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame("https://api.rawg.io/api/games", cleanedArgument);
  };
  


  const render = () => {
    pageContent.innerHTML = `
        <section class="page-detail">
          <div class="article">

            <div class="back">
                <img class="background-image" >
                <button class="btn">Check Website</button>
            </div>

            <div class="title-rating">
                <h1 class="title"></h1>
                <p class="rating"></p>
            </div>
            <div>
                <p class="marge">Plot: </p>
                <p class="description"></p>
            </div>

            <div class="rdpp">
                  <div class="release">
                        <p class="marge">Release date : </p>
                        <p class="release-date marg"><span></span></p>
                  </div>

                  <div class="developer">
                      <p class="marge">Studio: </p>
                      <p class="devs marg"></p>
                  </div>

                  <div class="plat">
                      <p class="marge">Platforms: </p>
                      <p class="platfforms marg"></p>
                  </div>

                  <div class="publi">
                      <p class="marge">Publishers: </p>
                      <p class="publisher marg"></p>
                  </div>
              </div>

              <div class="genre-tag">
                  <div>
                      <p class="marge">Genres: </p>
                      <p class="genre marg"></p>
                  </div>

                  <div>
                      <p class="marge">Tags: </p>
                      <p class="tag marg"></p>
                  </div>
              </div>

          <div class="stores">
              <h1>BUY</h1>
              <p class="store"></p>
          </div>
          
          <div id="video"></div>

          </div>
        </section>
      `;

    preparePage();
  };

  render();
};
export default PageDetail;
