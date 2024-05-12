"use strict";
const logo = document.getElementById("logo");
const logoContainer = document.getElementById("logo-container");

if (window.innerWidth >= 500) {
  logoContainer.addEventListener("mouseover", () => {
    logo.style.opacity = "0.6";
    setTimeout(() => {
      logo.src = "Images/Logo2.png";
      logo.style.opacity = "1";
    }, 200);
  });

  logoContainer.addEventListener("mouseout", () => {
    logo.style.opacity = "0.6";
    setTimeout(() => {
      logo.src = "Images/Logo.png";
      logo.style.opacity = "1";
    }, 200);
  });
} else {
  logoContainer.addEventListener("click", () => {
    logo.style.opacity = "0.6";
    setTimeout(() => {
      logo.style.opacity = "1";
    }, 200);
  });

  logoContainer.addEventListener("click", () => {
    logo.style.opacity = "0.6";
    setTimeout(() => {
      logo.style.opacity = "1";
    }, 200);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(
    ".main_wrapper, .child img, .main_wrapper2, .child2 img, .socmedia img, .footer-content-icons a img"
  );

  images.forEach((img) => {
    let originalSrc = img.getAttribute("src");
    let coloredSrc = img.getAttribute("data-colored-src");

    img.addEventListener("mouseover", function () {
      if (coloredSrc) {
        img.src = coloredSrc;
      }
    });

    img.addEventListener("mouseout", function () {
      if (coloredSrc && img.src !== originalSrc) {
        img.src = originalSrc;
      }
    });
  });
});

let swiper = new Swiper(".slide-container", {
  slidesPerView: 4,
  spaceBetween: 10,
  sliderPerGroup: 4,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".imagesliderrightarrow",
    prevEl: ".imagesliderleftarrow",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 5,
    },
    1920: {
      slidesPerView: 6,
    },
  },
});

let svgIcon = document.getElementById("hamburgersvg");
let navBtn = document.querySelector(".navbar-toggler");
let navBigBtn = document.querySelector(".btn-meeting");
let isOpen = false;

svgIcon.addEventListener("click", () => {
  navBtn.style.pointerEvents = "none";
  setTimeout(() => {
    navBtn.style.pointerEvents = "auto";
  }, 400);
  if (isOpen) {
    svgIcon.innerHTML = `
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="24" height="24" rx="12" stroke="#0A35A0" />
                <path d="M6.92285 8.75H17.4995" stroke="#0A35A0" stroke-linecap="round" />
                <path d="M6.92285 12.5959H17.4995" stroke="#0A35A0" stroke-linecap="round" />
                <path d="M6.92285 16.4424H17.4995" stroke="#0A35A0" stroke-linecap="round" />
            </svg>
        `;
    if (window.innerWidth <= 499) {
      navBigBtn.style.opacity = "1";
      navBigBtn.style.pointerEvents = "auto";
    }
  } else {
    svgIcon.innerHTML = `
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="24" height="24" rx="12" fill="#0A35A0" stroke="#0A35A0"/>
                <path d="M6.92285 8.74994H17.4995" stroke="#FCF6EE" stroke-linecap="round"/>
                <path d="M6.92285 12.5959H17.4995" stroke="#FCF6EE" stroke-linecap="round"/>
                <path d="M6.92285 16.4423H17.4995" stroke="#FCF6EE" stroke-linecap="round"/>
            </svg>
        `;
    if (window.innerWidth <= 499) {
      navBigBtn.style.opacity = "0";
      navBigBtn.style.pointerEvents = "none";
    }
  }
  isOpen = !isOpen;
});

let languageChanger = document.getElementById("changelanguage");
// let arrow3 = document.getElementById("arrow3");
// let arrow4 = document.getElementById("arrow4");
let isEnglish = true;
let contentImage = document.getElementById("contentimg");
languageChanger.addEventListener("click", async function () {
  try {
    let jsonData;

    if (isEnglish) {
      let response = await fetch("../TextJSON/EnText.json");
      jsonData = await response.json();
      isEnglish = false;
      languageChanger.classList.add("test");
      contentImage.src = "../Images/Group 55.svg";
      // arrow3.classList.add("arrow3eng");
      // arrow4.classList.add("arrow4eng");
    } else {
      let response = await fetch("../TextJSON/GeText.json");
      jsonData = await response.json();
      isEnglish = true;
      languageChanger.classList.remove("test");
      contentImage.src = "../Images/Group 58.svg";
      // arrow3.classList.remove("arrow3eng");
      // arrow4.classList.remove("arrow4eng");
    }

    document.querySelectorAll("[data-id]").forEach((element) => {
      let key = element.getAttribute("data-id");
      if (jsonData[key]) {
        element.innerHTML = jsonData[key];
        if (element.getAttribute("placeholder"))
          element.placeholder = jsonData[key];
      }
    });
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
});

document.getElementById("phone").addEventListener("keydown", function (event) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
  ];
  const isNumericKey = event.key >= "0" && event.key <= "9";
  const isAllowedKey = allowedKeys.includes(event.key);

  if (!isNumericKey && !isAllowedKey) {
    event.preventDefault();
  }
});

let myForm = document.getElementById("myForm");
myForm.addEventListener("submit", function (event) {
  let errors = {};

  let nameInput = document.getElementById("yourname").value;

  if (nameInput === "") {
    if (languageChanger.classList.contains("test")) {
      errors.name = "Please fill your name";
    } else {
      errors.name = "გთხოვთ შეიყვანოთ სახელი";
    }
  }

  let companyInput = document.getElementById("yourcompanyname").value;

  if (companyInput === "") {
    if (languageChanger.classList.contains("test")) {
      errors.company = "Please fill company name";
    } else {
      errors.company = "გთხოვთ შეიყვანოთ კომპანია";
    }
  }

  let emailInput = document.getElementById("emailInput").value;
  let validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailInput.match(validEmail)) {
    if (emailInput === "") {
      if (languageChanger.classList.contains("test")) {
        errors.email = "Please fill email adress";
      } else {
        errors.email = "გთხოვთ შეიყვანოთ ელ-ფოსტა";
      }
    } else {
      if (languageChanger.classList.contains("test")) {
        errors.email = "Invalid email";
      } else {
        errors.email = "არასწორი მეილი";
      }
    }
  }

  let phoneInput = document.getElementById("phone").value;

  let validPhone = /^[0-9]{9,12}$/;

  if (!phoneInput.match(validPhone)) {
    if (phoneInput === "") {
      if (languageChanger.classList.contains("test")) {
        errors.phone = "Please fill your number";
      } else {
        errors.phone = "გთხოვთ შეიყვანოთ ნომერი";
      }
    } else {
      if (languageChanger.classList.contains("test")) {
        errors.phone = "Invalid number";
      } else {
        errors.phone = "არასწორი ნომერი";
      }
    }
  }

  let serviceInput = document.getElementById("service").value;

  if (serviceInput === "") {
    if (languageChanger.classList.contains("test")) {
      errors.service = "Please fill service";
    } else {
      errors.service = "გთხოვთ შეიყვანეთ სერვისი";
    }
  }

  this.querySelectorAll(".error-text").forEach((el) => {
    el.innerHTML = " ";
  });

  for (let item in errors) {
    let errorElement = document.getElementById("error-" + item);

    if (errorElement) {
      errorElement.innerText = errors[item];
    }
  }

  if (Object.keys(errors).length >= 1) {
    event.preventDefault();
    this.querySelectorAll(".error-text").forEach((el) => {
      el.classList.add("errorfound");
    });
  }

  if (Object.keys(errors).length === 0) {
    this.querySelectorAll(".error-text").forEach((el) => {
      el.classList.remove("errorfound");
    });
  }
});

let accordBtn = document.querySelectorAll(".accordion-button");
accordBtn.forEach((button) => {
  button.addEventListener("click", function () {
    let parentH2 = this.closest(".accordion-header");
    if (parentH2) {
      parentH2.classList.toggle("collapsed-bg");
    }

    this.style.pointerEvents = "none";
    setTimeout(() => {
      this.style.pointerEvents = "auto";
    }, 400);
  });
});

function toggleMeetingButton() {
  let meetingBtn = document.querySelector(".btn-meeting");
  if (window.innerWidth >= 500) {
    if (languageChanger.classList.contains("test")) {
      meetingBtn.classList.toggle("move-left-eng");
    } else {
      meetingBtn.classList.toggle("move-left-geo");
    }
  }
}
