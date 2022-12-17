import{h,ref,onMounted,onUpdated,onBeforeUnmount,watch,nextTick}from"vue";import{getParams}from"./get-params.js";import{initSwiper,mountSwiper}from"./init-swiper.js";import{needsScrollbar,needsNavigation,needsPagination,uniqueClasses,extend}from"./utils.js";import{renderLoop,calcLoopedSlides}from"./loop.js";import{getChangedParams}from"./get-changed-params.js";import{getChildren}from"./get-children.js";import{updateSwiper}from"./update-swiper.js";import{renderVirtual,updateOnVirtualData}from"./virtual.js";const Swiper={name:"Swiper",props:{tag:{type:String,default:"div"},wrapperTag:{type:String,default:"div"},modules:{type:Array,default:void 0},init:{type:Boolean,default:void 0},direction:{type:String,default:void 0},touchEventsTarget:{type:String,default:void 0},initialSlide:{type:Number,default:void 0},speed:{type:Number,default:void 0},cssMode:{type:Boolean,default:void 0},updateOnWindowResize:{type:Boolean,default:void 0},resizeObserver:{type:Boolean,default:void 0},nested:{type:Boolean,default:void 0},focusableElements:{type:String,default:void 0},width:{type:Number,default:void 0},height:{type:Number,default:void 0},preventInteractionOnTransition:{type:Boolean,default:void 0},userAgent:{type:String,default:void 0},url:{type:String,default:void 0},edgeSwipeDetection:{type:[Boolean,String],default:void 0},edgeSwipeThreshold:{type:Number,default:void 0},autoHeight:{type:Boolean,default:void 0},setWrapperSize:{type:Boolean,default:void 0},virtualTranslate:{type:Boolean,default:void 0},effect:{type:String,default:void 0},breakpoints:{type:Object,default:void 0},spaceBetween:{type:Number,default:void 0},slidesPerView:{type:[Number,String],default:void 0},slidesPerGroup:{type:Number,default:void 0},slidesPerGroupSkip:{type:Number,default:void 0},slidesPerGroupAuto:{type:Boolean,default:void 0},centeredSlides:{type:Boolean,default:void 0},centeredSlidesBounds:{type:Boolean,default:void 0},slidesOffsetBefore:{type:Number,default:void 0},slidesOffsetAfter:{type:Number,default:void 0},normalizeSlideIndex:{type:Boolean,default:void 0},centerInsufficientSlides:{type:Boolean,default:void 0},watchOverflow:{type:Boolean,default:void 0},roundLengths:{type:Boolean,default:void 0},touchRatio:{type:Number,default:void 0},touchAngle:{type:Number,default:void 0},simulateTouch:{type:Boolean,default:void 0},shortSwipes:{type:Boolean,default:void 0},longSwipes:{type:Boolean,default:void 0},longSwipesRatio:{type:Number,default:void 0},longSwipesMs:{type:Number,default:void 0},followFinger:{type:Boolean,default:void 0},allowTouchMove:{type:Boolean,default:void 0},threshold:{type:Number,default:void 0},touchMoveStopPropagation:{type:Boolean,default:void 0},touchStartPreventDefault:{type:Boolean,default:void 0},touchStartForcePreventDefault:{type:Boolean,default:void 0},touchReleaseOnEdges:{type:Boolean,default:void 0},uniqueNavElements:{type:Boolean,default:void 0},resistance:{type:Boolean,default:void 0},resistanceRatio:{type:Number,default:void 0},watchSlidesProgress:{type:Boolean,default:void 0},grabCursor:{type:Boolean,default:void 0},preventClicks:{type:Boolean,default:void 0},preventClicksPropagation:{type:Boolean,default:void 0},slideToClickedSlide:{type:Boolean,default:void 0},preloadImages:{type:Boolean,default:void 0},updateOnImagesReady:{type:Boolean,default:void 0},loop:{type:Boolean,default:void 0},loopAdditionalSlides:{type:Number,default:void 0},loopedSlides:{type:Number,default:void 0},loopFillGroupWithBlank:{type:Boolean,default:void 0},loopPreventsSlide:{type:Boolean,default:void 0},rewind:{type:Boolean,default:void 0},allowSlidePrev:{type:Boolean,default:void 0},allowSlideNext:{type:Boolean,default:void 0},swipeHandler:{type:Boolean,default:void 0},noSwiping:{type:Boolean,default:void 0},noSwipingClass:{type:String,default:void 0},noSwipingSelector:{type:String,default:void 0},passiveListeners:{type:Boolean,default:void 0},containerModifierClass:{type:String,default:void 0},slideClass:{type:String,default:void 0},slideBlankClass:{type:String,default:void 0},slideActiveClass:{type:String,default:void 0},slideDuplicateActiveClass:{type:String,default:void 0},slideVisibleClass:{type:String,default:void 0},slideDuplicateClass:{type:String,default:void 0},slideNextClass:{type:String,default:void 0},slideDuplicateNextClass:{type:String,default:void 0},slidePrevClass:{type:String,default:void 0},slideDuplicatePrevClass:{type:String,default:void 0},wrapperClass:{type:String,default:void 0},runCallbacksOnInit:{type:Boolean,default:void 0},observer:{type:Boolean,default:void 0},observeParents:{type:Boolean,default:void 0},observeSlideChildren:{type:Boolean,default:void 0},a11y:{type:[Boolean,Object],default:void 0},autoplay:{type:[Boolean,Object],default:void 0},controller:{type:Object,default:void 0},coverflowEffect:{type:Object,default:void 0},cubeEffect:{type:Object,default:void 0},fadeEffect:{type:Object,default:void 0},flipEffect:{type:Object,default:void 0},creativeEffect:{type:Object,default:void 0},cardsEffect:{type:Object,default:void 0},hashNavigation:{type:[Boolean,Object],default:void 0},history:{type:[Boolean,Object],default:void 0},keyboard:{type:[Boolean,Object],default:void 0},lazy:{type:[Boolean,Object],default:void 0},mousewheel:{type:[Boolean,Object],default:void 0},navigation:{type:[Boolean,Object],default:void 0},pagination:{type:[Boolean,Object],default:void 0},parallax:{type:[Boolean,Object],default:void 0},scrollbar:{type:[Boolean,Object],default:void 0},thumbs:{type:Object,default:void 0},virtual:{type:[Boolean,Object],default:void 0},zoom:{type:[Boolean,Object],default:void 0},grid:{type:[Object],default:void 0},freeMode:{type:[Boolean,Object],default:void 0}},emits:["_beforeBreakpoint","_containerClasses","_slideClass","_slideClasses","_swiper","activeIndexChange","afterInit","autoplay","autoplayStart","autoplayStop","beforeDestroy","beforeInit","beforeLoopFix","beforeResize","beforeSlideChangeStart","beforeTransitionStart","breakpoint","changeDirection","click","disable","doubleTap","doubleClick","destroy","enable","fromEdge","hashChange","hashSet","imagesReady","init","keyPress","lazyImageLoad","lazyImageReady","lock","loopFix","momentumBounce","navigationHide","navigationShow","observerUpdate","orientationchange","paginationHide","paginationRender","paginationShow","paginationUpdate","progress","reachBeginning","reachEnd","realIndexChange","resize","scroll","scrollbarDragEnd","scrollbarDragMove","scrollbarDragStart","setTransition","setTranslate","slideChange","slideChangeTransitionEnd","slideChangeTransitionStart","slideNextTransitionEnd","slideNextTransitionStart","slidePrevTransitionEnd","slidePrevTransitionStart","slideResetTransitionStart","slideResetTransitionEnd","sliderMove","sliderFirstMove","slidesLengthChange","slidesGridLengthChange","snapGridLengthChange","snapIndexChange","swiper","tap","toEdge","touchEnd","touchMove","touchMoveOpposite","touchStart","transitionEnd","transitionStart","unlock","update","zoomChange"],setup(e,{slots:t,emit:a}){const{tag:o,wrapperTag:l}=e,i=ref("swiper"),d=ref(null),r=ref(!1),n=ref(!1),s=ref(null),u=ref(null),p=ref(null),v={value:[]},f={value:[]},y=ref(null),c=ref(null),g=ref(null),b=ref(null),{params:S,passedParams:m}=getParams(e);getChildren(t,v,f),p.value=m,f.value=v.value;if(S.onAny=(e,...t)=>{a(e,...t)},Object.assign(S.on,{_beforeBreakpoint:()=>{getChildren(t,v,f),r.value=!0},_containerClasses(e,t){i.value=t}}),u.value=initSwiper(S),u.value.loopCreate=()=>{},u.value.loopDestroy=()=>{},S.loop&&(u.value.loopedSlides=calcLoopedSlides(v.value,S)),u.value.virtual&&u.value.params.virtual.enabled){u.value.virtual.slides=v.value;const e={cache:!1,slides:v.value,renderExternal:e=>{d.value=e},renderExternalUpdate:!1};extend(u.value.params.virtual,e),extend(u.value.originalParams.virtual,e)}function B(e){return S.virtual?renderVirtual(u,e,d.value):!S.loop||u.value&&u.value.destroyed?(e.forEach((e=>{e.props||(e.props={}),e.props.swiperRef=u})),e):renderLoop(u,e,S)}return onUpdated((()=>{!n.value&&u.value&&(u.value.emitSlidesClasses(),n.value=!0);const{passedParams:t}=getParams(e),a=getChangedParams(t,p.value,v.value,f.value);p.value=t,(a.length||r.value)&&u.value&&!u.value.destroyed&&updateSwiper({swiper:u.value,slides:v.value,passedParams:t,changedParams:a,nextEl:y.value,prevEl:c.value,scrollbarEl:b.value,paginationEl:g.value}),r.value=!1})),watch(d,(()=>{nextTick((()=>{updateOnVirtualData(u.value)}))})),onMounted((()=>{s.value&&(mountSwiper({el:s.value,nextEl:y.value,prevEl:c.value,paginationEl:g.value,scrollbarEl:b.value,swiper:u.value},S),a("swiper",u.value))})),onBeforeUnmount((()=>{u.value&&!u.value.destroyed&&u.value.destroy(!0,!1)})),()=>{const{slides:a,slots:d}=getChildren(t,v,f);return h(o,{ref:s,class:uniqueClasses(i.value)},[d["container-start"],needsNavigation(e)&&[h("div",{ref:c,class:"swiper-button-prev"}),h("div",{ref:y,class:"swiper-button-next"})],needsScrollbar(e)&&h("div",{ref:b,class:"swiper-scrollbar"}),needsPagination(e)&&h("div",{ref:g,class:"swiper-pagination"}),h(l,{class:"swiper-wrapper"},[d["wrapper-start"],B(a),d["wrapper-end"]]),d["container-end"]])}}};export{Swiper};