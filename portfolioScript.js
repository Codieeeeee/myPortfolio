// for navbar
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");
const navbarCollapse = document.getElementById('navbarNav');
const navbarToggler = document.querySelector('.navbar-toggler');

window.addEventListener("scroll", function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add("hidden1");
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Programmatically collapse the navbar
        }
    }
    else {
        // Scrolling up
        navbar.classList.remove("hidden1");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
// for photo
$(document).ready(function(){
    $("#home-right-photo").fadeIn(2000);
});
// for animation when scrolling
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry);
        if(entry.isIntersecting)
            entry.target.classList.add("show");
        // else
        //     entry.target.classList.remove("show");
    });    
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((e1)=>observer.observe(e1));

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    // Convert form data to JSON
    const data = Object.fromEntries(formData.entries());

    const submitButton = form.querySelector('button[type="submit"]');
    const toastElement = document.getElementById('form-toast');
    const toastBody = toastElement.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastElement); 

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const response = await fetch('https://myportfolio-backend-xtr2.onrender.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            // Display success toast
            toastElement.classList.remove('text-bg-danger');
            toastElement.classList.add('text-bg-success');
            toastBody.textContent = result.message;
            toast.show();
            form.reset(); // Clear the form
        } else {
            // Display error toast
            toastElement.classList.remove('text-bg-success');
            toastElement.classList.add('text-bg-danger');
            toastBody.textContent = result.message;
            toast.show();
        }
    } catch (error) {
        console.error('Error:', error);
        // Display error toast for unexpected errors
        toastElement.classList.remove('text-bg-success');
        toastElement.classList.add('text-bg-danger');
        toastBody.textContent = 'An unexpected error occurred. Please try again later.';
        toast.show();
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

function openModal(id) {
    document.getElementById(id).style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.overflow = "auto";
  }

  window.onclick = function (e) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }