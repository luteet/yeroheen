export default function sliders(windowSize) {

	
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
	

	document.querySelectorAll('.index-hero__background').forEach(sliderElement => {

		const section = sliderElement.closest("section")
	
		const slides = sliderElement.querySelectorAll('.splide__slide');
		const slider = new Splide(sliderElement, {
	
			type: "fade",
			rewind: true,
			arrows: false,
			pagination: false,
			drag: false,
			easing: "ease",
			speed: 1700,
			//interval: 3000,
			pauseOnHover: false,
			//autoplay: true,
			updateOnMove: true,
	
		});
		
		slider.on('moved', function () {
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
			//interval: 3000,
			pauseOnHover: false,
			//autoplay: true,
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
	
		let isPlaying = window.screenY <= 200 ? false : true, interval;
		function scrollFunc() {
			if(window.scrollY <= 200 && !isPlaying) {
				isPlaying = true;
				clearInterval(interval)
				interval = setInterval(() => {
					slider.go('>');
				},3000)
			} else if(window.scrollY >= 200 && isPlaying) {
				isPlaying = false;
				clearInterval(interval)
			}
		}
	
		window.addEventListener("scroll", scrollFunc)
		scrollFunc();
	
	})
	
	document.querySelectorAll('.work-stages__gallery').forEach(sliderElement => {

		const navList = sliderElement.closest('section').querySelector('.work-stages__list'),
		navButtons = navList.querySelectorAll('button'),
		section = sliderElement.closest('section'),
		number = sliderElement.querySelector('.work-stages__gallery--number');

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
			speed: 700,
			//easing: "ease",
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
	
		});
	
		slider.mount(window.splide.Extensions);
		
		/* const { AutoScroll } = slider.Components;

		const cb = function(entries){
			entries.forEach(entry => {
				if(entry.isIntersecting){
					AutoScroll.play();
				} else {
					AutoScroll.pause();
				}
			});
		}
	
		const io = new IntersectionObserver(cb);
		io.observe(sliderElement); */
	
	})
	
	document.querySelectorAll('.services-section__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			perPage: 2,
			perMove: 1,

			speed: 700,
			arrows: false,
	
			breakpoints: {
				600: {
					perPage: 1,
				}
			}
	
		});
	
		slider.mount();
	
	})

	document.querySelectorAll('.partners__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			type: "loop",
			perPage: 3,
			arrows: false,
			pagination: false,
			drag: false,
			mediaQuery: "min",
			
			autoScroll: {
				pauseOnHover: false,
				speed: 1,
				autoStart: false,
			},
	
			breakpoints: {
				1600: {
					perPage: 6,
				},
	
				992: {
					perPage: 5,
				},

				768: {
					perPage: 4,
				}
			}
	
		});
	
		slider.mount(window.splide.Extensions);
		const { AutoScroll } = slider.Components;

		const cb = function(entries){
			entries.forEach(entry => {
				if(entry.isIntersecting){
					AutoScroll.play();
				} else {
					AutoScroll.pause();
				}
			});
		}
	
		const io = new IntersectionObserver(cb);
		io.observe(sliderElement);
	
	})

	/* document.querySelectorAll('.services__slider').forEach(sliderElement => {

		const 
		section = sliderElement.closest('section'),
		navList = section.querySelector('.services__nav'),
		slides = sliderElement.querySelectorAll(".splide__slide"),
		navButtons = navList.querySelectorAll('button');

		const slider = new Splide(sliderElement, {
	
			type: "fade",
			rewind: true,
			autoplay: "pause",
			arrows: false,
			pagination: false,
			drag: false,
			interval: 5000,
			speed: 1000,
			easing: "ease",
			updateOnMove: true,

			992: {
				destroy: true,
			},
	
		});
	
		let timeout;
		if(windowSize >= 992) {
			setTimeout(() => {
				slider.go('>');
			},2000)
		}

		const cb = function(entries){
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					if(windowSize >= 992) {

						clearTimeout(timeout)
						timeout = setTimeout(() => {
							slider.go('>');
						},5000)
						
						navButtons[slider.index].classList.add('is-active');

					}
				} else {
					clearTimeout(timeout)
				}

			});
		}

		const io = new IntersectionObserver(cb);
		io.observe(section);
		
		slider.on('moved', function () {

			if(windowSize >= 992) {

				navList.querySelectorAll('button').forEach(button => {
					button.classList.remove('is-active');
				})
		
				navButtons[slider.index].classList.add('is-active');
		
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					slider.go('>');
				},5000)

			} else {
				clearTimeout(timeout)
			}
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

		slider.on('move', function (index) {
            slides[index].parentElement.style.setProperty("--height", slides[index].offsetHeight + 'px');
        })
	
		slider.mount(window.splide.Extensions);
	
	}) */

	document.querySelectorAll('.gallery-slider').forEach(sliderElement => {

		const slides = sliderElement.querySelectorAll('.splide__slide');
	
		const slider = new Splide(sliderElement, {
	
			type: "fade",
			rewind: true,
			perPage: 1,
			arrows: false,
			pagination: false,
			drag: false,
			easing: "ease",
			speed: 1700,
			pauseOnHover: false,
			interval: 3000,
			autoplay: true,
			updateOnMove: true,
	
		});

		slider.on('moved', function () {
			slides[slider.index].classList.remove('is-actived');
			setTimeout(() => {
				slides[slider.index].classList.add('is-actived');
			},0)
		})
	
		slider.mount();
		
		
	
	})
}
