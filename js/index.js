const header = document.querySelector("header");
//skills
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

//milestones
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger");


window.addEventListener("scroll", ()=>{
    activeLink();
    if (!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlCounter();
})

//NavBar
function navbar() {
        header.classList.toggle("scrolled",window.pageYOffset > 0);
}
navbar();
window.addEventListener("scroll",navbar);

// Animations 
let an = ScrollReveal({
    duration:2500,
    distance:"60px",
});

an.reveal(".showcase-info",{delay:100})
an.reveal(".showcase-image",{origin:"top", delay:200})
an.reveal(".square",{origin:"top", delay:200})

//Skills 
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight){
     return true;
    }else {
        return false;
    }
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if(currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(()=>{
            updateCount(num, maxNum);
        },12);
    }
}

let skillsPlayed = false;
let mlPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i)=>{
        let target = counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(()=>{
            updateCount(counter, target);
        } ,400)
    });
    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

//Services
function mlCounter() {
    if(!hasReached(ml_section)) return;
    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;
        setTimeout(() => {
            updateCount(ctr,target)
        }, 400);
    })
}

//portfolio
let mixer = mixitup(".portfolio-gallery",{
    selectors:{
        target:".prt-card",
    },
    animation:{
        duration:500,
    }
})

//pop up Animation
zoom_icons.forEach(icn => icn.addEventListener("click",()=>{
    prt_section.classList.add("open")
}));
modal_overlay.addEventListener("click",()=>{
    prt_section.classList.remove("open")
})

// active links
function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct,i)=>{
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter((sct) => sct.y <= 0);
    let currSectionID = passedSections.at(-1).id;
    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active")
}
activeLink();

//Dark/Light mode
let firsTheme = localStorage.getItem("dark");
changeTheme(+firsTheme);
function changeTheme(isDark) {
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon","uil-sun")
        localStorage.setItem("dark",1);
    }else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun","uil-moon")
        localStorage.setItem("dark",0)
    }
}
toggle_btn.addEventListener("click",() => {
    changeTheme(!document.body.classList.contains("dark"));
})

//open/close navbar
hamburger.addEventListener("click",()=>{
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
})
links.forEach(link => link.addEventListener("click",()=>{
    document.body.classList.remove("open")
    document.body.classList.remove("stopScrolling")
}))

//Send Email
function sendMail() {
    var params = {
      name: document.getElementById("clientName").value,
      email: document.getElementById("clientEmail").value,
      message: document.getElementById("clientMessage").value,
    };
  
    const serviceID = "service_82vvigq";
    const templateID = "template_rs7gfz9";
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
          document.getElementById("clientName").value = "";
          document.getElementById("clientEmail").value = "";
          document.getElementById("clientMessage").value = "";
          console.log(res);
          alert("Your message sent successfully!!")
      })
      .catch(err=>console.log(err));
  }