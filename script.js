const SERVICESTOP = document.querySelector("body > main > section.services > div > div").offsetTop
const PORTFOLIOTOP = document.querySelector("body > main > section.portfolio > div > div").offsetTop
const ABOUTTOP = document.querySelector("body > main > section.aboutus > div > div").offsetTop
const CONTACTTOP = document.querySelector("body > main > section.quote > div > div").offsetTop
const HEADERHEIGHT = document.querySelector("body > header").offsetHeight

const headerNavigationClick = (event) => {
    const { classList } = event.target.parentNode;

    const headerContentElement = document.querySelector("header div.header__content");

    if (headerContentElement.classList.contains("show-menu")) {
        headerContentElement.classList.remove("show-menu");
    }
    
    event.preventDefault();

    document.querySelectorAll("body > header > div > div > nav > ul > li").forEach(it => {
        it.classList.contains("active") ? 
            it.classList.remove("active") 
            : null
    })

    event.target.parentNode.classList.add("active")

    if (classList[1] === "services-link") {
        let top = SERVICESTOP - HEADERHEIGHT;
        window.scroll({
            top: top,
            behavior: 'smooth'
        });

    }
    else if (classList[1] === "portfolio-link") {
        let top = PORTFOLIOTOP - HEADERHEIGHT;
        window.scroll({
            top: top,
            behavior: 'smooth'
        });
    }
    else if (classList[1] === "about-link") {
        let top = ABOUTTOP - HEADERHEIGHT;
        window.scroll({
            top: top,
            behavior: 'smooth'
        });
    }
    else if (classList[1] === "contact-link") {
        let top = CONTACTTOP - HEADERHEIGHT;
        window.scroll({
            top: top,
            behavior: 'smooth'
        });
    }
    else if (classList[1] === "home-link") {
        document.querySelector("body").scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

const portfolioNavigationClick = (event) => {
    
    event.preventDefault();

    document.querySelectorAll("section.portfolio > div > div > nav > ul > li").forEach(it => {
        it.classList.contains("active") ? 
            it.classList.remove("active") 
            : null        
    })

    event.target.parentNode.classList.add("active")

    let element = document.querySelectorAll("section.portfolio picture")[0]
    let elementHTML = document.querySelectorAll("section.portfolio picture")[0].outerHTML

    document.querySelector("section.portfolio div.layout-column").insertAdjacentHTML("beforeend", elementHTML)
    element.remove()
}

const setBorder = (event) => {

document.querySelectorAll("section.portfolio picture").forEach(p => {
    p.classList.remove("with-border") 
})

event.target.closest("picture").classList.add("with-border")

}

const intaractiveSlider = (event) => {
    if (
        event.target.classList.contains("iphone_button") 
        || event.target.classList.contains("screen") 
        || event.target.classList.contains("phone")
        || event.target.classList.contains("iphone_screen")
    ) {
        event.target.parentNode.classList.toggle("sceen-off")
    }

}

document.querySelector("header nav > ul").addEventListener("click", headerNavigationClick);

document.querySelector("section.portfolio nav > ul").addEventListener("click", portfolioNavigationClick);

document.querySelector("section.portfolio div.layout-column").addEventListener("click", setBorder);

document.querySelector("section.slider div.slide__iphone").addEventListener("click", intaractiveSlider);

let slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let isEnabled = true;

const changeCurrentSlide = (n) => {
    currentSlide = (n + slides.length) % slides.length;
}

const hideSlide = (diraction) => {
    isEnabled = false;
    let thisSlide = slides[currentSlide]
    thisSlide.classList.add(diraction);
    thisSlide.addEventListener("animationend", () => {
        thisSlide.classList.remove("active",  diraction)
    });
}

const showSlide = (diraction) => {
    slides[currentSlide].classList.add("next", diraction);
    slides[currentSlide].addEventListener("animationend", () => {
        slides[currentSlide].classList.remove("next",  diraction);
        slides[currentSlide].classList.add("active");
        isEnabled = true;
    });
}

const previousSlide = (n) => {
    hideSlide("to-right");
    changeCurrentSlide(n - 1);
    showSlide("from-left");
}

const nextSlide = (n) => {
    hideSlide("to-left");
    changeCurrentSlide(n + 1);
    showSlide("from-right");
}

document.querySelector(".control.prev").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isEnabled) {        
        previousSlide(currentSlide)
    }
});

document.querySelector(".control.next").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isEnabled) {
        nextSlide(currentSlide)
    }
});

let popupElement = '<div class="popup"><div class="modal"><h4>Письмо отправлено</h4></div></div>';
let okButton = '<input type="button" value="ok">';
const getSubjectElement = () => {
    let subjectValue = document.querySelector("section.quote form > input[type=text][placeholder='Subject']").value;
    let subjectElement = subjectValue.length > 0 ? 
    `<div class="subject-value"><strong>Тема:</strong>${subjectValue}</div>`
    : `<div class="subject-value">Без темы</div>`;    
    return subjectElement;
}

const getMassageElement = () => {
    let massageValue = document.querySelector("section.quote form > textarea").value;
    let massageElement = massageValue.length > 0 ? 
    `<div class="massage-value"><strong>Описание:</strong>${massageValue}</div>`
    : `<div class="massage-value">Без описания</div>`
    return massageElement;
}

const sendOkPopUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector("body").insertAdjacentHTML("beforeend", popupElement);
    
    document.querySelector(".popup .modal").insertAdjacentHTML("beforeend", getSubjectElement());
    document.querySelector(".popup .modal").insertAdjacentHTML("beforeend", getMassageElement());

    document.querySelector(".popup .modal").insertAdjacentHTML("beforeend", okButton);

    document.querySelector(".modal input[type=button]").addEventListener("click", () => {        
        document.querySelector("body .popup").remove();
        reset();     
    });
}

const reset = () => {
    document.querySelectorAll("body > main > section.quote > div > div > div.quote__form > form > input").forEach( it => {
        it.type !== "submit" ? 
                it.value = ""
                : it
    });
    document.querySelector("body > main > section.quote > div > div > div.quote__form > form > textarea").value = "";
}

document.querySelector("section.quote form").addEventListener("submit", sendOkPopUp);

toogleShow = (event) => {
    const { classList } = event.target.parentNode;
    classList.toggle("show-menu");
}

document.querySelector("header div.mobile-menu-icon").addEventListener("click", toogleShow);