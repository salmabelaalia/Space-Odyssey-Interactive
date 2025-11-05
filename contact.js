// toggle

// form validation

const form = document.querySelector(".contact-form");
const sendButton = document.querySelector(".send-btn");

const inputs = {
  firstname: document.querySelector('input[name="first-name"]'),
  lastname: document.querySelector('input[name="last-name"]'),
  email: document.querySelector('input[name="email"]'),
  phone: document.querySelector('input[name="phone"]'),
  message: document.querySelector('input[name="Message"]'),
};

// Créer les éléments d'erreur dynamiquement
const errors = {
  firstname: document.createElement("div"),
  lastname: document.createElement("div"),
  email: document.createElement("div"),
  phone: document.createElement("div"),
};

// Configurer les éléments d'erreur
Object.keys(errors).forEach(key => {
  errors[key].className = "error-message";
  errors[key].style.color = "red";
  errors[key].style.fontSize = "12px";
  errors[key].style.marginTop = "5px";
  errors[key].style.maxHeight = "0";
  errors[key].style.overflow = "hidden";
  errors[key].style.transition = "max-height 0.3s ease";
});

// Ajouter les messages d'erreur après les champs correspondants
inputs.firstname.parentNode.appendChild(errors.firstname);
inputs.lastname.parentNode.appendChild(errors.lastname);
inputs.email.parentNode.appendChild(errors.email);
inputs.phone.parentNode.appendChild(errors.phone);

// Définir les messages d'erreur
errors.firstname.textContent = "First name must be at least 3 characters long and contain only letters";
errors.lastname.textContent = "Last name must contain only letters";
errors.email.textContent = "Please enter a valid email address";
errors.phone.textContent = "Please enter a valid phone number (10-13 digits)";

const patterns = {
  email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?\d{10,13}$/,
  textOnly: /^[A-Za-zÀ-ÿ\s\-']+$/, // Regex pour lettres seulement (avec accents et espaces)
};

// Validate individual field
function validateField(field) {
  const value = inputs[field].value.trim();
  let valid = true;

  switch (field) {
    case "firstname":
      valid = value.length >= 3 && patterns.textOnly.test(value);
      break;
    case "lastname":
      valid = value.length >= 1 && patterns.textOnly.test(value);
      break;
    case "email":
      valid = patterns.email.test(value);
      break;
    case "phone":
      valid = patterns.phone.test(value);
      break;
  }

  return valid;
}

// Fonction pour afficher les erreurs visuellement
function showFieldError(field, isValid) {
  if (!isValid) {
    inputs[field].style.borderColor = "red";
    inputs[field].style.backgroundColor = "#ffe6e6";
    if (errors[field]) {
      errors[field].classList.add("show");
      errors[field].style.maxHeight = errors[field].scrollHeight + "px";
    }
  } else {
    inputs[field].style.borderColor = "";
    inputs[field].style.backgroundColor = "";
    if (errors[field]) {
      errors[field].classList.remove("show");
      errors[field].style.maxHeight = "0";
    }
  }
}

// Fonction pour valider tout le formulaire
function validateAllFields() {
  const validFirstName = validateField("firstname");
  const validLastName = validateField("lastname");
  const validEmail = validateField("email");
  const validPhone = validateField("phone");

  // Afficher les erreurs visuellement
  showFieldError("firstname", validFirstName);
  showFieldError("lastname", validLastName);
  showFieldError("email", validEmail);
  showFieldError("phone", validPhone);

  return validFirstName && validLastName && validEmail && validPhone;
}

// Send Button
sendButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Valider tous les champs et afficher les erreurs (SEULEMENT APRÈS LE CLIC)
  const isValid = validateAllFields();

  if (isValid) {
    sendButton.textContent = "Sending...";
    sendButton.disabled = true;

    setTimeout(() => {
      alert("Message sent successfully!");

      // Reset all inputs
      Object.values(inputs).forEach((input) => {
        if (input) {
          input.value = "";
          input.style.borderColor = "";
          input.style.backgroundColor = "";
        }
      });

      Object.values(errors).forEach((err) => {
        err.classList.remove("show");
        err.style.maxHeight = "0";
      });

      sendButton.textContent = "Send Message";
      sendButton.disabled = false;
    }, 800);
  } else {
    alert("Please correct the highlighted fields before sending.");
  }
});

// Écouteurs pour enlever le style d'erreur quand l'utilisateur commence à taper
["firstname", "lastname", "email", "phone"].forEach((key) => {
  if (inputs[key]) {
    inputs[key].addEventListener("input", () => {
      // Enlever le style rouge quand l'utilisateur tape (mais pas de validation)
      inputs[key].style.borderColor = "";
      inputs[key].style.backgroundColor = "";
      errors[key].classList.remove("show");
      errors[key].style.maxHeight = "0";
    });
  }
});