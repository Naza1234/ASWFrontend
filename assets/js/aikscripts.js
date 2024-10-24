// Disable scrolling
document.body.style.overflowY = "hidden";

// Interval for bubble animation
setInterval(() => {
    const bubbleChildren = document.getElementById("bubble").children;
    
    bubbleChildren[0].style.background = "linear-gradient(to right, hsl(136, 65%, 51%), hsl(192, 70%, 51%))";
    bubbleChildren[0].style.transform = "translateY(-5px)";

    setTimeout(() => {
        bubbleChildren[0].style.background = "hsl(233, 8%, 62%)";
        bubbleChildren[0].style.transform = "translateY(0)";
        
        bubbleChildren[1].style.background = "linear-gradient(to right, hsl(136, 65%, 51%), hsl(192, 70%, 51%))";
        bubbleChildren[1].style.transform = "translateY(-5px)";
    }, 500);

    setTimeout(() => {
        bubbleChildren[1].style.background = "hsl(233, 8%, 62%)";
        bubbleChildren[1].style.transform = "translateY(0)";
        
        bubbleChildren[bubbleChildren.length - 1].style.background = "linear-gradient(to right, hsl(136, 65%, 51%), hsl(192, 70%, 51%))";
        bubbleChildren[bubbleChildren.length - 1].style.transform = "translateY(-5px)";
    }, 1000);

    setTimeout(() => {
        bubbleChildren[bubbleChildren.length - 1].style.background = "hsl(233, 8%, 62%)";
        bubbleChildren[bubbleChildren.length - 1].style.transform = "translateY(0)";
    }, 1500);
}, 2000);

// Function to hide preloader
function preloader() {
    document.getElementById("preloader").style.display = "none";
    document.body.style.overflowY = "scroll";
}

// Mouseover event for .nav_list > a
const navLinks = document.querySelectorAll(".nav_list > a");
navLinks.forEach(link => {
    link.addEventListener("mouseover", (e) => {
        e.target.nextElementSibling.classList.add("border_active");
    });
    link.addEventListener("mouseout", (e) => {
        e.target.nextElementSibling.classList.remove("border_active");
    });
});

// Click event for hamburger icon
const hamburgerIcon = document.getElementById("hamburger_icon");
hamburgerIcon.addEventListener("click", () => {
    if (hamburgerIcon.src.includes("icon-hamburger.svg")) {
        hamburgerIcon.src = "./assets/images/icon-close.svg";
        document.getElementById("mockups").style.display = "none";
        document.getElementById("mockups").parentElement.previousElementSibling.style.paddingTop = "82%";
        document.getElementById("mockups").parentElement.previousElementSibling.style.background = "linear-gradient( hsla(233, 26%, 24%, 0.75),hsl(0, 0%, 100%))";
        document.getElementById("hamburger_list").style.display = "flex";
    } else {
        hamburgerIcon.src = "./assets/images/icon-hamburger.svg";
        document.getElementById("mockups").style.display = "block";
        document.getElementById("mockups").parentElement.previousElementSibling.style.paddingTop = "0%";
        document.getElementById("mockups").parentElement.previousElementSibling.style.background = "transparent";
        document.getElementById("hamburger_list").style.display = "none";
    }
});

// Mouseover event for .ham_border's previous element
const hamBorders = document.querySelectorAll(".ham_border");
hamBorders.forEach(hamBorder => {
    const prevElement = hamBorder.previousElementSibling;
    prevElement.addEventListener("mouseover", () => {
        hamBorder.classList.add("ham_border_active");
    });
    prevElement.addEventListener("mouseout", () => {
        hamBorder.classList.remove("ham_border_active");
    });
});
