const nav = document.querySelector(".navbar");
window.addEventListener("scroll", fixNav);

// Typewriter Effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove character
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //  Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial type speed
    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before typing starts
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Initialize Typewriter
  new TypeWriter(txtElement, words, wait);
}

// Sticky Nav
function fixNav() {
  if (window.scrollY > nav.offsetHeight + 150) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
}

// Smooth Scroll
const scroll = new SmoothScroll('.navbar a[href*="#"]', '.logo a[href*="#"]', {
  speed: 650,
});

// Contact Form Wave
const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    // Split letters into array
    .split("")

    // Create array with each letter wrapped by a span
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )

    // Turn it back into a string
    .join("");
});
