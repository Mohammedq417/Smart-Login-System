let users = JSON.parse(localStorage.getItem("users")) || [];

function signUp() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const existMsg = document.getElementById("exist");

  existMsg.textContent = "";

  if (!name || !email || !password) {
    existMsg.textContent = "All fields are required.";
    existMsg.style.color = "red";
    return;
  }

  if (!validateEmail(email)) {
    existMsg.textContent = "Please enter a valid email.";
    existMsg.style.color = "red";
    return;
  }

  if (users.some((user) => user.email === email)) {
    existMsg.textContent = "Email already exists. Please use another email.";
    existMsg.style.color = "red";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "index.html";
}

function login() {
  const email = document.getElementById("signinEmail").value.trim();
  const password = document.getElementById("signinPassword").value.trim();
  const incorrectMsg = document.getElementById("incorrect");

  incorrectMsg.textContent = "";

  if (!email || !password) {
    incorrectMsg.textContent = "Please fill in all fields.";
    incorrectMsg.style.color = "red";
    return;
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    incorrectMsg.textContent = "Incorrect email or password.";
    incorrectMsg.style.color = "red";
  }
}

function displayUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const usernameSpan = document.getElementById("username");

  if (user) {
    usernameSpan.textContent = `Welcome ${user.name}`;
  } else {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

if (document.body.id === "home") {
  displayUser();
}
