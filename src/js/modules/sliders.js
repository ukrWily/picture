const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1,
    paused = false;
  const items = document.querySelectorAll(slides);

  function showSlides(n) {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    //*`````додаємо клас анімації та скриваємо всі слайди
    items.forEach((item) => {
      item.classList.add("animated");
      item.style.display = "none";
    });

    items[slideIndex - 1].style.display = "block";
  }
  //* ініціалізуємо слайдер
  showSlides(slideIndex);
  //* перемикаємо слайди
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }
  //* перевіряємо, якщо управляючи елументи є, підключаємо їх
  try {
    const prevBtn = document.querySelector(prev),
      nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => {
      plusSlides(-1);
      items[slideIndex - 1].classList.remove("slideInLeft");
      items[slideIndex - 1].classList.add("slideInRight");
    });
    nextBtn.addEventListener("click", () => {
      plusSlides(1);
      items[slideIndex - 1].classList.remove("slideInRight");
      items[slideIndex - 1].classList.add("slideInLeft");
    });
  } catch (error) {
    console.error(error);
  }

  function activateAnimation() {
    //* перевіряємо напрям сладера
    if (dir === "vertical") {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.add("slideInDown");
      }, 3000);
    } else {
      paused = setInterval(function () {
        plusSlides(1);
        items[slideIndex - 1].classList.remove("slideInRight");
        items[slideIndex - 1].classList.add("slideInLeft");
      }, 3000);
    }
  }
  activateAnimation();
  //* якщо користувач навів курсор на сладер, зупиняємо setInterval
  items[0].parentNode.addEventListener("mouseenter", () => {
    clearInterval(paused);
  });
  //* якщо користувач увів курсор з сладера, запускаємо setInterval
  items[0].parentNode.addEventListener("mouseleave", () => {
    activateAnimation();
  });
};

export default sliders;
