import React from"react";import Swiper from"swiper";function calcLoopedSlides(e,l){let o=l.slidesPerView;if(l.breakpoints){const e=Swiper.prototype.getBreakpoint(l.breakpoints),s=e in l.breakpoints?l.breakpoints[e]:void 0;s&&s.slidesPerView&&(o=s.slidesPerView)}let s=Math.ceil(parseFloat(l.loopedSlides||o,10));return s+=l.loopAdditionalSlides,s>e.length&&(s=e.length),s}function renderLoop(e,l,o){const s=l.map(((l,o)=>React.cloneElement(l,{swiper:e,"data-swiper-slide-index":o})));function i(e,l,s){return React.cloneElement(e,{key:`${e.key}-duplicate-${l}-${s}`,className:`${e.props.className||""} ${o.slideDuplicateClass}`})}if(o.loopFillGroupWithBlank){const e=o.slidesPerGroup-s.length%o.slidesPerGroup;if(e!==o.slidesPerGroup)for(let l=0;l<e;l+=1){const e=React.createElement("div",{className:`${o.slideClass} ${o.slideBlankClass}`});s.push(e)}}"auto"!==o.slidesPerView||o.loopedSlides||(o.loopedSlides=s.length);const t=calcLoopedSlides(s,o),r=[],p=[];return s.forEach(((e,l)=>{l<t&&p.push(i(e,l,"prepend")),l<s.length&&l>=s.length-t&&r.push(i(e,l,"append"))})),e&&(e.loopedSlides=t),[...r,...s,...p]}export{calcLoopedSlides,renderLoop};