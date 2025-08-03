document.addEventListener("DOMContentLoaded", function () {
  // Get references to containers and buttons
  const signUpContainer = document.getElementById("signUpFormContainer");
  const loginContainer = document.getElementById("loginFormContainer");
  const showSignUpBtn = document.getElementById("showSignUp");
  const showLoginBtn = document.getElementById("showLogin");
  const loginLink = document.getElementById("loginLink");

  // Toggle to show sign up form
  if (showSignUpBtn) {
    showSignUpBtn.onclick = function () {
      signUpContainer.style.display = "block";
      loginContainer.style.display = "none";
    };
  }

  // Toggle to show login form
  if (showLoginBtn) {
    showLoginBtn.onclick = function () {
      signUpContainer.style.display = "none";
      loginContainer.style.display = "block";
    };
  }

  // Link to switch to login form from sign up
  if (loginLink) {
    loginLink.onclick = function (e) {
      e.preventDefault();
      showLoginBtn.click();
    };
  }

  // Password visibility toggle for all password fields
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

  // Password validation function
  function isPasswordValid(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  }

  // Handle sign up form submission
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const email = document.getElementById("signupEmail").value;
      const username = document.getElementById("signupUsername").value;
      const password = document.getElementById("signupPassword").value;
      const repeatPassword = document.getElementById("signupRepeatPassword").value;

      // Validate password
      if (!isPasswordValid(password)) {
        alert("Password must be at least 8 characters, contain a capital letter and a digit.");
        return;
      }

      // Check if passwords match
      if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Get users from localStorage or create new array
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      // Add new user to array
      users.push({ email, username, password });
      // Save updated users array to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign Up Successful! You can now log in.");
      signupForm.reset();
      showLoginBtn.click();
    });
  }

  // Handle login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get login form values
      const identifier = document.getElementById("loginIdentifier").value;
      const password = document.getElementById("loginPassword").value;
      const isAdminChecked = document.getElementById("loginIsAdmin").checked;

      // Check if fields are filled
      if (!identifier || !password) {
        alert("Please enter your email/username and password.");
        return;
      }

      // Hardcoded admin credentials
      const adminEmail = "admin@example.com";
      const adminPassword = "Admin123";

      // Admin login check
      if (isAdminChecked && identifier === adminEmail && password === adminPassword) {
        alert("Welcome, Admin!");
        localStorage.setItem("role", "admin");
        window.location.href = "../admin dashboard/admin.html"; 
        return;
      }

      // Get users array from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      // Find user by username/email and password
      const foundUser = users.find(
        user =>
          (user.username === identifier || user.email === identifier) &&
          user.password === password
      );

      // If user found, login successful
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