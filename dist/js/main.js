
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	headerNav = document.querySelector('.header__nav'),
	wrapper = document.querySelector('.wrapper'),
	header = document.querySelector('.header');


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


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
		headerNav.style.setProperty('--transition', 'transform .3s ease');

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

const telLabels = document.querySelectorAll('.tel-input-label');

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

	const slides = sliderElement.querySelectorAll('.splide__slide');
	const slider = new Splide(sliderElement, {

		type: "fade",
		rewind: true,
		arrows: false,
		pagination: false,
		drag: false,
		easing: "ease",
		speed: 1700,
		interval: 3000,
		pauseOnHover: false,
		autoplay: true,
		updateOnMove: true,

	});
	
	slider.on('moved', function () {
		//console.log(slides[slider.index]);
		slides[slider.index].classList.remove('is-actived');
		setTimeout(() => {
			slides[slider.index].classList.add('is-actived');
		},0)
	})

	const sliderWord = new Splide(sliderElement.closest('section').querySelector('.index-hero__title--word'), {

		type: "loop",
		direction: "ttb",
		height: "1.6ch",
		rewind: true,
		arrows: false,
		pagination: false,
		drag: false,
		easing: "ease",
		speed: 700,
		interval: 3000,
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

	setTimeout(() => {
		sliderWord.sync(slider);
		sliderWord.mount();
		slider.mount();
	},0)

	/* setTimeout(() => {
		sliderWord.go('>');
	},1500) */

})

document.querySelectorAll('.work-stages__gallery').forEach(sliderElement => {
	const navList = sliderElement.closest('section').querySelector('.work-stages__list'),
	navButtons = navList.querySelectorAll('button'),
	section = sliderElement.closest('section'),
	number = sliderElement.querySelector('.work-stages__gallery--number');

	//const anchor = element.dataset.animationAnchor ? document.querySelector(element.dataset.animationAnchor) : false;
	

	const slider = new Splide(sliderElement, {

		type: "fade",
		rewind: true,
		autoplay: "pause",
		arrows: false,
		pagination: false,
		drag: false,
		interval: 5000,
		speed: 1500,
		easing: "ease",
		updateOnMove: true,

	});

	let timeout;

	const cb = function(entries){
		entries.forEach(entry => {
			if(entry.isIntersecting){
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					slider.go('>');
				},5000)
				clearInterval(progress);
				let value = 0;
				navButtons[slider.index].classList.add('is-active');
				progress = setInterval(() => {
					navButtons[slider.index].style.setProperty('--value', `${Math.min(100, value++)}%`);
				},50)
			} else{
				clearInterval(progress);
				clearTimeout(timeout)
			}
		});
	}

	const io = new IntersectionObserver(cb);
	io.observe(section);
	
	let progress;
	slider.on('moved', function () {

		navList.querySelectorAll('button').forEach(button => {
			button.classList.remove('is-active');
		})

		let currentNumber = (slider.index >= 9) ? slider.index : '0' + (slider.index+1),
		length = (slider.length >= 10) ? slider.length : '0' + slider.length;

		number.textContent = `${currentNumber} / ${length}`;

		navButtons[slider.index].classList.add('is-active');

		clearTimeout(timeout)
		timeout = setTimeout(() => {
			slider.go('>');
		},5000)

		clearInterval(progress);
		let value = 0;
		progress = setInterval(() => {
			navButtons[slider.index].style.setProperty('--value', `${Math.min(100, value++)}%`);
		},50)
	})

	slider.on('mounted', function () {
		
		navList.querySelectorAll('button').forEach(button => {
			button.classList.remove('is-active');
		})

		let currentNumber = (slider.index >= 9) ? slider.index : '0' + (slider.index+1),
		length = (slider.length >= 10) ? slider.length : '0' + slider.length;

		number.textContent = `${currentNumber} / ${length}`;

		/* setTimeout(() => {
			navList.querySelectorAll('button')[slider.index].classList.add('is-active');
			let value = 0;
			progress = setInterval(() => {
				navButtons[slider.index].style.setProperty('--value', `${Math.min(100, value++)}%`);
			},50)
		},4500) */
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

	slider.mount(window.splide.Extensions);

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
			speed: Math.max(windowSize/1200,1),
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

document.querySelectorAll('.services__slider').forEach(sliderElement => {

	const slider = new Splide(sliderElement, {

		perPage: 2,
		perMove: 1,
		//easing: "ease",
		speed: 500,
		arrows: false,

		breakpoints: {
			600: {
				perPage: 1,
			}
		}

	});

	slider.mount();

})

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + window.scrollY,
		right: box.right + window.scrollX,
		bottom: box.bottom + window.scrollY,
		left: box.left + window.scrollX
	};
}

// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

const startButtons = document.querySelectorAll('.start-button');
let scrollButtonCheck = false, headerOnTop = false, scrollSmoother;
const smoothContent = document.querySelector('#smooth-content');

function scroll() {
	if(windowSize <= 992 && !scrollSmoother) {
		let y = Math.abs(smoothContent.getBoundingClientRect().top)
		if(y > 100 && !headerOnTop) {
			headerOnTop = true;
			header.classList.add('on-scroll');
		} else if(y <= 100 && headerOnTop) {
			headerOnTop = false;
			header.classList.remove('on-scroll');
		}

		//console.log(window.scrollY + body.offsetHeight + ' ' + wrapper.offsetHeight);
		if(window.scrollY + body.offsetHeight > wrapper.offsetHeight - 300 && !scrollButtonCheck) {
			scrollButtonCheck = true;
			startButtons.forEach(button => {
				button.classList.add('is-hidden');
			})
		}  else if(window.scrollY + body.offsetHeight < wrapper.offsetHeight - 300 && scrollButtonCheck) {
			scrollButtonCheck = false;
			startButtons.forEach(button => {
				button.classList.remove('is-hidden');
			})
		}
	}
}

scroll()

window.addEventListener('scroll', scroll)



function headerScroll(arg) {

    let header = document.querySelector('.header'),

        hToDown = 300,
        hToUp = 50,

        headerPos = getCoords(header),

        hPosToDown, hPosToUp, hCheck = [true, true], hPosCheck = false,
        hTopCheck = false, scrolled = [0, 0], checkScrolled = '';
  

  function headerScrollFunc() {
    
    scrolled[0] = headerPos.top
    headerPos = getCoords(header);
    scrolled[1] = headerPos.top
    
        if (!hPosCheck) {

            hPosCheck = true;

            hPosToDown = headerPos.top + hToDown;
            hPosToUp = headerPos.top - hToUp;

        }

        if (scrolled[0] > scrolled[1]) {
          
            checkScrolled = 'up';
          
          } else if (scrolled[0] < scrolled[1]) {
            
            checkScrolled = 'down';
            
          }

          /* if (!hTopCheck && headerPos.top > 0) {
            hTopCheck = true;
        
            header.classList.remove('_top');
          } else if (headerPos.top == 0) {
            hTopCheck = false;
            header.classList.add('_top');
          } */
        
        
          if (checkScrolled == 'down') hPosToUp = headerPos.top - hToUp;
          if (checkScrolled == 'up') hPosToDown = headerPos.top + hToDown;
        
        
          if (hPosToUp >= headerPos.top && hCheck[0]) {
            hCheck[0] = false; hCheck[1] = true;
        
            header.classList.remove('is-hide'); // SHOW HEADER
          }
        
          if (hPosToDown <= headerPos.top && hCheck[1]) {
            hCheck[1] = false; hCheck[0] = true;
        
            header.classList.add('is-hide'); // HIDE HEADER
          }

  }
  
  headerScrollFunc();
  
  window.addEventListener('scroll', headerScrollFunc);

}


headerScroll();

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

ScrollTrigger.config({ ignoreMobileResize: true})

document.querySelectorAll('.split-text p').forEach(splitText => {
	let typeSplit = new SplitType(splitText, {
		types: "word, chars",
	});
})

document.querySelectorAll('.split-text').forEach(splitText => {

	gsap.to(splitText.querySelectorAll('.char'), {
		opacity: 1,
		stagger: 0.05,
		duration: 1,
		scrollTrigger: {
			trigger: splitText.closest('section'),
			scrub: 1,
			start: `+50% bottom`,
			end: `bottom bottom`,
		},
	})
})

const animMedia = gsap.matchMedia();
	
animMedia.add("(min-width: 992px)", () => {
	scrollSmoother = ScrollSmoother.create({
		smooth: 1,
		effects: true,
		onUpdate: function () {
			if(scrollSmoother) {
				let y = Math.abs(smoothContent.getBoundingClientRect().top)
				if(y > 100 && !headerOnTop) {
					headerOnTop = true;
					header.classList.add('on-scroll');
				} else if(y <= 100 && headerOnTop) {
					headerOnTop = false;
					header.classList.remove('on-scroll');
				}

				if(scrollSmoother.progress > 0.95 && !scrollButtonCheck) {
					scrollButtonCheck = true;
					startButtons.forEach(button => {
						button.classList.add('is-hidden');
					})
				}  else if(scrollSmoother.progress <= 0.95 && scrollButtonCheck) {
					scrollButtonCheck = false;
					startButtons.forEach(button => {
						button.classList.remove('is-hidden');
					})
				}
			}
		}
	});

	document.querySelectorAll('.services__wrapper').forEach(wrapper => {

		let height = 0;
		const cards = wrapper.querySelector('.services__list').querySelectorAll('.services__card');
	
		cards.forEach(card => {
			height += card.offsetWidth;
		})
	
		gsap.to(wrapper.querySelector('.services__list'), {
			transform: `translate3d(-${wrapper.scrollWidth - windowSize}px,0,0.0001px)`,
			//duration: 3,
			ease: "none",
			scrollTrigger: {
				trigger: wrapper.closest('section'),
				scrub: true,
				pin: true,
				start: `${wrapper.closest('section').offsetHeight + 100} bottom`,
				end: `${height} center`,
			},
			
		})
	})
})

const animElements = document.querySelectorAll('[data-animation]');
animElements.forEach(element => {

	let lines;
	if(element.dataset.animation == "split-fade-up") {
		let lines = new SplitType(element, {
			types: "lines",
		});

		Array.from(lines['lines']).forEach(line => {
			line.innerHTML = `<div class="line-inner">${line.innerHTML}</div>`;
			
		})

		gsap.set(element.querySelectorAll('.line-inner'), {
			transform: "translate(0,100%)",
			opacity: 0,
		})
	}

	if(element.dataset.animationDelay) element.style.setProperty('--delay', element.dataset.animationDelay + 's');
	const anchor = element.dataset.animationAnchor ? document.querySelector(element.dataset.animationAnchor) : false;
	const cb = function(entries){
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				element.classList.add('is-animated');
				
				if(element.dataset.animation == "split-fade-up" && element.querySelector('.line')) {
					gsap.to(element.querySelectorAll('.line-inner'), {
						delay: element.dataset.animationDelay ? Number(element.dataset.animationDelay) : 0,
						opacity: 1,
						stagger: 0.25,
						transform: "translate(0,0)",
					})
				}
			} else{
				element.classList.remove('is-animated');
				if(element.dataset.animation == "split-fade-up" && element.querySelector('.line')) {
					gsap.set(element.querySelectorAll('.line-inner'), {
						transform: "translate(0,75%)",
						opacity: 0,
					})
				}
			}
		});
	}

	const io = new IntersectionObserver(cb);
	if(anchor) {
		io.observe(anchor);
	} else {
		io.observe(element);
	}
})

document.querySelectorAll('.video').forEach(video => {
	const videoElement = video.querySelector('.video__element'),
	wrapper = video.querySelector('.video__wrapper');

	gsap.to(wrapper, {
		width: "100%",
		onStart: function () {
			videoElement.autoplay = true;
			videoElement.play();
		},
		scrollTrigger: {
			trigger: wrapper,
			//markers: true,
			scrub: true,
			start: `top bottom`,
			end: `bottom bottom`,
			
		}
	})
})

Object.keys(document.querySelectorAll('[data-change-theme-to]')).reverse().forEach(index => {
	let changeTheme = false, section = document.querySelectorAll('[data-change-theme-to]')[index];
	
	let timeline = gsap.timeline();
	timeline.from(body, {
		background: (index-1 == -1) ? "#0B0B0C" : document.querySelectorAll('[data-change-theme-to]')[index-1].dataset.changeThemeTo,
	})

	/* gsap.set(body, {
		'--theme-color-1': '#171718',
	})

	timeline.to(body, {
		background: section.dataset.changeThemeTo,
		'--theme-color-1': '#fff',
	}) */

	if(section.dataset.changeThemeIs == "light") {
		gsap.set(body, {
			'--theme-color-1': '#fff',
			'--theme-color-1-reverse': '#171718',
		})
	
		timeline.to(body, {
			background: section.dataset.changeThemeTo,
			'--theme-color-1': '#171718',
			'--theme-color-1-reverse': '#fff',
		})
	} else {
		gsap.set(body, {
			'--theme-color-1': '#171718',
			'--theme-color-1-reverse': '#fff',
		})
	
		timeline.to(body, {
			background: section.dataset.changeThemeTo,
			'--theme-color-1': '#fff',
			'--theme-color-1-reverse': '#171718',
		})
	}

	timeline.pause();

	let start, end;
	if(section.hasAttribute('data-change-theme-on-top')) {
		start = `+100 bottom`;
		end = `+500 bottom`;
	} else {
		start = `+100 25%`;
		end = `+300 25%`;
	}

	ScrollTrigger.create({
		trigger: section,
		scrub: true,
		//markers: (index == 1) ? true : false,
		start: start,
		end: end,
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
					header.classList.add('is-light');
					html.style.setProperty('--theme-color-2', '#171718');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.add('is-reverse-theme');
					})
				} else {
					header.classList.remove('is-light');
					html.style.setProperty('--theme-color-2', '#FFF');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.remove('is-reverse-theme');
					})
				}
				
			} else if(self.progress < 0.3 && changeTheme) {
				changeTheme = false;
				if(section.dataset.changeThemeIs == "light") {
					header.classList.remove('is-light');
					html.style.setProperty('--theme-color-2', '#FFF');
					document.querySelectorAll('.start-button').forEach(startButton => {
						startButton.classList.remove('is-reverse-theme');
					})
				} else {
					header.classList.add('is-light');
					html.style.setProperty('--theme-color-2', '#171718');
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

document.querySelectorAll('.form input').forEach(input => {
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

document.querySelectorAll('.form').forEach(form => {
	form.addEventListener('submit', function (event) {
		if(form.querySelector('.is-error')) event.preventDefault();
	})
})

document.querySelectorAll('.form textarea').forEach(textarea => {

	textarea.addEventListener('input', function (event) {
		textarea.style.height = textarea.scrollHeight + 'px';
	})
	
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
		useFullscreenPopup: false,
		//autoInsertDialCode: true,
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
	telInput.addEventListener("countrychange", function() {
		label.classList.add('is-active');
		telInput.value = '+' + intl.getSelectedCountryData()['dialCode'];
	});
})


// =-=-=-=-=-=-=-=-=-=-=-=- </form> -=-=-=-=-=-=-=-=-=-=-=-=


