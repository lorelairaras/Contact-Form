// It makes mistakes currently ongoing changes
// more researching to do and studies

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  this.classList.add("form-submitted");
  resetValidationErrors();

  const formIsValid = validateForm();

  if (formIsValid) {
    showSuccessMessage();
    this.reset();
  }
});

function resetValidationErrors() {
  // Hide all error messages
  document.querySelectorAll(".error-message").forEach((errorElement) => {
    errorElement.style.display = "none";
  });

  // Remove invalid aria attributes
  document.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
}

function validateForm() {
  let isValid = true;

  // Validate required text/email/textarea fields
  isValid = validateRequiredFields() && isValid;

  // Validate radio buttons
  isValid = validateRadioButtons() && isValid;

  // Validate email format
  isValid = validateEmail() && isValid;

  return isValid;
}

function validateRequiredFields() {
  let allFieldsValid = true;

  document.querySelectorAll("[required]").forEach((field) => {
    // Skip radio and checkbox inputs (handled separately)
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
    return false;
  }

  return true;
}

function showError(field) {
  const errorId = field.getAttribute("aria-describedby");
  if (errorId) {
    document.getElementById(errorId).style.display = "block";
  }
  field.setAttribute("aria-invalid", "true");
}

function showSuccessMessage() {
  document.querySelector(".success-message").style.display = "block";

  setTimeout(() => {
    document.querySelector(".success-message").style.display = "none";
  }, 5000);
}
