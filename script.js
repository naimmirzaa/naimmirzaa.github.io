document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  } else {
    console.warn("AOS is not defined. Make sure to include the AOS library.");
  }

  // Initialize EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init("J8Hg-Mo-Rb6BM5a4N");
  } else {
    console.warn("EmailJS is not defined. Make sure to include the EmailJS library.");
  }

  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (menuBtn && menuBtn.classList.contains("open")) {
        menuBtn.classList.remove("open");
        navLinks.classList.remove("open");
      }
    });
  });

  // Sticky Header
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Progress Bar
  window.onscroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("myBar");
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }

    // Back to Top Button
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      if (winScroll > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  };

  // Back to Top Button Click
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Typed Text Effect
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const textArray = ["Web Developer", "System Administrator", "Database Manager", "Problem Solver"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (typedTextSpan && cursorSpan) {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }
  }

  function erase() {
    if (typedTextSpan && cursorSpan) {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }
  }

  if (typedTextSpan && cursorSpan) {
    setTimeout(type, newTextDelay + 250);
  }

  // Active Navigation Links
  const sections = document.querySelectorAll("section");
  const navLinks2 = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks2.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Projects Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 100);
          } else if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Testimonial Slider
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;

  function showTestimonials() {
    if (window.innerWidth < 768) {
      // On mobile, show only one testimonial at a time
      testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      // On desktop, show all testimonials
      testimonialCards.forEach(card => {
        card.style.display = 'block';
      });
    }
  }

  // Initialize testimonial display
  window.addEventListener('resize', showTestimonials);
  showTestimonials();

  // Testimonial navigation
  if (testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        currentTestimonial--;
        if (currentTestimonial < 0) {
          currentTestimonial = testimonialCards.length - 1;
        }
        showTestimonials();
      }
    });

    testimonialNext.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        currentTestimonial++;
        if (currentTestimonial >= testimonialCards.length) {
          currentTestimonial = 0;
        }
        showTestimonials();
      }
    });
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (barPosition < screenPosition) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      }
    });
  };
  
  // Call once on page load
  setTimeout(animateSkillBars, 500);
  
  // Call on scroll
  window.addEventListener('scroll', animateSkillBars);

  // Form Validation and EmailJS Integration
    // Form Validation and EmailJS Integration
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const formError = document.getElementById("formError");
    const resetFormBtn = document.getElementById("resetForm");
    const retryFormBtn = document.getElementById("retryForm");
  
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();
  
        // Basic validation
        if (!name || !email || !subject || !message) {
          formError.textContent = 'Please fill out all fields.';
          formError.classList.add('show');
          return;
        }
  
        formError.classList.remove('show');
        formSuccess.classList.remove('show');
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
  
        // Prepare EmailJS parameters
        const templateParams = {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message
        };
  
        try {
          const response = await emailjs.send('service_4mirza', 'template_default', templateParams);
          console.log('SUCCESS!', response.status, response.text);
          formSuccess.textContent = "Message sent successfully!";
          formSuccess.classList.add("show");
          contactForm.reset();
        } catch (error) {
          console.error('FAILED...', error);
          formError.textContent = "Something went wrong. Please try again.";
          formError.classList.add('show');
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      });
    }
  
    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", () => {
        formSuccess.classList.remove("show");
      });
    }
  
    if (retryFormBtn) {
      retryFormBtn.addEventListener("click", () => {
        formError.classList.remove("show");
      });
    }
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
  if (resetFormBtn) {
    resetFormBtn.addEventListener("click", () => {
      formSuccess.classList.remove("show");
    });
  }
  
  if (retryFormBtn) {
    retryFormBtn.addEventListener("click", () => {
      formError.classList.remove("show");
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});