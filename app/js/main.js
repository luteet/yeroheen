
import animations from './animations.js';
import form from './form.js';
import sliders from './sliders.js'

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	headerNav = document.querySelector('.header__nav'),
	wrapper = document.querySelector('.wrapper'),
	header = document.querySelector('.header');



// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

let headerNavTimeout;

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if ($('.header__burger')) {
	
		menu.forEach(element => {
			element.classList.toggle('is-mobile-menu-active')
		})

		clearTimeout(headerNavTimeout);
		headerNav.style.setProperty('--transition', 'transform .5s ease');

		headerNavTimeout = setTimeout(() => {
			headerNav.style.removeProperty('--transition');
		},500)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

	

	/* if($(".header__nav--list li a")) {
		menu.forEach(element => {
			element.classList.remove('is-mobile-menu-active')
		})
	} */

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize;

const telLabels = document.querySelectorAll('.tel-input-label');
let forms = document.querySelectorAll('form');

function resize() {

	windowSize = window.innerWidth;

	telLabels.forEach(tel => {
		tel.style.setProperty('--width', tel.offsetWidth + 'px');
	})

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	forms.forEach(form => {
		form.style.setProperty('--width-form', form.offsetWidth + 'px');
	})

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

sliders(windowSize);

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


let geoData = "ua";
fetch("https://ipapi.co/json")
.then(function(res) { return res.json(); })
.then(function(data) {
	geoData = data.country_code;
})
.catch();


// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

animations(windowSize, geoData);

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <form> -=-=-=-=-=-=-=-=-=-=-=-=

form(geoData);

// =-=-=-=-=-=-=-=-=-=-=-=- </form> -=-=-=-=-=-=-=-=-=-=-=-=



const lazyLoadInstance = new LazyLoad({
	callback_loaded: (element) => {
		if(element.nodeName == "VIDEO") {
			element.autoplay = true;
			element.play();
		}
	}
});

