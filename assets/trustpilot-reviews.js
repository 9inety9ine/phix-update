const targetElement=document.getElementById("trustpilot-reviews"),targetElementWrapper=document.querySelector(".section-product__details"),swiper_reviews=new Swiper(".swiper-reviews",{speed:1e3,spaceBetween:0,loop:!0,slidesPerView:2,centeredSlides:!0,autoplay:{delay:3e3,disableOnInteraction:!1},init:!1});fetch(window.Shopify.routes.root+"pages/contact-us?view=trustpilot").then(function(e){return e.text()}).then(function(e){0<e.indexOf("\x3c!--[reviews]--\x3e")&&(e=e.split("\x3c!--[reviews]--\x3e").pop().split("\x3c!--[/reviews]--\x3e")[0],targetElement.innerHTML=e)}).finally(function(){swiper_reviews.init(),window.heightFromTop(window.innerWidth)}).catch(function(e){console.error(e)});