const accordionToggles=document.querySelectorAll(".toggle-accordion");if(accordionToggles)for(let e of accordionToggles)e.addEventListener("click",o=>{o.preventDefault(),e.parentNode.classList.toggle("open"),window.heightFromTop(window.innerWidth)});