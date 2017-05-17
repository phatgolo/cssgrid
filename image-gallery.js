class HTMLImageGalleryElement extends HTMLElement {
	static get observedAttributes() {
		return [];
	}

	get images() {
		return this._images;
	}

	set images(value) {
		if (!value.constructor === Array) {
			throw Error('Images must be an Array');
		}

		this._images = value;
		this.updateGallery();
	}

	constructor() {
		super();

		const doc = document.currentScript.ownerDocument;
		const template = doc.querySelector('#ig-template');
		this._listItemTemplate = doc.querySelector('#igp-template');

		this._root = this.attachShadow({ mode: 'closed' });
		this._root.appendChild(template.content.cloneNode(true));

		this._images = [];
	}

	connectedCallback () {
		this._list = this._root.querySelector('ul');
	}

	updateGallery() {
		this._list.innerHTML = '';
		this._images.forEach((pic, i) => {
			const listItem = this._listItemTemplate.content.cloneNode(true);
			const image = listItem.querySelector('img');
			const li = listItem.querySelector('li');
			const p = listItem.querySelector('p');
			const {
				src,
				width, height,
				fullWidth, fullHeight
			} = pic;

			image.src = src;

			if (height > width) {
				li.classList.add('portrait');
			}

			if (height < width * .5) {
				li.classList.add('panorama');
			}

			if (fullWidth * fullHeight > 15000000) {
				li.classList.add('large');
			}

			p.textContent = i;
			this._list.appendChild(listItem);
		});
	}
}

customElements.define('image-gallery', HTMLImageGalleryElement);