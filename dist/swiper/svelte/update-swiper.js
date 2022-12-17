import{isObject,extend}from"./utils.js";function updateSwiper({swiper:i,passedParams:l,changedParams:e,nextEl:n,prevEl:t,scrollbarEl:a,paginationEl:o}){const r=e.filter((i=>"children"!==i&&"direction"!==i)),{params:s,pagination:c,navigation:d,scrollbar:v,thumbs:p}=i;let u,g,b,E,x;e.includes("thumbs")&&l.thumbs&&l.thumbs.swiper&&s.thumbs&&!s.thumbs.swiper&&(u=!0),e.includes("controller")&&l.controller&&l.controller.control&&s.controller&&!s.controller.control&&(g=!0),e.includes("pagination")&&l.pagination&&(l.pagination.el||o)&&(s.pagination||!1===s.pagination)&&c&&!c.el&&(b=!0),e.includes("scrollbar")&&l.scrollbar&&(l.scrollbar.el||a)&&(s.scrollbar||!1===s.scrollbar)&&v&&!v.el&&(E=!0),e.includes("navigation")&&l.navigation&&(l.navigation.prevEl||t)&&(l.navigation.nextEl||n)&&(s.navigation||!1===s.navigation)&&d&&!d.prevEl&&!d.nextEl&&(x=!0),e.includes("virtual")&&l.virtual&&l.virtual.slides&&i.virtual&&(i.virtual.slides=l.virtual.slides,i.virtual.update());if(r.forEach((e=>{if(isObject(s[e])&&isObject(l[e]))extend(s[e],l[e]);else{const t=l[e];!0!==t&&!1!==t||"navigation"!==e&&"pagination"!==e&&"scrollbar"!==e?s[e]=l[e]:!1===t&&i[n=e]&&(i[n].destroy(),"navigation"===n?(s[n].prevEl=void 0,s[n].nextEl=void 0,i[n].prevEl=void 0,i[n].nextEl=void 0):(s[n].el=void 0,i[n].el=void 0))}var n})),u){p.init()&&p.update(!0)}g&&(i.controller.control=s.controller.control),b&&(o&&(s.pagination.el=o),c.init(),c.render(),c.update()),E&&(a&&(s.scrollbar.el=a),v.init(),v.updateSize(),v.setTranslate()),x&&(n&&(s.navigation.nextEl=n),t&&(s.navigation.prevEl=t),d.init(),d.update()),e.includes("allowSlideNext")&&(i.allowSlideNext=l.allowSlideNext),e.includes("allowSlidePrev")&&(i.allowSlidePrev=l.allowSlidePrev),e.includes("direction")&&i.changeDirection(l.direction,!1),i.update()}export{updateSwiper};