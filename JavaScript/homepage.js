const currentYear = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};
currentYear();

const APIUrl = "https://striveschool-api.herokuapp.com/api/product/";

const getProducts = function () {
  fetch(APIUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella ricezione dati");
      }
    })
    .then((data) => {
      console.log("DATI RICEVUTI", data);
      const row = document.getElementById("gameRow");
      data.forEach((game) => {
        row.innerHTML =
          row.innerHTML +
          `
  <div class="col-6 col-md-4 col-lg-3 mb-3">
  <div class="card bg-color-2 text-light border-0 d-flex flex-column">
    <img src="${game.imageUrl}" class="card-img-top" alt="${game.name}">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title text-color-1">${game.name}</h5>
      <p class="card-text">${game.description}</p>
      <p class="card-text fw-bold text-color-3">Prezzo: €${game.price}</p>
      <a href="./details.html?id=${game._id}" class="btn btn-outline-color-11 text-color-10 w-100 mt-2">Dettagli</a>
      <a href="./details.html?id=${game._id}" class="btn btn-outline-color-11 text-color-10 w-100 mt-2">Modifica</a>
    </div>
  </div>
</div>

`;
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
};
getProducts();

document.getElementById("adminLink").addEventListener("click", function (e) {
  e.preventDefault();

  const passwordModal = new bootstrap.Modal(
    document.getElementById("passwordModal")
  );
  passwordModal.show();

  document
    .getElementById("submitPasswordBtn")
    .addEventListener("click", function () {
      const password = document.getElementById("adminPassword").value;
      const correctPassword = "Sigarette";
      if (password === correctPassword) {
        passwordModal.hide();
        window.location.href = "./backoffice.html";
      } else {
        const errorToast = new bootstrap.Toast(
          document.getElementById("errorToast")
        );
        errorToast.show();
      }
    });
});
