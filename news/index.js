const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseURL = "https://newsapi.org/v2";
const apiKey = "&apiKey=36bb21a936df4b2990f0d2c3d05f0e50";
const backupImage = "https://images.unsplash.com/photo-1705931607938-fa3b30611e15?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// const usAll = "https://newsapi.org/v2/top-headlines?country=us&apiKey=36bb21a936df4b2990f0d2c3d05f0e50";
// const usBusiness = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=36bb21a936df4b2990f0d2c3d05f0e50";
// const crypto = "https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=36bb21a936df4b2990f0d2c3d05f0e50";
// const techCrunch = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=36bb21a936df4b2990f0d2c3d05f0e50";

async function dataRequest(url) {
  try {
    const response = await fetch(baseURL + url + apiKey);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

function urlRequest(url) {
  dataRequest(url).then((data) => {
    data.articles.forEach((item) => {
      cards.innerHTML += `
                <div class="card">
                        <div class="image">
                            <img src="${item.urlToImage ? item.urlToImage : backupImage}"
                                    alt="Default News Image">
                        </div>
                         <div class="information">
                                <div>
                                    <p class="title">${item.title}</p>
                                    <p class="description">${item.description}</p>
                                    <p class="time">
                                        <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                        <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                    </p>
                                </div>
                                <div class="other">
                                    <span class="source">${item.source.name}</span>
                                    <a class="url" target="_blank"
                                        href="${item.url}">
                                        Read Article <i class="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                        </div>
                </div>
            `;
    });
  });
}

category.addEventListener("click", event => {
    if (event.target.tagName === "SPAN") {
        cards.innerHTML = "";
        urlRequest(event.target.dataset.url);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");
    }
});

urlRequest("/top-headlines?country=us");