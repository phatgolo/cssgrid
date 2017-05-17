export class ImageService {
	static get apiUrl() {
		return 'https://pixabay.com/api/?key=5278245-f93d27064559883584e49e360&image_type=photo&per_page=200';
	}

	mapPicture(pic) {
		return {
			src: pic.webformatURL,
			fullWidth: pic.imageWidth,
			fullHeight: pic.imageHeight,
			width: pic.webformatWidth,
			height: pic.webformatHeight,
			user: pic.user
		}
	}

	async getPictures(searchText) {
		let url = `${ImageService.apiUrl}&q=${searchText}`;
		const response = await fetch(url, {'no-cors': true});
		const result = await response.json();
		return result.hits;
	}
}