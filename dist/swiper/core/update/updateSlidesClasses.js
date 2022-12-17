export default function updateSlidesClasses(){const s=this,{slides:l,params:e,$wrapperEl:a,activeIndex:i,realIndex:d}=s,t=s.virtual&&e.virtual.enabled;let C;l.removeClass(`${e.slideActiveClass} ${e.slideNextClass} ${e.slidePrevClass} ${e.slideDuplicateActiveClass} ${e.slideDuplicateNextClass} ${e.slideDuplicatePrevClass}`),C=t?s.$wrapperEl.find(`.${e.slideClass}[data-swiper-slide-index="${i}"]`):l.eq(i),C.addClass(e.slideActiveClass),e.loop&&(C.hasClass(e.slideDuplicateClass)?a.children(`.${e.slideClass}:not(.${e.slideDuplicateClass})[data-swiper-slide-index="${d}"]`).addClass(e.slideDuplicateActiveClass):a.children(`.${e.slideClass}.${e.slideDuplicateClass}[data-swiper-slide-index="${d}"]`).addClass(e.slideDuplicateActiveClass));let p=C.nextAll(`.${e.slideClass}`).eq(0).addClass(e.slideNextClass);e.loop&&0===p.length&&(p=l.eq(0),p.addClass(e.slideNextClass));let r=C.prevAll(`.${e.slideClass}`).eq(0).addClass(e.slidePrevClass);e.loop&&0===r.length&&(r=l.eq(-1),r.addClass(e.slidePrevClass)),e.loop&&(p.hasClass(e.slideDuplicateClass)?a.children(`.${e.slideClass}:not(.${e.slideDuplicateClass})[data-swiper-slide-index="${p.attr("data-swiper-slide-index")}"]`).addClass(e.slideDuplicateNextClass):a.children(`.${e.slideClass}.${e.slideDuplicateClass}[data-swiper-slide-index="${p.attr("data-swiper-slide-index")}"]`).addClass(e.slideDuplicateNextClass),r.hasClass(e.slideDuplicateClass)?a.children(`.${e.slideClass}:not(.${e.slideDuplicateClass})[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`).addClass(e.slideDuplicatePrevClass):a.children(`.${e.slideClass}.${e.slideDuplicateClass}[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`).addClass(e.slideDuplicatePrevClass)),s.emitSlidesClasses()}