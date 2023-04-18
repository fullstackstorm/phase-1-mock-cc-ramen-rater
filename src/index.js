document.addEventListener("DOMContentLoaded", initializeWebPage());

function initializeWebPage() {
  initializeRamenImages();
  initializeForm();
}

function initializeRamenImages() {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach(addImage);
    })
    .catch((error) => console.log(error));
}

function addImage(parsedJsonRamen) {
  const ramenMenu = document.getElementById("ramen-menu");
  const imgTag = document.createElement("img");

  imgTag.setAttribute("src", parsedJsonRamen.image);
  imgTag.classList.add("ramen-card");
  imgTag.addEventListener("click", (event) =>
    displayRamenInfo(event, parsedJsonRamen)
  );

  ramenMenu.appendChild(imgTag);
}

/**
 * When an image from the `#ramen-menu` div is selected, it displays the ramen's
 * data inside the `#ramen-detail` div. The data is also displayed where it says
 * `insert comment here` and `insert rating here`.
 * @param {string} imageSelected - The image that was selected by the event.
 */
function displayRamenInfo(imageSelected, parsedJsonRamen) {
  const ramenDetail = document.getElementById("ramen-detail");
  const rating = document.getElementById(`rating-display`);
  const commentDisplay = document.getElementById(`comment-display`);

  ramenDetail
    .querySelector(`img`)
    .setAttribute(`src`, imageSelected.target.getAttribute(`src`));
  ramenDetail.querySelector(`.name`).textContent = parsedJsonRamen.name;
  ramenDetail.querySelector(`.restaurant`).textContent =
    parsedJsonRamen.restaurant;

  rating.innerText = parsedJsonRamen.rating;

  commentDisplay.innerText = parsedJsonRamen.comment;
}

/**
 * After submitting in the `new-ramen` form, the data is added to the`#ramen-menu`
 * div. When the page is refresh, the new ramen can dissapear if needed.
 */
function initializeForm() {
  const form = document.getElementById(`new-ramen`);
  form.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const ramenObj = {
      name: document.getElementById(`new-name`).value,
      restaurant: document.getElementById(`new-restaurant`).value,
      image: document.getElementById(`new-image`).value,
      rating: document.getElementById(`new-rating`).value,
      comment: document.getElementById(`new-comment`).value,
    };

    addImage(ramenObj);
  });
}
