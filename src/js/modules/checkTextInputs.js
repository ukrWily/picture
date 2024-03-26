const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      /**check for only cyrillic letters in any register and numbers */
      if (e.key.match(/[^а-я 0-9]/gi)) {
        e.preventDefault();
      }
    });
  });
  /**if input value contains latinic => remove it */
  txtInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (input.value.match(/[a-z]/gi)) {
        input.value = "";
      }
    });
  });
};

export default checkTextInputs;
