document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  this.classList.add("form-submitted");
  resetValidationErrors();

  const formIsValid = validateForm();

  if (formIsValid) {
    this.classList.remove("form-submitted");
    showSuccessMessage();
    this.reset();
  }
});

function resetValidationErrors() {
  document.querySelectorAll(".error-message").forEach((errorElement) => {
    errorElement.style.display = "none";
  });

  document.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
    field.removeAttribute("aria-invalid");
    field.classList.remove("invalid");
  });

  const radioGroup = document.querySelector(".radio-options");
  if (radioGroup) {
    radioGroup.classList.remove("invalid");
  }
}

function validateForm() {
  let isValid = true;
  isValid = validateRequiredFields() && isValid;
  isValid = validateRadioButtons() && isValid;
  isValid = validateEmail() && isValid;
  return isValid;
}

function validateRequiredFields() {
  let allFieldsValid = true;

  document.querySelectorAll("[required]").forEach((field) => {
    if (field.type === "radio" || field.type === "checkbox") return;
    if (!field.value.trim()) {
      showError(field);
      allFieldsValid = false;
    }
  });

  return allFieldsValid;
}

function validateRadioButtons() {
  const radioChecked = document.querySelector(
    'input[name="queryType"]:checked'
  );
  const radioGroup = document.querySelector(".radio-options");

  if (!radioChecked) {
    document.getElementById("queryTypeError").style.display = "block";
    radioGroup.classList.add("invalid");
    return false;
  }

  radioGroup.classList.remove("invalid");
  return true;
}

function validateEmail() {
  const emailField = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailField.value && !emailRegex.test(emailField.value)) {
    document.getElementById("emailError").style.display = "block";
    emailField.setAttribute("aria-invalid", "true");
    emailField.classList.add("invalid");
    return false;
  }

  emailField.classList.remove("invalid");
  return true;
}

function showError(field) {
  const errorId = field.getAttribute("aria-describedby");
  if (errorId) {
    document.getElementById(errorId).style.display = "block";
  }
  field.setAttribute("aria-invalid", "true");
  field.classList.add("invalid");
}

function showSuccessMessage() {
  const successMsg = document.querySelector(".success-message");
  successMsg.style.display = "block";

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 5000);
}
