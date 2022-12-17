import{getDocument}from"ssr-window";import $ from"../shared/dom.js";import{extend,now,deleteProps}from"../shared/utils.js";import{getSupport}from"../shared/get-support.js";import{getDevice}from"../shared/get-device.js";import{getBrowser}from"../shared/get-browser.js";import Resize from"./modules/resize/resize.js";import Observer from"./modules/observer/observer.js";import eventsEmitter from"./events-emitter.js";import update from"./update/index.js";import translate from"./translate/index.js";import transition from"./transition/index.js";import slide from"./slide/index.js";import loop from"./loop/index.js";import grabCursor from"./grab-cursor/index.js";import events from"./events/index.js";import breakpoints from"./breakpoints/index.js";import classes from"./classes/index.js";import images from"./images/index.js";import checkOverflow from"./check-overflow/index.js";import defaults from"./defaults.js";import moduleExtendParams from"./moduleExtendParams.js";const prototypes={eventsEmitter:eventsEmitter,update:update,translate:translate,transition:transition,slide:slide,loop:loop,grabCursor:grabCursor,events:events,breakpoints:breakpoints,checkOverflow:checkOverflow,classes:classes,images:images},extendedDefaults={};class Swiper{constructor(...e){let s,t;if(1===e.length&&e[0].constructor&&"Object"===Object.prototype.toString.call(e[0]).slice(8,-1)?t=e[0]:[s,t]=e,t||(t={}),t=extend({},t),s&&!t.el&&(t.el=s),t.el&&$(t.el).length>1){const e=[];return $(t.el).each((s=>{const r=extend({},t,{el:s});e.push(new Swiper(r))})),e}const r=this;r.__swiper__=!0,r.support=getSupport(),r.device=getDevice({userAgent:t.userAgent}),r.browser=getBrowser(),r.eventsListeners={},r.eventsAnyListeners=[],r.modules=[...r.__modules__],t.modules&&Array.isArray(t.modules)&&r.modules.push(...t.modules);const a={};r.modules.forEach((e=>{e({swiper:r,extendParams:moduleExtendParams(t,a),on:r.on.bind(r),once:r.once.bind(r),off:r.off.bind(r),emit:r.emit.bind(r)})}));const i=extend({},defaults,a);return r.params=extend({},i,extendedDefaults,t),r.originalParams=extend({},r.params),r.passedParams=extend({},t),r.params&&r.params.on&&Object.keys(r.params.on).forEach((e=>{r.on(e,r.params.on[e])})),r.params&&r.params.onAny&&r.onAny(r.params.onAny),r.$=$,Object.assign(r,{enabled:r.params.enabled,el:s,classNames:[],slides:$(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal(){return"horizontal"===r.params.direction},isVertical(){return"vertical"===r.params.direction},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:r.params.allowSlideNext,allowSlidePrev:r.params.allowSlidePrev,touchEvents:function(){const e=["touchstart","touchmove","touchend","touchcancel"],s=["pointerdown","pointermove","pointerup"];return r.touchEventsTouch={start:e[0],move:e[1],end:e[2],cancel:e[3]},r.touchEventsDesktop={start:s[0],move:s[1],end:s[2]},r.support.touch||!r.params.simulateTouch?r.touchEventsTouch:r.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:r.params.focusableElements,lastClickTime:now(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:r.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),r.emit("_swiper"),r.params.init&&r.init(),r}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,s){const t=this;e=Math.min(Math.max(e,0),1);const r=t.minTranslate(),a=(t.maxTranslate()-r)*e+r;t.translateTo(a,void 0===s?0:s),t.updateActiveIndex(),t.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const s=e.el.className.split(" ").filter((s=>0===s.indexOf("swiper")||0===s.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",s.join(" "))}getSlideClasses(e){const s=this;return e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(s.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const s=[];e.slides.each((t=>{const r=e.getSlideClasses(t);s.push({slideEl:t,classNames:r}),e.emit("_slideClass",t,r)})),e.emit("_slideClasses",s)}slidesPerViewDynamic(e="current",s=!1){const{params:t,slides:r,slidesGrid:a,slidesSizesGrid:i,size:o,activeIndex:l}=this;let n=1;if(t.centeredSlides){let e,s=r[l].swiperSlideSize;for(let t=l+1;t<r.length;t+=1)r[t]&&!e&&(s+=r[t].swiperSlideSize,n+=1,s>o&&(e=!0));for(let t=l-1;t>=0;t-=1)r[t]&&!e&&(s+=r[t].swiperSlideSize,n+=1,s>o&&(e=!0))}else if("current"===e)for(let e=l+1;e<r.length;e+=1){(s?a[e]+i[e]-a[l]<o:a[e]-a[l]<o)&&(n+=1)}else for(let e=l-1;e>=0;e-=1){a[l]-a[e]<o&&(n+=1)}return n}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:s,params:t}=e;function r(){const s=e.rtlTranslate?-1*e.translate:e.translate,t=Math.min(Math.max(s,e.maxTranslate()),e.minTranslate());e.setTranslate(t),e.updateActiveIndex(),e.updateSlidesClasses()}let a;t.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(r(),e.params.autoHeight&&e.updateAutoHeight()):(a=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),a||r()),t.watchOverflow&&s!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,s=!0){const t=this,r=t.params.direction;return e||(e="horizontal"===r?"vertical":"horizontal"),e===r||"horizontal"!==e&&"vertical"!==e||(t.$el.removeClass(`${t.params.containerModifierClass}${r}`).addClass(`${t.params.containerModifierClass}${e}`),t.emitContainerClasses(),t.params.direction=e,t.slides.each((s=>{"vertical"===e?s.style.width="":s.style.height=""})),t.emit("changeDirection"),s&&t.update()),t}mount(e){const s=this;if(s.mounted)return!0;const t=$(e||s.params.el);if(!(e=t[0]))return!1;e.swiper=s;const r=()=>`.${(s.params.wrapperClass||"").trim().split(" ").join(".")}`;let a=(()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const s=$(e.shadowRoot.querySelector(r()));return s.children=e=>t.children(e),s}return t.children(r())})();if(0===a.length&&s.params.createElements){const e=getDocument().createElement("div");a=$(e),e.className=s.params.wrapperClass,t.append(e),t.children(`.${s.params.slideClass}`).each((e=>{a.append(e)}))}return Object.assign(s,{$el:t,el:e,$wrapperEl:a,wrapperEl:a[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===t.css("direction"),rtlTranslate:"horizontal"===s.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===t.css("direction")),wrongRTL:"-webkit-box"===a.css("display")}),!0}init(e){const s=this;if(s.initialized)return s;return!1===s.mount(e)||(s.emit("beforeInit"),s.params.breakpoints&&s.setBreakpoint(),s.addClasses(),s.params.loop&&s.loopCreate(),s.updateSize(),s.updateSlides(),s.params.watchOverflow&&s.checkOverflow(),s.params.grabCursor&&s.enabled&&s.setGrabCursor(),s.params.preloadImages&&s.preloadImages(),s.params.loop?s.slideTo(s.params.initialSlide+s.loopedSlides,0,s.params.runCallbacksOnInit,!1,!0):s.slideTo(s.params.initialSlide,0,s.params.runCallbacksOnInit,!1,!0),s.attachEvents(),s.initialized=!0,s.emit("init"),s.emit("afterInit")),s}destroy(e=!0,s=!0){const t=this,{params:r,$el:a,$wrapperEl:i,slides:o}=t;return void 0===t.params||t.destroyed||(t.emit("beforeDestroy"),t.initialized=!1,t.detachEvents(),r.loop&&t.loopDestroy(),s&&(t.removeClasses(),a.removeAttr("style"),i.removeAttr("style"),o&&o.length&&o.removeClass([r.slideVisibleClass,r.slideActiveClass,r.slideNextClass,r.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),t.emit("destroy"),Object.keys(t.eventsListeners).forEach((e=>{t.off(e)})),!1!==e&&(t.$el[0].swiper=null,deleteProps(t)),t.destroyed=!0),null}static extendDefaults(e){extend(extendedDefaults,e)}static get extendedDefaults(){return extendedDefaults}static get defaults(){return defaults}static installModule(e){Swiper.prototype.__modules__||(Swiper.prototype.__modules__=[]);const s=Swiper.prototype.__modules__;"function"==typeof e&&s.indexOf(e)<0&&s.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>Swiper.installModule(e))),Swiper):(Swiper.installModule(e),Swiper)}}Object.keys(prototypes).forEach((e=>{Object.keys(prototypes[e]).forEach((s=>{Swiper.prototype[s]=prototypes[e][s]}))})),Swiper.use([Resize,Observer]);export default Swiper;