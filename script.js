const SERVICESTOP = document.querySelector("body > main > section.services > div > div").offsetTop
const PORTFOLIOTOP = document.querySelector("body > main > section.portfolio > div > div").offsetTop
const ABOUTTOP = document.querySelector("body > main > section.aboutus > div > div").offsetTop
const CONTACTTOP = document.querySelector("body > main > section.quote > div > div").offsetTop

const HEADERHEIGHT = document.querySelector("body > header").offsetHeight

const headerNavigationClick = (event) => {
    const { classList } = event.target.parentNode

    event.preventDefault(); 
    event.stopPropagation();

    document.querySelectorAll("body > header > div > div > nav > ul > li").forEach(it => {
        it.classList.contains("active") ? 
            it.classList.remove("active") 
            : null
    })

    event.target.parentNode.classList.add("active")

    if (classList[1] === "services-link") {
        console.log(classList[1])
        console.log(SERVICESTOP)
        window.scrollTo(0, SERVICESTOP - HEADERHEIGHT);

    }
    else if (classList[1] === "portfolio-link") {
        console.log(classList[1])
        window.scrollTo(0, PORTFOLIOTOP - HEADERHEIGHT);
    }
    else if (classList[1] === "about-link") {
        console.log(classList[1])
        window.scrollTo(0, ABOUTTOP - HEADERHEIGHT);
    }
    else if (classList[1] === "contact-link") {
        console.log(classList[1])
        window.scrollTo(0, CONTACTTOP - HEADERHEIGHT);
    }
    else if (classList[1] === "home-link") {
        console.log(classList[1])
        document.querySelector("body").scrollIntoView();
    }
}

const portfolioNavigationClick = (event) => {
    const { classList } = event.target.parentNode

    event.preventDefault(); 
    event.stopPropagation();

    document.querySelectorAll("section.portfolio > div > div > nav > ul > li").forEach(it => {
        it.classList.contains("active") ? 
            it.classList.remove("active") 
            : null        
    })

    event.target.parentNode.classList.add("active")

    let element = document.querySelectorAll("section.portfolio picture")[0]
    let elementHTML = document.querySelectorAll("section.portfolio picture")[0].outerHTML

    document.querySelector("section.portfolio div.layout-4-column").insertAdjacentHTML("beforeend", elementHTML)
    element.remove()
}

const setBorder = (event) => {

document.querySelectorAll("section.portfolio picture").forEach(p => {
    p.classList.remove("with-border") 
})

event.target.closest("picture").classList.add("with-border")

}

const intaractiveSlider = (event) => {
    let iphoneScreenElement = '<div class="iphone_screen"></div>';

    console.log(event.target)
    if (
        event.target.classList.contains("iphone_button") 
        || event.target.classList.contains("screen") 
        || event.target.classList.contains("iphone_container")
        || event.target.classList.contains("iphone_screen")
    ) {
        event.target.parentNode.classList.toggle("sceen-off")
    }

}

document.querySelector("header nav > ul").addEventListener("click", headerNavigationClick);

document.querySelector("section.portfolio nav > ul").addEventListener("click", portfolioNavigationClick);

document.querySelector("section.portfolio div.layout-4-column").addEventListener("click", setBorder);

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
    : `<div class="subject-value">Без темы</div>`
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
    });
}

const submit = () => {
    console.log(`OK`)
}

document.querySelector("section.quote form").addEventListener("submit", sendOkPopUp);