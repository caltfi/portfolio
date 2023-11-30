//Calum Fenton 2023
const homeLink = document.querySelector("#home-link");
const aboutLink = document.querySelector("#about-link");
const portfolioLink = document.querySelector("#portfolio-link");
const contactLink = document.querySelector("#contact-link");
const cvLink = document.querySelector("#cv-link");
const allLinks = [homeLink, aboutLink, portfolioLink, contactLink, cvLink];
const logoLink = document.querySelector('#logo-link');

//toggle classes based on clicked link
function handleLinkClick(clickedLink) {
    allLinks.forEach(link => {
        if (link === clickedLink) {
            link.classList.remove("link-body-emphasis");
            link.classList.add("text-secondary");
        } else {
            link.classList.remove("text-secondary");
            link.classList.add("link-body-emphasis");
        }
    });
}

//load content using fetch
async function loadContent(url, clickedLink) {
    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response error");
        }
        
        const data = await response.text();
    
        document.getElementById("content").innerHTML = data;
        handleLinkClick(clickedLink);
    }
    catch (error) {
        document.getElementById("content").innerHTML = "<p>Error loading content.</p>";
        console.error("Fetch error:", error);
    }
}

function scrollToTop() {
    window.scrollTo({
      top: 0
    });
}

document.addEventListener("DOMContentLoaded", function () {

    //this is to ensure the buttons on the default hero screen are actually directing to the right place......
    const loadDefaultContent = async () => {
        await loadContent("./default.html", homeLink);

        // Now, after the content is loaded, try to access the buttons
        const portfolioButton = document.querySelector("#portfolio-button");
        const aboutButton = document.querySelector("#about-button");

        console.log("Portfolio button:", portfolioButton);
        console.log("About button:", aboutButton);

        if(portfolioButton && aboutButton){
            portfolioButton.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("Portfolio button clicked");
                loadPortfolioContent(portfolioLink);
            });

            aboutButton.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("About button clicked");
                loadContent("./about.html", aboutLink);
            });
        }
    };

    const loadPortfolioItem = async (item, link) => {
        await loadContent(item, link);

        const backButton = document.querySelector("#back-button");
        console.log("Back Button for: ", item, " From ", link, backButton);

        if(backButton){
            backButton.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("back button clicked");
                loadPortfolioContent(backButton);
            });
        }
    }

    //load portfolio content
    const loadPortfolioContent = async (link) => {
        await loadContent("./portfolio.html", link);

        // Now, after the content is loaded, try to access the buttons
        const caseStudy1 = document.querySelector("#case-study-1");
        const caseStudy2 = document.querySelector("#case-study-2");
        const caseStudy3 = document.querySelector("#case-study-3");


        console.log("Case Study 1:", caseStudy1);
        console.log("Case Study 2:", caseStudy2);
        console.log("Case Study 3:", caseStudy3);

        const portfolioCards = document.querySelectorAll('.portfolio-card');
        console.log(portfolioCards);

        portfolioCards.forEach((card) => {

            card.addEventListener('mouseenter', (e) => {
                if(e.target.classList.contains('portfolio-card')){
                    e.target.classList.add('shadow-lg');
                }
            });
            card.addEventListener('mouseleave', (e) => {
                if(e.target.classList.contains('portfolio-card')){
                    e.target.classList.remove('shadow-lg');
                }
            });

        });


        if(caseStudy1 && caseStudy2 && caseStudy3){
            caseStudy1.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("case study 1 clicked");
                loadPortfolioItem("./collabdown.html", caseStudy1);
                scrollToTop();
            });

            caseStudy2.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("case study 2 clicked");
                loadPortfolioItem("./medtrackpro.html", caseStudy2);
                scrollToTop();
            });

            caseStudy3.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("case study 3 clicked");
                loadPortfolioItem("./islabanking.html", caseStudy3);
                scrollToTop();
            });
        }
    };

    logoLink.addEventListener("click", function (e) {
        e.preventDefault();
        loadDefaultContent();
    });

    homeLink.addEventListener("click", function (e) {
        e.preventDefault();
        loadDefaultContent();
    });

    portfolioLink.addEventListener("click", function (e) {
        e.preventDefault();
        loadPortfolioContent(portfolioLink);
    });

    aboutLink.addEventListener("click", function (e) {
        e.preventDefault();
        loadContent("./about.html", aboutLink);
    });

    
    contactLink.addEventListener("click", function (e) {
        e.preventDefault();
        loadContent("./contact.html", contactLink);
    });

    cvLink.addEventListener("click", function (e) {
        e.preventDefault();
        loadContent("./cv.html", cvLink);
    });

    //default
    loadDefaultContent();
    
});
