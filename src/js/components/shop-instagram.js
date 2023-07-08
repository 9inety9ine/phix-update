window.addEventListener('DOMContentLoaded', function () {
	const instaFeed = document.getElementById('instafeed');
	if (instaFeed) {
		const token = InstagramToken;
		const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption';
		const limit = 200;
		fetch('https://graph.instagram.com/me/media?fields=' + fields + '&access_token=' + token + '&limit=' + limit, {
			method: 'GET',
		})
			.then(response => {
				return response.json();
			})
			.then(response => {
				let count = 1;
				for (let post of response.data) {
					let link = post.permalink;
					let caption = post.caption;
					let media_type = String(post.media_type).toLowerCase();
					let image = post.media_url;
					let video_thumbnail = post.thumbnail_url;
					let html = '';
					html += '<div class="section-shop-instagram__item section-shop-instagram__item--' + count + ' preload section-shop-instagram__item--' + media_type + '">';
					html += '<a class="section-shop-instagram__link" href="' + link + '" rel="noopener" target="_blank">';
					if (media_type === 'video') {
						html += '<img src="" data-src="' + video_thumbnail + '" alt="' + caption + '" class="section-shop-instagram__image">';
					} else {
						html += '<img src="" data-src="' + image + '" alt="' + caption + '" class="section-shop-instagram__image">';
					}
					html += '</a>';
					html += '</div>';
					instaFeed.innerHTML += html;
					count++;
				}
			})
			.finally(function () {
				window.initializeImageLoad();
			})
			.catch(error => {
				console.log(error);
			});
	}
});
