class HTMLTextBox extends HTMLElement {
	static get observedAttributes() {
		return ['placeholder', 'value'];
	}

	constructor() {
		super();

		const doc = document.currentScript.ownerDocument;
		const template = doc.querySelector('#tb-template');

		this._root = this.attachShadow({ mode: 'closed' });
		this._root.appendChild(template.content.cloneNode(true));

		this._placeholderText = null;
		this._value = null;

		console.log(HTMLTextBox.observedAttributes);
	}

	connectedCallback() {
		this._editor = this._root.querySelector('.editor');
		this._placeholder = this._root.querySelector('.placeholder');
		this._search = this._root.querySelector('.search');

		if (!this.attributes.getNamedItem('tabindex')) {
			var tabindex = document.createAttribute("tabindex");
			tabindex.value = '0';
			this.attributes.setNamedItem(tabindex);
		}

		this._onKeyPress = this._onKeyPress.bind(this);
		this._onKeyUp = this._onKeyUp.bind(this);
		this._onPaste = this._onPaste.bind(this);
		this._addEventListeners();
	}

	attributeChangedCallback(attributeName, oldValue, newValue) {
		if (attributeName === 'placeholder') {
			if (oldValue !== newValue) {
				this._placeholderText = newValue;
			}
		}

		if (attributeName === 'value') {
			if (oldValue !== newValue) {
				this._value = newValue;
			}
		}
	}

	_addEventListeners() {
		this._editor.addEventListener('keypress', this._onKeyPress);
		this._editor.addEventListener('keyup', this._onKeyUp);
		this._editor.addEventListener('paste', this._onPaste);
	}

	_onPaste(event) {
		let html = event.clipboardData.getData('text/html');
		if (!html) return;

		event.preventDefault();

		let proxyElement = document.createElement('div');
		proxyElement.innerHTML = html;
		// let selection = this._doc.getSelection();
		// let range = selection.getRangeAt(0);
		// console.log(selection);
      	// console.log(range);
		// console.dir(range.startContainer);
		// console.log(event.target);
		this._editor.textContent = proxyElement.textContent;
	}

	_onKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	_onKeyUp(event) {
		if (this._editor.textContent === '') {
			this._placeholder.classList.remove('hide');
		} else {
			this._placeholder.classList.add('hide');
		}
	}
}

customElements.define('text-box', HTMLTextBox);