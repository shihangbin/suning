import React from"react";function updateOnVirtualData(a){!a||a.destroyed||!a.params.virtual||a.params.virtual&&!a.params.virtual.enabled||(a.updateSlides(),a.updateProgress(),a.updateSlidesClasses(),a.lazy&&a.params.lazy.enabled&&a.lazy.load(),a.parallax&&a.params.parallax&&a.params.parallax.enabled&&a.parallax.setTranslate())}function renderVirtual(a,r,e){if(!e)return null;const t=a.isHorizontal()?{[a.rtlTranslate?"right":"left"]:`${e.offset}px`}:{top:`${e.offset}px`};return r.filter(((a,r)=>r>=e.from&&r<=e.to)).map((r=>React.cloneElement(r,{swiper:a,style:t})))}export{renderVirtual,updateOnVirtualData};