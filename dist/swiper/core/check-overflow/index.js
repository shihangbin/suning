function checkOverflow(){const e=this,{isLocked:i,params:s}=e,{slidesOffsetBefore:l}=s;if(l){const i=e.slides.length-1,s=e.slidesGrid[i]+e.slidesSizesGrid[i]+2*l;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),i&&i!==e.isLocked&&(e.isEnd=!1),i!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}export default{checkOverflow:checkOverflow};