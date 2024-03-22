// import checkNumInputs from "./checkNumInputs";

const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll('[name="upload"]');

  // checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Loading...",
    success: "Thanks. We will call you.",
    failure: "Something going wrong. :(",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };
  /** Making request */
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  // <{<{<{<{<{<{<{<{<{<{<{<    clearInputs    >}>}>}>}>}>}>}>}>}>}>}>
  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });
    upload.forEach((item) => {
      item.previousElementSibling.style.color = "black";
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  upload.forEach((item) => {
    item.addEventListener("input", () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split(".");

      arr[0].length > 7 ? (dots = "...") : (dots = ".");

      const fileName = arr[0].substring(0, 7) + dots + arr[1];
      item.previousElementSibling.style.color = "blue";
      item.previousElementSibling.textContent = fileName;
    });
  });

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);
      // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
      /**
       *  create and show message during loading
       */
      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", message.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);
      // <{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<{<>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>}>
      /**
       * pick up dates from inputs to formData
       */
      const formData = new FormData(item);
      let api;
      /** searching closest element with required parameters */
      item.closest(".popup-design") || item.classList.contains("calc_form")
        ? (api = path.designer)
        : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs(); //todo clear inputs
          setTimeout(() => {
            statusMessage.remove(); //todo remove message after 5s
            item.style.display = "block";
            item.classList.remove("fadeOutUp");
            item.classList.add("fadeInUp");
          }, 5000);
        });
    });
  });
};

export default forms;
