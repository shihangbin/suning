import{getDocument}from"ssr-window";import $ from"../../shared/dom.js";export default function loopCreate(){const e=this,l=getDocument(),{params:s,$wrapperEl:d}=e,o=d.children().length>0?$(d.children()[0].parentNode):d;o.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();let i=o.children(`.${s.slideClass}`);if(s.loopFillGroupWithBlank){const e=s.slidesPerGroup-i.length%s.slidesPerGroup;if(e!==s.slidesPerGroup){for(let d=0;d<e;d+=1){const e=$(l.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);o.append(e)}i=o.children(`.${s.slideClass}`)}}"auto"!==s.slidesPerView||s.loopedSlides||(s.loopedSlides=i.length),e.loopedSlides=Math.ceil(parseFloat(s.loopedSlides||s.slidesPerView,10)),e.loopedSlides+=s.loopAdditionalSlides,e.loopedSlides>i.length&&(e.loopedSlides=i.length);const t=[],a=[];i.each(((l,s)=>{const d=$(l);s<e.loopedSlides&&a.push(l),s<i.length&&s>=i.length-e.loopedSlides&&t.push(l),d.attr("data-swiper-slide-index",s)}));for(let e=0;e<a.length;e+=1)o.append($(a[e].cloneNode(!0)).addClass(s.slideDuplicateClass));for(let e=t.length-1;e>=0;e-=1)o.prepend($(t[e].cloneNode(!0)).addClass(s.slideDuplicateClass))}