const currentYear = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};
currentYear();
const URLparameters = new URLSearchParams(location.search);
const gameId = URLparameters.get("id");
const APIUrl = "https://striveschool-api.herokuapp.com/api/product/";
const getGameDetails = function () {
  fetch(APIUrl + gameId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NjA4MzEsImV4cCI6MTc0Mzc3MDQzMX0.hH4-2guwA0m4Y-b02hkzo8UFAPS8-rV7Wix0Hq58vBc",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const gameDetail = document.getElementById("gameDetail");
      gameDetail.innerHTML = `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card bg-color-2 text-light border-0 d-flex flex-column">
            <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-color-1">${data.name}</h5>
              <p class="card-text">${data.description}</p>
              <p class="card-text fw-bold text-color-3">Prezzo: €${data.price}</p>
              <a href="./homepage.html" class="btn btn-outline-color-11 text-color-10 w-100 mt-2">Torna alla lista</a>
            </div>
          </div>
        </div>
      `;

      document.getElementById("editName").value = data.name;
      document.getElementById("editDescription").value = data.description;
      document.getElementById("editPrice").value = data.price;
      document.getElementById("editImgUrl").value = data.imageUrl;

      document.getElementById("editForm").classList.remove("d-none");

      document
        .getElementById("formEdit")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const updatedGame = {
            name: document.getElementById("editName").value,
            description: document.getElementById("editDescription").value,
            price: document.getElementById("editPrice").value,
            imageUrl: document.getElementById("editImgUrl").value,
          };

          fetch(APIUrl + gameId, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NjA4MzEsImV4cCI6MTc0Mzc3MDQzMX0.hH4-2guwA0m4Y-b02hkzo8UFAPS8-rV7Wix0Hq58vBc",
            },
            body: JSON.stringify(updatedGame),
          })
            .then((response) => {
              if (response.ok) {
                alert("Gioco aggiornato con successo!");
                window.location.href = "./homepage.html";
              } else {
                alert("Errore durante l'aggiornamento del gioco.");
              }
            })
            .catch((error) => {
              console.log("Errore:", error);
              alert("Errore durante l'aggiornamento del gioco.");
            });
        });

      document
        .getElementById("deleteBtn")
        .addEventListener("click", function () {
          if (confirm("Sei sicuro di voler eliminare questo gioco?")) {
            fetch(APIUrl + gameId, {
              method: "DELETE",
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
              },
            })
              .then((response) => {
                if (response.ok) {
                  alert("Gioco eliminato con successo!");
                  window.location.href = "./homepage.html";
                } else {
                  alert("Errore durante l'eliminazione del gioco.");
                }
              })
              .catch((error) => {
                console.log("Errore:", error);
                alert("Errore durante l'eliminazione del gioco.");
              });
          }
        });
    })
    .catch((error) => {
      console.log("Errore:", error);
      alert("Errore nel recupero dei dettagli del gioco.");
    });
};

getGameDetails();
