import{getDocument}from"ssr-window";import{nextTick}from"../../shared/utils.js";export default function Autoplay({swiper:a,extendParams:e,on:t,emit:n}){let o;function i(){const e=a.slides.eq(a.activeIndex);let t=a.params.autoplay.delay;e.attr("data-swiper-autoplay")&&(t=e.attr("data-swiper-autoplay")||a.params.autoplay.delay),clearTimeout(o),o=nextTick((()=>{let e;a.params.autoplay.reverseDirection?a.params.loop?(a.loopFix(),e=a.slidePrev(a.params.speed,!0,!0),n("autoplay")):a.isBeginning?a.params.autoplay.stopOnLastSlide?r():(e=a.slideTo(a.slides.length-1,a.params.speed,!0,!0),n("autoplay")):(e=a.slidePrev(a.params.speed,!0,!0),n("autoplay")):a.params.loop?(a.loopFix(),e=a.slideNext(a.params.speed,!0,!0),n("autoplay")):a.isEnd?a.params.autoplay.stopOnLastSlide?r():(e=a.slideTo(0,a.params.speed,!0,!0),n("autoplay")):(e=a.slideNext(a.params.speed,!0,!0),n("autoplay")),(a.params.cssMode&&a.autoplay.running||!1===e)&&i()}),t)}function s(){return void 0===o&&(!a.autoplay.running&&(a.autoplay.running=!0,n("autoplayStart"),i(),!0))}function r(){return!!a.autoplay.running&&(void 0!==o&&(o&&(clearTimeout(o),o=void 0),a.autoplay.running=!1,n("autoplayStop"),!0))}function p(e){a.autoplay.running&&(a.autoplay.paused||(o&&clearTimeout(o),a.autoplay.paused=!0,0!==e&&a.params.autoplay.waitForTransition?["transitionend","webkitTransitionEnd"].forEach((e=>{a.$wrapperEl[0].addEventListener(e,l)})):(a.autoplay.paused=!1,i())))}function u(){const e=getDocument();"hidden"===e.visibilityState&&a.autoplay.running&&p(),"visible"===e.visibilityState&&a.autoplay.paused&&(i(),a.autoplay.paused=!1)}function l(e){a&&!a.destroyed&&a.$wrapperEl&&e.target===a.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach((e=>{a.$wrapperEl[0].removeEventListener(e,l)})),a.autoplay.paused=!1,a.autoplay.running?i():r())}function d(){a.params.autoplay.disableOnInteraction?r():p(),["transitionend","webkitTransitionEnd"].forEach((e=>{a.$wrapperEl[0].removeEventListener(e,l)}))}function y(){a.params.autoplay.disableOnInteraction||(a.autoplay.paused=!1,i())}a.autoplay={running:!1,paused:!1},e({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}}),t("init",(()=>{if(a.params.autoplay.enabled){s();getDocument().addEventListener("visibilitychange",u),a.params.autoplay.pauseOnMouseEnter&&(a.$el.on("mouseenter",d),a.$el.on("mouseleave",y))}})),t("beforeTransitionStart",((e,t,n)=>{a.autoplay.running&&(n||!a.params.autoplay.disableOnInteraction?a.autoplay.pause(t):r())})),t("sliderFirstMove",(()=>{a.autoplay.running&&(a.params.autoplay.disableOnInteraction?r():p())})),t("touchEnd",(()=>{a.params.cssMode&&a.autoplay.paused&&!a.params.autoplay.disableOnInteraction&&i()})),t("destroy",(()=>{a.$el.off("mouseenter",d),a.$el.off("mouseleave",y),a.autoplay.running&&r();getDocument().removeEventListener("visibilitychange",u)})),Object.assign(a.autoplay,{pause:p,run:i,start:s,stop:r})}