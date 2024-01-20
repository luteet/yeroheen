
export default function animations(windowSize) {

	const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	wrapper = document.querySelector('.wrapper'),
	header = document.querySelector('.header');

	

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
	let scrollButtonCheck = false, headerOnTop = false;

	function scroll() {
		if(windowSize <= 992) {
			let y = Math.abs(wrapper.getBoundingClientRect().top)
			if(y > 100 && !headerOnTop) {
				headerOnTop = true;
				header.classList.add('on-scroll');
			} else if(y <= 100 && headerOnTop) {
				headerOnTop = false;
				header.classList.remove('on-scroll');
			}

			if(window.scrollY + window.innerHeight > wrapper.offsetHeight - 300 && !scrollButtonCheck) {
				scrollButtonCheck = true;
				startButtons.forEach(button => {
					button.classList.add('is-hidden');
				})
			}  else if(window.scrollY + window.innerHeight < wrapper.offsetHeight - 300 && scrollButtonCheck) {
				scrollButtonCheck = false;
				startButtons.forEach(button => {
					button.classList.remove('is-hidden');
				})
			}
		}
	}

	

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
	

	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=


	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({ ignoreMobileResize: true})

	document.querySelectorAll('.split-text p').forEach(splitText => {
		let typeSplit = new SplitType(splitText, {
			types: "lines, word",
		});
	})

	document.querySelectorAll('.split-lines').forEach(splitText => {
		let typeSplit = new SplitType(splitText, {
			types: "lines",
		});

		Array.from(typeSplit.lines).forEach(line => {
			let addLine;
			addLine = line.cloneNode(true);
			addLine.classList.remove('line')
			addLine.classList.add('line-inner');
			line.innerHTML = "";
			line.append(addLine);
		})

	})

	document.querySelectorAll('.split-text').forEach(splitText => {

		gsap.set(splitText.querySelectorAll('.line'), {
			"--progress": "-20%",
			"--progress-2": "0%",
		})

		const anim = gsap.to(splitText.querySelectorAll('.line'), {
			"--progress": "100%",
			"--progress-2": "120%",
			stagger: 1,
			duration: 1.5,
			immediateRender: !1, 
			paused: !0,
		})

		ScrollTrigger.create({

			trigger: splitText.closest('section'),
			scrub: 1,
			
			start: `top +=50%`,
			end: `+120% bottom`,
			//markers: true,

			animation: anim,
			
		});
	})

	const animMedia = gsap.matchMedia();
		
	animMedia.add("(min-width: 992px)", () => {

		const lenis = new Lenis();
		headerScroll();
		
		lenis.on('scroll', (event) => {

			let y = event.animatedScroll;
			if(y > 100 && !headerOnTop) {

				headerOnTop = true;
				header.classList.add('on-scroll');

			} else if(y <= 100 && headerOnTop) {

				headerOnTop = false;
				header.classList.remove('on-scroll');

			}

			if(y + window.innerHeight > wrapper.offsetHeight - 300 && !scrollButtonCheck) {

				scrollButtonCheck = true;
				startButtons.forEach(button => {
					button.classList.add('is-hidden');
				})

			}  else if(y + window.innerHeight < wrapper.offsetHeight - 300 && scrollButtonCheck) {

				scrollButtonCheck = false;
				startButtons.forEach(button => {
					button.classList.remove('is-hidden');
				})

			}
		})

		document.querySelectorAll(".page-hero__scroll_link").forEach(link => {
			link.addEventListener("click", function (event) {
				event.preventDefault();
				lenis.scrollTo(link.offsetTop + link.offsetHeight + 250)
			})
		})

		function raf(time) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		//lenis.on('scroll', ScrollTrigger.update)

		/* gsap.ticker.add((time)=>{
			lenis.raf(time * 1000)
		})

		gsap.ticker.lagSmoothing(0) */

		requestAnimationFrame(raf);

		document.querySelectorAll('.services-section__wrapper').forEach(wrapper => {

			let height = 0;
			const cards = wrapper.querySelector('.services-section__list').querySelectorAll('.services-section__card');
		
			cards.forEach(card => {
				height += card.offsetWidth;
			})
		
			gsap.to(wrapper.querySelector('.services-section__list'), {
				transform: `translate3d(-${wrapper.scrollWidth - windowSize}px,0,0.003px)`,
				ease: "none",
				scrollTrigger: {
					trigger: wrapper.closest('section'),
					scrub: true,
					pin: true,
					start: `center center`,
					end: `${height} center`,
				},
				
			})
		})

		let firstStart = false,
		timelineList = [];

		document.querySelectorAll('[data-change-theme-to]').forEach((element,index) => {
			
			let section = document.querySelectorAll('[data-change-theme-to]')[index],
			prevSection = index-1 != -1 ? document.querySelectorAll('[data-change-theme-to]')[index-1] : false,
			timeline = gsap.timeline();

			timelineList.push(timeline);
			
			if(section.dataset.changeThemeTo == "light") {
				
				gsap.set(html, {
					"--background-color": 'rgba(11,11,12,1)',
					'--theme-color-1': 'rgb(255,255,255)',
					'--theme-color-1-reverse': 'rgb(23,23,24)',
					'--theme-progress': 0,
				})
			
				timeline.to(html, {
					'--background-color': "rgba(255,255,255,1)",
					'--theme-color-1': 'rgb(23,23,24)',
					'--theme-color-1-reverse': 'rgb(255,255,255)',
					'--theme-progress': 1,
				})
				
			} else {
				
				gsap.set(html, {
					'--background-color': "rgb(255,255,255)",
					'--theme-color-1': 'rgb(23,23,24)',
					'--theme-color-1-reverse': 'rgb(255,255,255)',
					'--theme-progress': 1,
				})
			
				timeline.to(html, {
					'--background-color': 'rgb(11,11,12)',
					'--theme-color-1': 'rgb(255,255,255)',
					'--theme-color-1-reverse': 'rgb(23,23,24)',
					'--theme-progress': 0,
				})
			}

			timeline.pause();

			let start, end;
			if(section.hasAttribute('data-change-theme-on-top')) {
				start = `+100 bottom`;
				end = `+500 bottom`;
			} else {
				start = `-${window.innerHeight/7} 15%`;
				end = `+${window.innerHeight/3} 15%`;
			}

			gsap.to(element, {
				scrollTrigger: {
					trigger: element,
					//markers: true,
					start: "top top",
					end: "100px top",
					
					onEnter: function () {
						if(section.dataset.changeThemeTo == "light") {

							body.classList.remove('is-dark');
							html.style.setProperty('--theme-color-2', '#171718');
							html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.add('is-reverse-theme');
							})

						} else {

							body.classList.add('is-dark');
							html.style.setProperty('--theme-color-2', '#FFF');
							html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})

						}
					},
					onEnterBack: function (self) {
						body.classList.remove('is-dark');
						if(prevSection) {
							if(prevSection.dataset.changeThemeTo == "light") {

								if(index-1 == -1) body.classList.add('is-dark'); else body.classList.remove('is-dark');

								html.style.setProperty('--theme-color-2', '#171718');
								html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');
								
								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.add('is-reverse-theme');
								})

							} else {
								
								if(index-1 == -1) body.classList.remove('is-dark'); else body.classList.add('is-dark');

								html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');
								html.style.setProperty('--theme-color-2', '#FFF');

								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.remove('is-reverse-theme');
								})

							}
						} else {
							
							body.classList.add('is-dark');

							html.style.setProperty('--theme-color-2', '#171718');
							html.style.setProperty('--theme-color-2-reverse', '#fff');
							html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})
						}
					},
					
				},
				/* onEnter: function () {
					console.log("complete")
				} */
			})

			ScrollTrigger.create({

				trigger: section,
				scrub: 1,
				start: start,
				end: end,

				//animation: anim,
				
				onUpdate: (self) => {

					timeline.progress(self.progress);
					
					if(index == 0 && self.progress == 1) firstStart = true;
					
					if(self.progress >= 0.3) {

						//console.log(self.progress >= 0.3 && !changeTheme)
						//changeTheme = true;
						//console.log('change')

						/* if(section.dataset.changeThemeTo == "light") {

							body.classList.remove('is-dark');
							html.style.setProperty('--theme-color-2', '#171718');
							html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.add('is-reverse-theme');
							})

						} else {

							body.classList.add('is-dark');
							html.style.setProperty('--theme-color-2', '#FFF');
							html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})

						} */
						
					} 
					
					if(self.progress < 0.2) {

						//changeTheme2 = false;
						
						
						
						/* if(prevSection) {
							if(prevSection.dataset.changeThemeTo == "light") {

								if(index-1 == -1) body.classList.add('is-dark'); else body.classList.remove('is-dark');

								html.style.setProperty('--theme-color-2', '#171718');
								html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');
								
								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.add('is-reverse-theme');
								})

							} else {
								
								if(index-1 == -1) body.classList.remove('is-dark'); else body.classList.add('is-dark');

								html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');
								html.style.setProperty('--theme-color-2', '#FFF');

								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.remove('is-reverse-theme');
								})

							}
						} else {
							
							body.classList.add('is-dark');

							html.style.setProperty('--theme-color-2', '#171718');
							html.style.setProperty('--theme-color-2-reverse', '#fff');
							html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})
						} */
					}

					/* if(self.progress >= 1) {
						changeTheme = false;
						changeTheme2 = true;
					}

					if(self.progress <= 0) {
						changeTheme = false;
						changeTheme2 = true;
					} */
					
				},
				
			});

		})

		if(!firstStart) {

			firstStart = true;

			if(html.classList.contains("is-light-start")) {

				gsap.set(html, {
					'--theme-progress': 1,
				})

				html.style.setProperty('--theme-color-2', '#171718');
				html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');
				document.querySelectorAll('.start-button').forEach(startButton => {
					startButton.classList.add('is-reverse-theme');
				})

			} else {
				
				body.classList.add('is-dark');
				html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');
				
				gsap.set(html, {
					"--background-color": 'rgba(11,11,12,1)',
					'--theme-color-1': 'rgb(255,255,255)',
					'--theme-color-1-reverse': 'rgb(23,23,24)',
					'--theme-progress': 0,
				})
			}
			
		}
		
	})

	animMedia.add("(max-width: 991px)", () => {
		scroll();
		headerScroll();

		let firstStart = false, timelineList = [];

		document.querySelectorAll(".page-hero__scroll_link").forEach(link => {
			link.addEventListener("click", function (event) {
				event.preventDefault();
				window.scrollTo({
					left: 0, top: link.offsetTop + link.offsetHeight + 150, behavior: "smooth"
				})
			})
		})

		document.querySelectorAll('[data-change-theme-to]').forEach((element,index) => {
			
			let changeTheme = false, 
			section = document.querySelectorAll('[data-change-theme-to]')[index],
			prevSection = index-1 != -1 ? document.querySelectorAll('[data-change-theme-to]')[index-1] : false,
			timeline = gsap.timeline();

			timelineList.push(timeline);
			
			let anim;
			if(section.dataset.changeThemeTo == "light") {

				anim = gsap.fromTo(html, {
					immediateRender: !1, 
					paused: !0,
					"--background-color": 'rgba(11,11,12,1)',
					'--theme-color-1': 'rgb(255,255,255)',
					'--theme-color-1-reverse': 'rgb(23,23,24)',
					'--theme-progress': 0,
				},
				{
					'--background-color': "rgba(255,255,255,1)",
					'--theme-color-1': 'rgb(23,23,24)',//171718
					'--theme-color-1-reverse': 'rgb(255,255,255)',
					'--theme-progress': 1,
				})

				
			} else {
				
				anim = gsap.fromTo(html, {
					immediateRender: !1, 
					paused: !0,
					'--background-color': "rgb(255,255,255)",
					'--theme-color-1': 'rgb(23,23,24)',
					'--theme-color-1-reverse': 'rgb(255,255,255)',
					'--theme-progress': 1,
				},
				{
					'--background-color': 'rgb(11,11,12)',
					'--theme-color-1': 'rgb(255,255,255)',
					'--theme-color-1-reverse': 'rgb(23,23,24)',
					'--theme-progress': 0,
				})

			}

			timeline.pause();

			let start, end;
			if(section.hasAttribute('data-change-theme-on-top')) {
				start = `+100 bottom`;
				end = `+500 bottom`;
			} else {
				start = `-${window.innerHeight/7} 15%`;
				end = `+${window.innerHeight/3} 15%`;
			}

			gsap.to(element, {
				scrollTrigger: {
					trigger: element,
					//markers: true,
					start: "top top",
					end: "100px top",
					
					onEnter: function () {
						if(section.dataset.changeThemeTo == "light") {

							body.classList.remove('is-dark');
							html.style.setProperty('--theme-color-2', '#171718');
							html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.add('is-reverse-theme');
							})

						} else {

							body.classList.add('is-dark');
							html.style.setProperty('--theme-color-2', '#FFF');
							html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})

						}
					},
					onEnterBack: function (self) {
						body.classList.remove('is-dark');
						if(prevSection) {
							if(prevSection.dataset.changeThemeTo == "light") {

								if(index-1 == -1) body.classList.add('is-dark'); else body.classList.remove('is-dark');

								html.style.setProperty('--theme-color-2', '#171718');
								html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');
								
								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.add('is-reverse-theme');
								})

							} else {
								
								if(index-1 == -1) body.classList.remove('is-dark'); else body.classList.add('is-dark');

								html.style.setProperty('--background-color-2', 'rgba(11,11,12,1)');
								html.style.setProperty('--theme-color-2', '#FFF');

								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.remove('is-reverse-theme');
								})

							}
						} else {
							
							body.classList.add('is-dark');

							html.style.setProperty('--theme-color-2', '#171718');
							html.style.setProperty('--theme-color-2-reverse', '#fff');
							html.style.setProperty('--background-color-2', 'rgba(255,255,255,1)');

							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})
						}
					},
					
				},
			})

			ScrollTrigger.create({

				trigger: section,
				scrub: 1,
				
				start: start,
				end: end,

				animation: anim,
				
				onUpdate: (self) => {

					timeline.progress(self.progress);
					
					if(index == 0 && self.progress == 1) firstStart = true;
					
					/* if(self.progress >= 0.3 && !changeTheme) {

						changeTheme = true;
						if(section.dataset.changeThemeTo == "light") {

							body.classList.remove('is-dark');
							html.style.setProperty('--theme-color-2', '#171718');
							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.add('is-reverse-theme');
							})

						} else {
							
							body.classList.add('is-dark');
							html.style.setProperty('--theme-color-2', '#FFF');
							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})

						}
						
					} else if(self.progress < 0.3 && changeTheme) {

						changeTheme = false;
						
						if(prevSection) {
							if(prevSection.dataset.changeThemeTo == "light") {

								if(index-1 == -1) body.classList.add('is-dark'); else body.classList.remove('is-dark');

								html.style.setProperty('--theme-color-2', '#FFF');
								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.add('is-reverse-theme');
								})

							} else {
								
								if(index-1 == -1) body.classList.remove('is-dark'); else body.classList.add('is-dark');
								
								html.style.setProperty('--theme-color-2', '#171718');
								document.querySelectorAll('.start-button').forEach(startButton => {
									startButton.classList.remove('is-reverse-theme');
								})

							}
						} else {

							body.classList.add('is-dark');

							html.style.setProperty('--theme-color-2', '#171718');
							document.querySelectorAll('.start-button').forEach(startButton => {
								startButton.classList.remove('is-reverse-theme');
							})

						}

					} */
					
				},
				
			});

		})

		if(!firstStart) {

			firstStart = true;
			

			if(html.classList.contains("is-light-start")) {

				gsap.set(html, {
					'--theme-progress': 1,
				})

				header.classList.add('is-light');
				html.style.setProperty('--theme-color-2', '#171718');
				document.querySelectorAll('.start-button').forEach(startButton => {
					startButton.classList.add('is-reverse-theme');
				})

			} else {

				body.classList.add('is-dark');

				gsap.set(html, {
					"--background-color": 'rgba(11,11,12,1)',
					'--theme-progress': 0,
					'--theme-color-1': 'rgb(255,255,255)',
					'--theme-color-1-reverse': 'rgb(23,23,24)',
				})
			}
			
		}

	})

	window.addEventListener("DOMContentLoaded", function () {
		const animElements = document.querySelectorAll('[data-animation]');
		animElements.forEach(element => {

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

			if(element.dataset.animation == "lines-up") {
				document.querySelectorAll('.split-lines').forEach(splitText => {
					let typeSplit = new SplitType(splitText, {
						types: "lines",
					});
				
					Array.from(typeSplit.lines).forEach(line => {
						let addLine;
						addLine = line.cloneNode(true);
						addLine.classList.remove('line')
						addLine.classList.add('line-inner');
						line.innerHTML = "";
						line.append(addLine);
					})

					gsap.set(splitText.querySelectorAll('.line'), {
						'--transform': `translate3d(0,100%,0.0001px)`,
					})
				
					gsap.to(splitText.querySelectorAll('.line'), {
						'--transform': `translate3d(0,0,0.0001px)`,
						stagger: 0.15,
						delay: splitText.dataset.animationDelay ? splitText.dataset.animationDelay : 0,
						scrollTrigger: {
							trigger: anchor ? anchor : splitText,
						}
					})
				
				})

				
			}

			const cb = function(entries){
				entries.forEach(entry => {
					if(entry.isIntersecting) {
						if(element.classList.contains("lazy")) {
							if(element.dataset.llStatus == "loaded") {
								element.classList.add('is-animated');
								if(element.nodeName == "VIDEO") {
									element.play();
								}
							} else {
								element.classList.add('is-animated-lazy');
							}
						} else {
							element.classList.add('is-animated');
							
							if(element.dataset.animation == "split-fade-up" && element.querySelector('.line')) {
								gsap.to(element.querySelectorAll('.line-inner'), {
									delay: element.dataset.animationDelay ? Number(element.dataset.animationDelay) : 0,
									opacity: 1,
									stagger: 0.25,
									transform: "translate(0,0)",
								})
							}
						}
						
					} else{
						if(!element.hasAttribute('data-animation-once')) {
							element.classList.remove('is-animated');
							element.classList.remove('is-animated-lazy');
							if(element.nodeName == "VIDEO") {
								element.pause();
							}
							if(element.dataset.animation == "split-fade-up" && element.querySelector('.line')) {
								gsap.set(element.querySelectorAll('.line-inner'), {
									transform: "translate(0,75%)",
									opacity: 0,
								})
							}
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
	})

	document.querySelectorAll('.video').forEach(video => {

		const wrapper = video.querySelector('.video__wrapper');

		gsap.to(wrapper, {
			width: "100%",
			scrollTrigger: {
				trigger: wrapper,
				scrub: true,
				start: `top bottom`,
				end: `bottom bottom`,
				
			}
		})
	})

}
