// for navbar
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add("hidden1");
    } else {
        // Scrolling up
        navbar.classList.remove("hidden1");
    }
    
    lastScrollTop = scrollTop;
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