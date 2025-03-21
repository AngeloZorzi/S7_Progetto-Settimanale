const currentYear = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};
currentYear();

const APIUrl = "https://striveschool-api.herokuapp.com/api/product/";

class Game {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imgUrl = _imgUrl;
    this.price = _price;
  }
}

const gameForm = document.getElementById("game-form");

gameForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const brand = document.getElementById("brand").value.trim();
  const imgUrl = document.getElementById("imgUrl").value.trim();
  const price = parseFloat(document.getElementById("price").value);

  if (!name || !description || !brand || !imgUrl || isNaN(price)) {
    alert("Per favore compila tutti i campi correttamente!");
    return;
  }

  const newGame = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imgUrl,
    price: price,
  };
  fetch(APIUrl, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWYxZDM4MzRiZjAwMTUwMDA2ZmMiLCJpYXQiOjE3NDI1NDQ2NjksImV4cCI6MTc0Mzc1NDI2OX0.Fe1metoCEo3L7Ffjh8C7qiDWYg7k-4Xjt2Cgh2sRa40",

      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  })
    .then((response) => {
      if (response.ok) {
        console.log("OK", response);
        return response.json();
      } else {
        throw new Error("Errore durante il salvataggio");
      }
    })
    .then((data) => {
      console.log(" Gioco salvato correttamente:", data);
      alert("Gioco aggiunto con successo!");
      gameForm.reset();
    })
    .catch((error) => {
      console.error(" Errore:", error);
      alert("Errore durante il salvataggio");
    });
});
const form = document.getElementById("game-form");
const resetBtn = document.getElementById("resetForm");

resetBtn.addEventListener("click", () => {
  form.reset();
});
