const correctLogin = "user@example.com";
const correctPassword = "password123";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const loginInput = document.getElementById("login");
  const passwordInput = document.getElementById("password");
  const messageDiv = document.getElementById("message");

  console.log("Script loaded and DOM ready!");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function validatePassword(pass) {
    return pass.length >= 6;
  }

  function showMessage(text, isError = false) {
    messageDiv.textContent = text;
    messageDiv.style.color = isError ? "red" : "green";
  }

  function saveData(login, password, remember) {
    if (remember) {
      localStorage.setItem("authData", JSON.stringify({ login, password }));
    } else {
      sessionStorage.setItem("authData", JSON.stringify({ login, password }));
    }
  }

  function loadData() {
    let data =
      localStorage.getItem("authData") || sessionStorage.getItem("authData");
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  // Загрузка данных при старте
  const data = loadData();
  if (data) {
    loginInput.value = data.login;
    passwordInput.value = data.password;
    document.getElementById("remember").checked =
      !!localStorage.getItem("authData");
  }

  // Обработчик отправки формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    loginInput.classList.remove("invalid");
    passwordInput.classList.remove("invalid");
    messageDiv.textContent = "";

    const loginVal = loginInput.value.trim();
    const passwordVal = passwordInput.value;
    const remember = document.getElementById("remember").checked;

    let valid = true;

    if (!validateEmail(loginVal)) {
      loginInput.classList.add("invalid");
      showMessage("Введите корректный email", true);
      valid = false;
    }

    if (!validatePassword(passwordVal)) {
      passwordInput.classList.add("invalid");
      showMessage("Пароль должен быть минимум 6 символов", true);
      valid = false;
    }

    if (!valid) return;

    if (loginVal === correctLogin && passwordVal === correctPassword) {
      showMessage("Успешный вход!");
      saveData(loginVal, passwordVal, remember);
    } else {
      showMessage("Неверный логин или пароль", true);
      passwordInput.classList.add("invalid");
    }
  });
});
