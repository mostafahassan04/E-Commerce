document.addEventListener("DOMContentLoaded", function () {
  const signUpContainer = document.getElementById("signUpFormContainer");
  const loginContainer = document.getElementById("loginFormContainer");
  const showSignUpBtn = document.getElementById("showSignUp");
  const showLoginBtn = document.getElementById("showLogin");
  const loginLink = document.getElementById("loginLink");

  if (showSignUpBtn) {
    showSignUpBtn.onclick = function () {
      signUpContainer.style.display = "block";
      loginContainer.style.display = "none";
    };
  }

  if (showLoginBtn) {
    showLoginBtn.onclick = function () {
      signUpContainer.style.display = "none";
      loginContainer.style.display = "block";
    };
  }

  if (loginLink) {
    loginLink.onclick = function (e) {
      e.preventDefault();
      showLoginBtn.click();
    };
  }

  function setupPasswordToggle(inputId, btnId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(btnId);
    if (!passwordInput || !toggleBtn) return;
    const toggleIcon = toggleBtn.querySelector("i");
    toggleBtn.addEventListener("click", function () {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      toggleIcon.classList.toggle("fa-eye");
      toggleIcon.classList.toggle("fa-eye-slash");
    });
  }

  setupPasswordToggle("signupPassword", "toggleSignupPassword");
  setupPasswordToggle("signupRepeatPassword", "toggleSignupRepeatPassword");
  setupPasswordToggle("loginPassword", "toggleLoginPassword");

  function isPasswordValid(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("signupEmail").value;
      const username = document.getElementById("signupUsername").value;
      const password = document.getElementById("signupPassword").value;
      const repeatPassword = document.getElementById("signupRepeatPassword").value;

      if (!isPasswordValid(password)) {
        alert("Password must be at least 8 characters, contain a capital letter and a digit.");
        return;
      }

      if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ email, username, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign Up Successful! You can now log in.");
      signupForm.reset();
      showLoginBtn.click();
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const identifier = document.getElementById("loginIdentifier").value;
      const password = document.getElementById("loginPassword").value;
      const isAdminChecked = document.getElementById("loginIsAdmin").checked;

      if (!identifier || !password) {
        alert("Please enter your email/username and password.");
        return;
      }
      const adminEmail = "admin@example.com";
      const adminPassword = "Admin123";

      if (isAdminChecked && identifier === adminEmail && password === adminPassword) {
        alert("Welcome, Admin!");
        localStorage.setItem("role", "admin");
        window.location.href = "../admin dashboard/admin.html"; 
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        user =>
          (user.username === identifier || user.email === identifier) &&
          user.password === password
      );

      if (foundUser) {
        alert("Login successful!");
        localStorage.setItem("role", "user");
        localStorage.setItem("loginInfo", JSON.stringify(foundUser));
        window.location.href = "../products/products.html"; 
      } else {
        alert("Invalid credentials!");
      }
    });
  }
});
