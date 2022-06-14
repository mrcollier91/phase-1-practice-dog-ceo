console.log("%c HI", "color: firebrick");
let breeds = "";

document.addEventListener("DOMContentLoaded", (e) => {
  function getBreeds() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    return fetch(imgUrl)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("resp", resp.message);
        const dogImgContainer = document.getElementById("dog-image-container");
        resp.message.forEach((url) => {
          const img = document.createElement("img");
          img.src = url;
          dogImgContainer.append(img);
        });
      });
  }
  function getBreeds2() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    return fetch(breedUrl)
      .then((resp) => resp.json())
      .then((resp) => {
        const breeds = Object.keys(resp.message);
        addBreednamesToDom(breeds);
      });
  }
  function addBreednamesToDom(breeds) {
    const ul = document.getElementById("dog-breeds");
    breeds.map((breed) => {
      const li = document.createElement("li");
      li.textContent = breed;
      ul.append(li);
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.matches("li")) {
      e.target.style.color = "red";
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches("#breed-dropdown")) {
      const ul = document.getElementById("dog-breeds");
      ul.innerHTML = "";
      const breedUrl = "https://dog.ceo/api/breeds/list/all";
      return fetch(breedUrl)
        .then((resp) => resp.json())
        .then((resp) => {
          const breeds = Object.keys(resp.message);
          const filteredBreeds = breeds.filter(
            (breed) => breed[0] === e.target.value
          );
          addBreednamesToDom(filteredBreeds);
        });
    }
  });
  getBreeds2();
  getBreeds();
});
