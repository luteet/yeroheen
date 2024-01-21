!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,(function(e){"use strict";function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(){return"undefined"!=typeof window}function n(){return o||r()&&(o=window.gsap)&&o.registerPlugin&&o}var o,i,s,a,l,c,u,f,h,d,g,p,v=(m.register=function(e){return i||(o=e||n(),r()&&window.document&&(s=window,a=document,l=a.documentElement,c=a.body),o&&(u=o.utils.toArray,f=o.utils.clamp,g=o.parseEase("expo"),h=o.core.globals().ScrollTrigger,o.core.globals("ScrollSmoother",m),c&&h&&(p=h.core._getVelocityProp,i=1))),i},function(e,r,n){r&&t(e.prototype,r),n&&t(e,n)}(m,[{key:"progress",get:function(){return this.scrollTrigger.animation._time/100}}]),m);function m(e){var t=this;function r(){return K.update(-V)}function n(){return R.style.overflow="visible"}function v(e){var t=e.getTween();t&&(t.pause(),t._time=t._dur,t._tTime=t._tDur),N=!1,e.animation.progress(e.progress,!0)}function y(e,t){(e!==V&&!I||t)&&(O&&(R.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+e+", 0, 1)"),j=e-V,V=e,h.isUpdating||h.update())}function w(e){return arguments.length?(I&&(V=-e),W.y=-e,N=!0,z(e),this):-V}function b(e){C.scrollTop=0,h.isInViewport(e.target)||e.target===U||t.scrollTo(e.target,!1,"center center"),U=e.target}function S(e){var t,r,n,i;_.forEach((function(s){t=s.pins,i=s.markers,e.forEach((function(e){e.trigger!==s.trigger&&e.pinnedContainer!==s.trigger||s===e||(r=e.start,n=(r-s.start-s.offset)/s.ratio-(r-s.start),t.forEach((function(e){return n-=e.distance/s.ratio-e.distance})),e.setPositions(r+n,e.end+n),e.markerStart&&i.push(o.quickSetter([e.markerStart,e.markerEnd],"y","px")),e.pin&&0<e.end&&(n=e.end-e.start,t.push({start:e.start,end:e.end,distance:n,trig:e}),s.setPositions(s.start,s.end+n),s.vars.onRefresh(s)))}))}))}function T(){n(),requestAnimationFrame(n),_&&(_.forEach((function(e){var t=e.start,r=e.auto?Math.min(h.maxScroll(e.scroller),e.end):t+(e.end-t)/e.ratio,n=(r-e.end)/2;t-=n,r-=n,e.offset=n||1e-4,e.pins.length=0,e.setPositions(Math.min(t,r),Math.max(t,r)),e.vars.onRefresh(e)})),S(h.sort())),K.reset()}function x(){return _&&_.forEach((function(e){return e.vars.onRefresh(e)}))}function E(){return _&&_.forEach((function(e){return e.vars.onRefreshInit(e)})),x}function k(e,t,r,n){return function(){var o="function"==typeof t?t(r,n):t;return o||0===o||(o=n.getAttribute("data-"+e)||("speed"===e?1:0)),n.setAttribute("data-"+e,o),"auto"===o?o:parseFloat(o)}}function P(e,t,r,n){function i(){t=w(),r=b(),u=parseFloat(t)||1,m=(p="auto"===t)?0:.5,v&&v.kill(),v=r&&o.to(e,{ease:g,overwrite:!1,y:"+=0",duration:r}),d&&(d.ratio=u,d.autoSpeed=p)}function a(){T.y=S+"px",T.renderTransform(1),i()}function c(t){if(p){a();var r=function(e,t){var r,n,o=e.parentNode||l,i=e.getBoundingClientRect(),a=o.getBoundingClientRect(),c=a.top-i.top,u=a.bottom-i.bottom,f=(Math.abs(c)>Math.abs(u)?c:u)/(1-t),h=-f*t;return 0<f&&(h+=-(n=.5==(r=a.height/(s.innerHeight+a.height))?2*a.height:2*Math.min(a.height,-f*r/(2*r-1)))/2,f+=n),{change:f,offset:h}}(e,f(0,1,-t.start/(t.end-t.start)));R=r.change,y=r.offset}else R=(t.end-t.start)*(1-u),y=0;x.forEach((function(e){return R-=e.distance*(1-u)})),t.vars.onUpdate(t),v&&v.progress(1)}var u,d,p,v,m,y,w=k("speed",t,n,e),b=k("lag",r,n,e),S=o.getProperty(e,"y"),T=e._gsap,x=[],P=[],R=0;return i(),(1!==u||p||v)&&(c(d=h.create({trigger:p?e.parentNode:e,scroller:C,scrub:!0,refreshPriority:-999,onRefreshInit:a,onRefresh:c,onKill:function(e){var t=_.indexOf(e);0<=t&&_.splice(t,1)},onUpdate:function(e){var t,r,n,i=S+R*(e.progress-m),s=x.length,a=0;if(e.offset){if(s){for(r=-W.y,n=e.end;s--;){if((t=x[s]).trig.isActive||r>=t.start&&r<=t.end)return void(v&&(t.trig.progress+=t.trig.direction<0?.001:-.001,t.trig.update(0,0,1),v.resetTo("y",parseFloat(T.y),-j,!0),q&&v.progress(1)));r>t.end&&(a+=t.distance),n-=t.distance}i=S+a+R*((o.utils.clamp(e.start,e.end,r)-e.start-a)/(n-e.start)-m)}i=function(e){return Math.round(1e5*e)/1e5||0}(i+y),P.length&&!p&&P.forEach((function(e){return e(i-a)})),v?(v.resetTo("y",i,-j,!0),q&&v.progress(1)):(T.y=i+"px",T.renderTransform(1))}}})),o.core.getCache(d.trigger).stRevert=E,d.startY=S,d.pins=x,d.markers=P,d.ratio=u,d.autoSpeed=p,e.style.willChange="transform"),d}i||m.register(o)||console.warn("Please gsap.registerPlugin(ScrollSmoother)"),e=this.vars=e||{},d&&d.kill(),d=this;var R,C,M,A,_,F,H,B,I,L,N,U,z=h.getScrollFunc(s),O=1===h.isTouch?!0===e.smoothTouch?.8:parseFloat(e.smoothTouch)||0:0===e.smooth||!1===e.smooth?0:parseFloat(e.smooth)||.8,V=0,j=0,q=1,D=e.onUpdate,Y=e.onStop,K=p(0),W={y:0};function G(){return M=R.clientHeight,R.style.overflow="visible",c.style.height=M+"px",M-s.innerHeight}h.addEventListener("refresh",T),o.delayedCall(.5,(function(){return q=0})),this.scrollTop=w,this.scrollTo=function(e,r,n){var i=o.utils.clamp(0,h.maxScroll(s),isNaN(e)?t.offset(e,n):+e);r?I?o.to(t,{duration:O,scrollTop:i,overwrite:"auto",ease:g}):z(i):w(i)},this.offset=function(e,t){e=u(e)[0];var r,n=o.getProperty(e,"y"),i=h.create({trigger:e,start:t||"top top"});return _&&S([i]),r=i.start,i.kill(!1),o.set(e,{y:n}),r},this.content=function(e){return arguments.length?(R=u(e||"#smooth-content")[0]||c.children[0],B=R.getAttribute("style")||"",o.set(R,{overflow:"visible",width:"100%"}),this):R},this.wrapper=function(e){return arguments.length?(C=u(e||"#smooth-wrapper")[0]||function(e){var t=a.createElement("div");return t.classList.add("ScrollSmoother-wrapper"),e.parentNode.insertBefore(t,e),t.appendChild(e),t}(R),H=C.getAttribute("style")||"",G(),o.set(C,O?{overflow:"hidden",position:"fixed",height:"100%",width:"100%",top:0,left:0,right:0,bottom:0}:{overflow:"visible",position:"relative",width:"100%",height:"auto",top:"auto",bottom:"auto",left:"auto",right:"auto"}),this):C},this.effects=function(e,t){if(_=_||[],!e)return _.slice(0);(e=u(e)).forEach((function(e){for(var t=_.length;t--;)_[t].trigger===e&&(_[t].kill(),_.splice(t,1))}));var r,n,o=(t=t||{}).speed,i=t.lag,s=[];for(r=0;r<e.length;r++)(n=P(e[r],o,i,r))&&s.push(n);return _.push.apply(_,s),s},this.content(e.content),this.wrapper(e.wrapper),this.render=function(e){return y(e||0===e?e:V)},this.getVelocity=function(){return K.getVelocity(-V)},h.scrollerProxy(C,{scrollTop:w,scrollHeight:function(){return c.scrollHeight},fixedMarkers:!1!==e.fixedMarkers&&!!O,content:R,getBoundingClientRect:function(){return{top:0,left:0,width:s.innerWidth,height:s.innerHeight}}}),h.defaults({scroller:C});var J=h.getAll().filter((function(e){return e.scroller===s||e.scroller===C}));J.forEach((function(e){return e.revert(!0)})),A=h.create({animation:o.to(W,{y:function(){return s.innerHeight-M},ease:"none",data:"ScrollSmoother",duration:100,onUpdate:function(){var e=N;e&&(W.y=V,v(A)),y(W.y,e),r(),D&&!I&&D(t)}}),onRefreshInit:function(){return W.y=0},id:"ScrollSmoother",scroller:s,invalidateOnRefresh:!0,start:0,refreshPriority:-9999,end:G,onScrubComplete:function(){K.reset(),Y&&Y(t)},scrub:O||!0,onRefresh:function(e){v(e),y(W.y)}}),this.smooth=function(e){return O=e,arguments.length?A.scrubDuration(e):A.getTween()?A.getTween().duration():0},A.getTween()&&(A.getTween().vars.ease=e.ease||g),this.scrollTrigger=A,e.effects&&this.effects(!0===e.effects?"[data-speed], [data-lag]":e.effects,{}),J.forEach((function(e){e.vars.scroller=C,e.init(e.vars,e.animation)})),this.paused=function(e){return arguments.length?(!!I!==e&&(e?(A.getTween()&&A.getTween().pause(),z(-V),K.reset(),(L=h.normalizeScroll())&&L.disable(),I=h.observe({preventDefault:!0,type:"wheel,touch,scroll",debounce:!1,onChangeY:function(){return w(-V)}})):(I.kill(),I=0,L&&L.enable(),A.progress=(-V-A.start)/(A.end-A.start),v(A))),this):!!I},this.kill=function(){t.paused(!1),v(A),A.kill();for(var e=_?_.length:0;e--;)_[e].kill();h.scrollerProxy(C),h.removeEventListener("refresh",T),C.style.cssText=H,R.style.cssText=B;var r=h.defaults({});r&&r.scroller===C&&h.defaults({scroller:s}),t.observer&&h.normalizeScroll(!1),clearInterval(F),d=null,s.removeEventListener("focusin",b)},e.normalizeScroll&&(this.observer=h.normalizeScroll({debounce:!0})),h.config(e),"overscrollBehavior"in s.getComputedStyle(c)&&o.set(c,{overscrollBehavior:"none"}),s.addEventListener("focusin",b),F=setInterval(r,250),"loading"===a.readyState||requestAnimationFrame((function(){return h.refresh()}))}v.version="3.10.2",v.create=function(e){return d&&e&&d.content()===u(e.content)[0]?d:new v(e)},v.get=function(){return d},n()&&o.registerPlugin(v),e.ScrollSmoother=v,e.default=v,"undefined"==typeof window||window!==e?Object.defineProperty(e,"__esModule",{value:!0}):delete e.default}));