window.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("instafeed");var e;r&&(e=InstagramToken,fetch("https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token="+e+"&limit=8",{method:"GET"}).then(e=>e.json()).then(e=>{let a=1;for(var t of e.data){var i=t.permalink,n=t.caption,s=String(t.media_type).toLowerCase(),o=t.media_url,t=t.thumbnail_url;let e="";e=(e=(e+='<div class="section-instagram-feed__item section-instagram-feed__item--'+a+" preload section-instagram-feed__item--"+s+'">')+('<a class="section-instagram-feed__link" href="'+i+'" rel="noopener" target="_blank">')+("video"===s?'<img src="" data-src="'+t+'" alt="'+n+'" class="section-instagram-feed__image">':'<img src="" data-src="'+o+'" alt="'+n+'" class="section-instagram-feed__image">'))+"</a>"+"</div>",r.innerHTML+=e,a++}}).finally(function(){window.initializeImageLoad()}).catch(e=>{console.log(e)}))});