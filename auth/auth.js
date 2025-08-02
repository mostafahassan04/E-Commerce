document.addEventListener("DOMContentLoaded", function () {
  const signUpContainer = document.getElementById("signUpFormContainer");
  const loginContainer = document.getElementById("loginFormContainer");
  const showSignUpBtn = document.getElementById("showSignUp");
  const showLoginBtn = document.getElementById("showLogin");
  const loginLink = document.getElementById("loginLink");
  const signUpLink = document.getElementById("signUpLink");

  showSignUpBtn.onclick = function () {
    signUpContainer.style.display = "";
    loginContainer.style.display = "none";
  };
  showLoginBtn.onclick = function () {
    signUpContainer.style.display = "none";
    loginContainer.style.display = "";
  };
  loginLink.onclick = function (e) {
    e.preventDefault();
    showLoginBtn.click();
  };
  signUpLink.onclick = function (e) {
    e.preventDefault();
    showSignUpBtn.click();
  };
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
  setupPasswordToggle("password", "togglePassword");
  setupPasswordToggle("loginPassword", "toggleLoginPassword");
  setupPasswordToggle("loginRepeatPassword", "toggleLoginRepeatPassword");
  function isPasswordValid(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }

  function doPasswordsMatch(passId, repeatId) {
    const pass = document.getElementById(passId);
    const repeat = document.getElementById(repeatId);
    return pass && repeat && pass.value === repeat.value;
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      const password = document.getElementById("loginPassword").value;
      const repeatPassword = document.getElementById(
        "loginRepeatPassword"
      ).value;

      if (!isPasswordValid(password)) {
        alert(
          "Password must be at least 8 characters, contain a capital letter and a digit."
        );
        e.preventDefault();
        return;
      }
      if (password !== repeatPassword) {
        alert("Passwords do not match.");
        e.preventDefault();
        return;
      }
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      const password = document.getElementById("password").value;

      if (!isPasswordValid(password)) {
        alert(
          "Password must be at least 8 characters, contain a capital letter and a digit."
        );
        e.preventDefault();
        return;
      }
    });
  }
});
