import {ImageService} from './image-service.js';

function init() {
	const imageService = new ImageService();
	const imageGallery = document.getElementById('imageGallery');
	const searchBox = document.getElementById('searchBox');

	let timeout = null;
	searchBox.addEventListener('keyup', () => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			let pictures = await imageService.getPictures(searchBox.value);
			imageGallery.images = pictures.map(imageService.mapPicture);
			window.scrollTo(0, 0);
		}, 500);
	});
}

window.addEventListener('load', init);