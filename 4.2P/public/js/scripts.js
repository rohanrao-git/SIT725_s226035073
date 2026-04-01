const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });

const addCards = (cars) => {
  $("#card-section").empty();

  cars.forEach((car, index) => {
    const cardMarkup = `
      <div class="col s12 m6 l4">
        <div class="card car-card hoverable" data-car-index="${index}">
          <div class="card-image">
            <img src="${escapeHtml(car.image)}" alt="${escapeHtml(car.name)}">
            <span class="card-title">${escapeHtml(car.name)}</span>
          </div>
          <div class="card-content">
            <p class="car-meta">${escapeHtml(car.brand)} • ${escapeHtml(car.year)}</p>
            <p>${escapeHtml(car.description)}</p>
          </div>
          <div class="card-action">
            <a href="#car-modal" class="modal-trigger open-modal-btn" data-car-index="${index}">View Details</a>
          </div>
        </div>
      </div>
    `;

    $("#card-section").append(cardMarkup);
  });
};

const populateModal = (car) => {
  $("#modal-car-image").attr("src", car.image).attr("alt", car.name);
  $("#modal-car-chip").text(car.brand);
  $("#modal-car-name").text(car.name);
  $("#modal-car-description").text(car.description);
  $("#modal-car-brand").text(car.brand);
  $("#modal-car-year").text(car.year);
  $("#modal-car-speed").text(car.topSpeed);
  $("#modal-car-price").text(car.price);
};

const getCars = () => { // entry point to fetch cars and set up event handlers
  $.get("/api/cars", (response) => {
    if (response.statusCode === 200) {
      const cars = response.data;
      addCards(cars);

      $(".open-modal-btn, .car-card").on("click", function () {
        const carIndex = $(this).data("car-index");
        populateModal(cars[carIndex]);
      });
    } else {
      M.toast({ html: "Cars could not be loaded right now." });
    }
  }).fail(() => {
    M.toast({ html: "Could not reach the cars API." });
  });
};

$(document).ready(() => {
  $(".modal").modal();
  getCars();
});
