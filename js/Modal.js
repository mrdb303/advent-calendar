export default class Modal {

	constructor(maxDay){
		this.modalData = [];
		this.maxDay = maxDay;
		this.idNum = 0;
		this.width = 300;
		this.height = 170;
		this.inner = "";
		this.title = "";
		this.pTagTextInModal = "";
		this.modalHeight = "90%";
	}


	loadAllModalData(data) {
		this.modalData = data;
	}


	outputModal(idNum){

		this.setIdNum(idNum);
		this.setVideoDimensions();

		let inner = this.getModalContent();
		inner.appendChild(this.insertClear());

		let modal = document.getElementById("modal-box");
		modal.style.display = "block";
	}


	setIdNum(idNum){
		this.idNum = idNum;
	}


	setMaxDay(value){
		this.maxDay = value;
	}


	setModalHeight(height){

		(height === 'max')? this.modalHeight = "90%": this.modalHeight ="40%";

		let modalContent = document.getElementsByClassName("modal-content")[0];
		modalContent.setAttribute('height', this.modalHeight);
	}


	insertClear(){

		let clr = document.createElement('div');
		clr.setAttribute('class', 'clear');
		return clr;
	}


	getModalContent(){

		this.setupArticleBox();

		this.pTagTextInModal = document.createElement('p');
		this.pTagTextInModal.setAttribute('class', 'wht');
		
		if(this.idNum > this.maxDay) return this.outputLocked();

		this.inner = this.getMainContent(this.inner, this.pTagTextInModal);

		if(this.modalData[this.idNum - 1].tube != "") {
			let vid = this.makeYoutubeFrame(this.modalData[this.idNum - 1].tube);
			return this.padOutFrame(this.inner, vid);
		}

		this.setModalHeight('max');
		return this.outputLink();
	}

	setupArticleBox(){

		this.inner = document.getElementById('article-data');
		this.inner.innerHTML = "";
		this.inner.appendChild(this.getHeading());
		this.inner.appendChild(this.insertBreak());
	}

	outputLink(){

		this.inner.appendChild(this.insertBreak());
		this.inner.appendChild(this.insertClear());
		this.inner.appendChild(this.populateLink(this.idNum));
		return this.inner;
	}

	outputLocked(){

		this.pTagTextInModal.innerText = "This day is locked - Please come back later!";
		this.inner.appendChild(this.pTagTextInModal);
		this.setModalHeight('min');
		return this.inner;
	}

	getMainContent(inner, pTagTextInModal){
		
		this.title = document.createElement('h4');
		this.title.innerText = this.modalData[this.idNum - 1].title;
		inner.appendChild(this.title);
		inner.appendChild(this.insertBreak());
		inner.appendChild(this.insertBreak());
		pTagTextInModal.innerText = this.modalData[this.idNum - 1].content;
		inner.appendChild(pTagTextInModal);
		inner.appendChild(this.insertBreak());
		return inner;
	}


	padOutFrame(inner, vid){

		inner.appendChild(vid);
		inner.appendChild(this.insertClear());
		inner.appendChild(this.populateLink(this.idNum));
		inner.appendChild(this.insertBreak());
		inner.appendChild(this.insertBreak());
		return inner;
	}

	populateLink(){

		let articleLink = document.createElement('a');
		articleLink.setAttribute('href', this.modalData[this.idNum-1].link);
		let textVal = document.createElement('text');
		textVal.innerText = this.modalData[this.idNum-1].link;
		articleLink.appendChild(textVal);
		return articleLink;
	}


	insertModalCloseIcon(){
		
		let closeIcon = document.createElement('span');
		closeIcon.setAttribute('class', 'close');
		let textVal = document.createElement('text');
		textVal.innerText = "\u00d7";
		closeIcon.appendChild(textVal);
		return closeIcon;
	}

	

	getHeading(){

		let heading = document.createElement('h2');
		let append = (this.idNum === this.maxDay) ? "Today is ": "";
		
		heading.innerText = append + "Day: " + this.idNum;
		return heading;
	}



	makeYoutubeFrame(url){

		this.clearIFrame("ytwrap");
	
		let elName = document.createElement("div");
		elName.setAttribute('id', 'ytwrap');
	
		// Frame size dynamically changed, based on browser dimensions
		let frameDiv = document.createElement('iframe');
		frameDiv.setAttribute('width', this.width);
		frameDiv.setAttribute('height', this.height);
		frameDiv.setAttribute('src', url);
		frameDiv.setAttribute('frameborder', '0');
		frameDiv.setAttribute('allowFullScreen', '');
		frameDiv.setAttribute('controls', '1'); // Play controls
		elName.appendChild(frameDiv);
		return elName;
	}


	insertBreak(){
		let br = document.createElement('br');
		return br;
	}


	// Code used in jQuery for finding browser width
	getWidth() {
		return Math.max(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth
		);
	}


	// There are three different dimensions for Youtube iframe
	// based on browser width.
	setVideoDimensions(){
		this.width = 300;
		this.height = 170;

		if(this.getWidth() > 600 && this.getWidth() < 860){
			this.width = 450;
			this.height = 255;
		}

		if(this.getWidth() >= 860){
			this.width = 600;
			this.height = 340;
		}
	}


	// The iframe contains a Youtube video if relevant.
	// This is called to ensure that the video can't
	// play if the modal is closed.
	clearIFrame(idName){

		let elName = document.getElementById(idName);

		if(elName != null){
			while(elName.firstChild){
				elName.removeChild(elName.firstChild);
			}
		}
	}
}