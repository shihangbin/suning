import{h,ref,onMounted,onUpdated,onBeforeUpdate,computed,onBeforeUnmount}from"vue";import{uniqueClasses}from"./utils.js";const SwiperSlide={name:"SwiperSlide",props:{tag:{type:String,default:"div"},swiperRef:{type:Object,required:!1},zoom:{type:Boolean,default:void 0},virtualIndex:{type:[String,Number],default:void 0}},setup(e,{slots:i}){let l=!1;const{swiperRef:s}=e,a=ref(null),d=ref("swiper-slide");function u(e,i,l){i===a.value&&(d.value=l)}onMounted((()=>{s.value&&(s.value.on("_slideClass",u),l=!0)})),onBeforeUpdate((()=>{!l&&s&&s.value&&(s.value.on("_slideClass",u),l=!0)})),onUpdated((()=>{a.value&&s&&s.value&&s.value.destroyed&&"swiper-slide"!==d.value&&(d.value="swiper-slide")})),onBeforeUnmount((()=>{s&&s.value&&s.value.off("_slideClass",u)}));const t=computed((()=>({isActive:d.value.indexOf("swiper-slide-active")>=0||d.value.indexOf("swiper-slide-duplicate-active")>=0,isVisible:d.value.indexOf("swiper-slide-visible")>=0,isDuplicate:d.value.indexOf("swiper-slide-duplicate")>=0,isPrev:d.value.indexOf("swiper-slide-prev")>=0||d.value.indexOf("swiper-slide-duplicate-prev")>=0,isNext:d.value.indexOf("swiper-slide-next")>=0||d.value.indexOf("swiper-slide-duplicate-next")>=0})));return()=>h(e.tag,{class:uniqueClasses(`${d.value}`),ref:a,"data-swiper-slide-index":e.virtualIndex},e.zoom?h("div",{class:"swiper-zoom-container","data-swiper-zoom":"number"==typeof e.zoom?e.zoom:void 0},i.default&&i.default(t.value)):i.default&&i.default(t.value))}};export{SwiperSlide};