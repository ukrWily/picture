import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);

  // cards.forEach((card) => {
  //   card.classList.add("animated", "fadeInUp");
  // });

  // btn.addEventListener("click", () => {
  //   cards.forEach((card) => {
  //     card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");
  //     card.classList.add(
  //       "col-sm-3",v
  //       "col-sm-offset-0",
  //       "col-xs-10",
  //       "col-xs-offset-1"
  //     );
  //   });
  //   // btn.style.display = "none";
  //   btn.remove();
  // });

  btn.addEventListener("click", function () {
    getResource("http://localhost:3000/styles")
      .then((res) => createCards(res))
      .catch((error) => {
        const er = document.createElement("div");
        er.textContent = error.message;
        er.style.textAlign = "center";
        er.style.color = "red";
        er.style.fontSize = "30px";
        er.style.textShadow = "0 2.5px 2.5px black";
        er.style.fontWeight = 700;
        document.querySelector(wrapper).appendChild(er);
      });

    this.remove();
  });

  function createCards(response) {
    response.forEach(({ src, title, link }) => {
      let card = document.createElement("div");

      card.classList.add(
        "animated",
        "fadeInUp",
        "col-sm-3",
        "col-sm-offset-0",
        "col-xs-10",
        "col-xs-offset-1"
      );

      card.innerHTML = `
      	<div class="styles-block">
          <img src=${src} alt="style">
          <h4>${title}</h4>
          <a href=${link}>Подробнее</a>
        </div>
      `;
      document.querySelector(wrapper).appendChild(card);
    });
  }
};

export default showMoreStyles;

// "hidden-lg hidden-md hidden-sm hidden-xs styles-2"
// col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1

// <div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
// 	<div class=styles-block>
// 		<img src=assets/img/styles-6.jpg alt>
// 		<h4>Поп-арт</h4>
// 		<a href="#">Подробнее</a>
// 	</div>
// </div>
