
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




// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-




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
		headerNav.style.setProperty('--transition', 'opacity .3s ease, visibility .3s ease');

		headerNavTimeout = setTimeout(() => {
			headerNav.style.removeProperty('--transition');
		},300)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

	
	

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

let workStagesGallery = [];

function resize() {

	windowSize = window.innerWidth;

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;

	/* resizeCheckFunc(992,
	function () {  // screen > 992px

		

	},
	function () {  // screen < 992px

		

	}); */

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll('.index-hero__background').forEach(sliderElement => {

	const slider = new Splide(sliderElement, {

		type: "fade",
		rewind: true,
		arrows: false,
		pagination: false,
		drag: false,
		easing: "ease",
		speed: 700,
		interval: 2000,
		pauseOnHover: false,
		autoplay: true,
		updateOnMove: true,

	});

	const sliderWord = new Splide(sliderElement.closest('section').querySelector('.index-hero__title--word'), {

		direction: "ttb",
		height: "1.6ch",
		rewind: true,
		arrows: false,
		pagination: false,
		drag: false,
		easing: "ease",
		speed: 700,
		interval: 2000,
		pauseOnHover: false,
		autoplay: true,
		updateOnMove: true,

	});

	slider.on('mounted', function (event) {
		setTimeout(() => {
			slider.root.classList.add('is-init');
		},500)
	})

	sliderWord.on('mounted', function (event) {
		setTimeout(() => {
			sliderWord.root.parentElement.classList.add('is-init');
		},500)
	})

	sliderWord.sync(slider);
	sliderWord.mount();
	slider.mount();

	/* setTimeout(() => {
		sliderWord.go('>');
	},1500) */

})

document.querySelectorAll('.work-stages__gallery').forEach(sliderElement => {

	const navList = sliderElement.closest('section').querySelector('.work-stages__list'),
	number = sliderElement.querySelector('.work-stages__gallery--number');

	const slider = new Splide(sliderElement, {

		type: "fade",
		rewind: true,
		autoplay: true,
		arrows: false,
		pagination: false,
		drag: false,
		interval: 5000,
		speed: 1000,
		easing: "ease",
		updateOnMove: true,

	});

	setTimeout(() => {
		slider.go('>');
	},5000)

	slider.on('mounted moved', function () {
		//slider.go('>');
		navList.querySelectorAll('button').forEach(button => {
			button.classList.remove('is-active');
		})

		let currentNumber = (slider.index >= 9) ? slider.index : '0' + (slider.index+1),
		length = (slider.length >= 10) ? slider.length : '0' + slider.length;

		number.textContent = `${currentNumber} / ${length}`;

		navList.querySelectorAll('button')[slider.index].classList.add('is-active');
	})

	navList.querySelectorAll('button').forEach((button, index) => {
		button.addEventListener('click', function (event) {
			slider.go(index);
		})

		button.addEventListener('pointerenter', function (event) {
			if(getDeviceType() == "desktop") {
				slider.go(index);
			}
		})
		
	})

	slider.mount();

})

document.querySelectorAll('.work-stages__slider').forEach(sliderElement => {

	const slider = new Splide(sliderElement, {

		gap: 10,
		perPage: 1,
		perMove: 1,
		speed: 300,
		easing: "ease",
		arrows: false,

	});

	slider.mount();

})

document.querySelectorAll('.marquee__slider').forEach(sliderElement => {

	const slider = new Splide(sliderElement, {

		//perPage: 3,
		type: "loop",
		autoWidth: true,
		arrows: false,
		pagination: false,
		drag: false,

		autoScroll: {
			pauseOnHover: false,
		},
		/* autoScroll: {
			speed: 1,
		}, */


		/* breakpoints: {
			992: {
				// params
			},

			550: {
				// params
			}
		} */

	});

	slider.mount(window.splide.Extensions);

})

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


//document.querySelector('.services__wrapper').scrollLeft = 100;


// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

ScrollTrigger.config({ ignoreMobileResize: true})

document.querySelectorAll('.split-text p').forEach(splitText => {
	let typeSplit = new SplitType(splitText, {
		types: "word, chars",
	});
})

document.querySelectorAll('.split-text').forEach(splitText => {
	let timeline = gsap.timeline({
		/* scrollTrigger: {
			trigger: splitText.closest('section'),
			scrub: true,
			
			start: "top bottom",
			end: "bottom top",
		}, */
	}).pause();

	timeline.to(splitText.querySelectorAll('.char'), {
		opacity: 1,
		stagger: 0.05,
		duration: 0.5,
		/* scrollTrigger: {
			trigger: splitText.closest('section'),
			scrub: true,
			
			start: "top bottom",
			end: "bottom top",
		}, */
	})

	const ST = ScrollTrigger.create({
		trigger: splitText.querySelectorAll('.char'),
		scrub: true,
		start: "-300 center",
		end: `${splitText.closest('section').offsetHeight - 100}px bottom`,
		//markers: true,
		onUpdate: ({progress}) => {
			timeline.progress(progress)
		}
	});

	//timeline.play();
})


document.querySelectorAll('.services__wrapper').forEach(wrapper => {

	let height = 0;
	const cards = wrapper.querySelector('.services__list').querySelectorAll('.services__card'),
	pagination = wrapper.parentElement.querySelector('.services__pagination');

	cards.forEach(card => {
		height += card.offsetWidth;
		pagination.insertAdjacentHTML("beforeend", `<li class="services__pagination--dot"></li>`);
	})

	const paginationDots = pagination.querySelectorAll('.services__pagination--dot');

	gsap.to(wrapper.querySelector('.services__list'), {
		transform: `translate3d(-${wrapper.scrollWidth - windowSize}px,0,0.0001px)`,
		//duration: 3,
		ease: "none",
		scrollTrigger: {
			trigger: wrapper.closest('section'),
			scrub: 1,
			pin: true,
			start: `${wrapper.closest('section').offsetHeight + 100} bottom`,
			end: `${height} center`,
			onUpdate: (self) => {

				/* clearTimeout(timeout)
				timeout = setTimeout(() => {
					console.log('test')
					wrapper.querySelector('.servides__list').style.setProperty('transform', `translateX(${(wrapper.scrollWidth - windowSize) / 100 * self.progress * 100}px)`)
				},100) */
				//wrapper.scrollLeft = (wrapper.scrollWidth - windowSize) / 100 * self.progress * 100;
				/* debounce(function() {
					
				}, 100) */

				let lastCardCheck = false;
				Object.keys(cards).reverse().forEach(index => {
					//console.log(cards[index].getBoundingClientRect().left);
					if(cards[index].getBoundingClientRect().left <= 150 && !lastCardCheck) {

						lastCardCheck = true;
						
						paginationDots.forEach(dot => {
							dot.classList.remove('is-active');
						})

						paginationDots[index].classList.add('is-active');
						
					}
				})
			}
		},
		
	})
})

document.querySelectorAll('.video').forEach(video => {
	const videoElement = video.querySelector('.video__element'),
	wrapper = video.querySelector('.video__wrapper');

	/* ScrollTrigger.create({
		trigger: video,
		scrub: true,
		pin: true,
		start: `top top`,
		end: `2000 center`,
	}); */

	/* gsap.set(videoElement, {
		clipPath: "polygon(30% 70%, 70% 70%, 70% 100%, 30% 100%)",
	}) */

	gsap.to(wrapper, {
		width: "100%",
		onStart: function () {
			videoElement.autoplay = true;
			videoElement.play();
		},
		scrollTrigger: {
			//trigger: video,
			scrub: true,
			start: `${video.offsetTop - window.innerHeight} top`,
			end: `${video.offsetTop + window.innerHeight} bottom`,
			
		}
	})

	/* gsap.fromTo(videoElement, {
		//transform: "translate3d(0,0,0)",
		clipPath: "polygon(30% 70%, 70% 70%, 70% 100%, 30% 100%)",
		//clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
		
		
	}, {
		clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
	}) */
})

/* themeTimeline.fromTo(html, {
	'--theme-color-1': "#FFF",
},
{
	'--theme-color-1': "#171718",
}) */

Object.keys(document.querySelectorAll('[data-change-theme-to]')).reverse().forEach(index => {
	let changeTheme = false, section = document.querySelectorAll('[data-change-theme-to]')[index];
	
	let timeline = gsap.timeline();
	timeline.from(body, {
		background: (index-1 == -1) ? "#0B0B0C" : document.querySelectorAll('[data-change-theme-to]')[index-1].dataset.changeThemeTo,
	})

	timeline.to(body, {
		background: section.dataset.changeThemeTo,
	})

	timeline.pause();

	ScrollTrigger.create({
		trigger: section,
		scrub: true,
		//markers: (index == 1) ? true : false,
		start: `+200 bottom`,
		end: `+1000 bottom`,
		onUpdate: (self) => {
			//console.log(self.progress)
			timeline.progress(self.progress);
			/* if(section.dataset.changeThemeIs == "light") {
				themeTimeline.progress(self.progress);
			} else {
				themeTimeline.progress(1 - self.progress);
			} */

			if(self.progress >= 0.3 && !changeTheme) {
				
				changeTheme = true;
				if(section.dataset.changeThemeIs == "light") {
					html.style.setProperty('--theme-color-1', '#171718');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.add('is-reverse-theme');
					})
				} else {
					html.style.setProperty('--theme-color-1', '#FFF');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.remove('is-reverse-theme');
					})
				}
				
			} else if(self.progress < 0.3 && changeTheme) {
				changeTheme = false;
				if(section.dataset.changeThemeIs == "light") {
					html.style.setProperty('--theme-color-1', '#FFF');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.remove('is-reverse-theme');
					})
				} else {
					html.style.setProperty('--theme-color-1', '#171718');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.add('is-reverse-theme');
					})
				}
			}
		}
		//onUpdate: ({progress}) => timeline.progress() < progress ? timeline.progress(progress) : null
	});

	

	/* gsap.to(body, {
		background: section.dataset.changeThemeTo,
		scrollTrigger: {
			trigger: section,
			scrub: true,
			markers: (index == 1) ? true : false,
			start: `+200 bottom`,
			end: `+500 bottom`,
			onUpdate: (self) => {
				console.log(self.progress)
				if(self.progress >= 0.3 && !changeTheme) {
					
					changeTheme = true;
					if(section.dataset.changeThemeIs == "light") {
						document.querySelectorAll('.start-button').forEach(startButton => {
							startButton.classList.add('is-reverse-theme');
						})
					} else {
						document.querySelectorAll('.start-button').forEach(startButton => {
							startButton.classList.remove('is-reverse-theme');
						})
					}
					
				} else if(self.progress < 0.3 && changeTheme) {
					changeTheme = false;
					if(section.dataset.changeThemeIs == "light") {
						document.querySelectorAll('.start-button').forEach(startButton => {
							startButton.classList.remove('is-reverse-theme');
						})
					} else {
						document.querySelectorAll('.start-button').forEach(startButton => {
							startButton.classList.add('is-reverse-theme');
						})
					}
				}
			}
		},
		
	}) */
})

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <form> -=-=-=-=-=-=-=-=-=-=-=-=

function validateEmail(email) {
	let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return reg.test(email);
}

function validateName(name) {
	let reg = /\d/;
	return reg.test(name);
}

document.querySelectorAll('.contacts__form input').forEach(input => {
	if(input.name == "first-name" || input.name == "last-name" && input.type == "text") {
		input.addEventListener('blur', function (event) {
			if(!validateName(input.value)) {
				input.closest('label').classList.remove('is-error');
				if(input.value != "") input.closest('label').classList.add('is-valid');
			} else {
				input.closest('label').classList.add('is-error');
				input.closest('label').classList.remove('is-valid');
			}
		})
	}

	if(input.type == "email") {
		input.addEventListener('blur', function (event) {
			if(validateEmail(input.value)) {
				input.closest('label').classList.remove('is-error');
				if(input.value != "") input.closest('label').classList.add('is-valid');
			} else {
				input.closest('label').classList.add('is-error');
				input.closest('label').classList.remove('is-valid');
			}
		})
	}
})

document.querySelectorAll('.contacts__form textarea').forEach(textarea => {
	
	textarea.addEventListener('blur', function (event) {
		if(textarea.value != "") {
			textarea.closest('label').classList.add('is-valid');
		} else {
			textarea.closest('label').classList.remove('is-valid');
		}
	})
	
})

document.querySelectorAll('.tel-input').forEach(telInput => {
	const intl = window.intlTelInput(telInput, {
		utilsScript: "libs.min.js",
		initialCountry: "auto",
		geoIpLookup: function(callback) {
			fetch("https://ipapi.co/json")
			.then(function(res) { return res.json(); })
			.then(function(data) { callback(data.country_code); })
			.catch(function() { callback("us"); });
		}
	});

	const label = telInput.closest('.tel-input-label');
	telInput.addEventListener('focus', function (event) {
		label.classList.add('is-active');
	})

	telInput.addEventListener('blur', function (event) {
		if(telInput.value == "") label.classList.remove('is-active');

		//if(telInput.isValidNumber())
		if(intl.isValidNumber()) {
			label.classList.remove('is-error');
			if(telInput.value != "") label.classList.add('is-valid');
		} else {
			label.classList.add('is-error');
			label.classList.remove('is-valid');
		}
	})
	//telInput.closest('label').classList.add('tel-input-label')
	/* input.addEventListener("countrychange", function() {
		// do something with iti.getSelectedCountryData()
	}); */
})


// =-=-=-=-=-=-=-=-=-=-=-=- </form> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

const startButtons = document.querySelectorAll('.start-button');
let scrollButtonCheck = false;
function scroll() {
	
	if(window.scrollY + body.offsetHeight > wrapper.offsetHeight - 300 && !scrollButtonCheck) {
		scrollButtonCheck = true;
		startButtons.forEach(button => {
			button.classList.add('is-hidden');
		})
	}  else if(window.scrollY + body.offsetHeight <= wrapper.offsetHeight - 300 && scrollButtonCheck) {
		scrollButtonCheck = false;
		startButtons.forEach(button => {
			button.classList.remove('is-hidden');
		})
	}
}

scroll()

window.addEventListener('scroll', scroll)

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=

