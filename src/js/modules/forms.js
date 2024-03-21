// import checkNumInputs from "./checkNumInputs";

const forms = () => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input");

  // checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Loading...",
    success: "Thanks. We will call you.",
    failure: "Something going wrong. :(",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.gif",
    fail: "assets/img/fail.gif",
  };
  /** Making request */
  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
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
  };

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

      let statusImg;

      const formData = new FormData(item);
      if (item.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          clearInputs(); //todo clear inputs
          setTimeout(() => {
            statusMessage.remove(); //todo remove message after 5s
          }, 5000);
        });
    });
  });
};

export default forms;
