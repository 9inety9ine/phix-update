const drawerMenuToggle=document.querySelector(".toggle-drawer-menu"),swiper_drawer_menu=(drawerMenuToggle&&drawerMenuToggle.addEventListener("click",e=>{toggleDrawer("menu",!1)}),new Swiper(".swiper-drawer-menu",{speed:1e3,spaceBetween:24,loop:!1,slidesPerView:"auto",init:!1}));swiper_drawer_menu.init();