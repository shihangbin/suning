import{getWindow,getDocument}from"ssr-window";import $ from"../../shared/dom.js";export default function Keyboard({swiper:e,extendParams:t,on:n,emit:a}){const o=getDocument(),r=getWindow();function l(t){if(!e.enabled)return;const{rtlTranslate:n}=e;let l=t;l.originalEvent&&(l=l.originalEvent);const i=l.keyCode||l.charCode,d=e.params.keyboard.pageUpDown,s=d&&33===i,f=d&&34===i,c=37===i,p=39===i,b=38===i,y=40===i;if(!e.allowSlideNext&&(e.isHorizontal()&&p||e.isVertical()&&y||f))return!1;if(!e.allowSlidePrev&&(e.isHorizontal()&&c||e.isVertical()&&b||s))return!1;if(!(l.shiftKey||l.altKey||l.ctrlKey||l.metaKey||o.activeElement&&o.activeElement.nodeName&&("input"===o.activeElement.nodeName.toLowerCase()||"textarea"===o.activeElement.nodeName.toLowerCase()))){if(e.params.keyboard.onlyInViewport&&(s||f||c||p||b||y)){let t=!1;if(e.$el.parents(`.${e.params.slideClass}`).length>0&&0===e.$el.parents(`.${e.params.slideActiveClass}`).length)return;const a=e.$el,o=a[0].clientWidth,l=a[0].clientHeight,i=r.innerWidth,d=r.innerHeight,s=e.$el.offset();n&&(s.left-=e.$el[0].scrollLeft);const f=[[s.left,s.top],[s.left+o,s.top],[s.left,s.top+l],[s.left+o,s.top+l]];for(let e=0;e<f.length;e+=1){const n=f[e];if(n[0]>=0&&n[0]<=i&&n[1]>=0&&n[1]<=d){if(0===n[0]&&0===n[1])continue;t=!0}}if(!t)return}e.isHorizontal()?((s||f||c||p)&&(l.preventDefault?l.preventDefault():l.returnValue=!1),((f||p)&&!n||(s||c)&&n)&&e.slideNext(),((s||c)&&!n||(f||p)&&n)&&e.slidePrev()):((s||f||b||y)&&(l.preventDefault?l.preventDefault():l.returnValue=!1),(f||y)&&e.slideNext(),(s||b)&&e.slidePrev()),a("keyPress",i)}}function i(){e.keyboard.enabled||($(o).on("keydown",l),e.keyboard.enabled=!0)}function d(){e.keyboard.enabled&&($(o).off("keydown",l),e.keyboard.enabled=!1)}e.keyboard={enabled:!1},t({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),n("init",(()=>{e.params.keyboard.enabled&&i()})),n("destroy",(()=>{e.keyboard.enabled&&d()})),Object.assign(e.keyboard,{enable:i,disable:d})}