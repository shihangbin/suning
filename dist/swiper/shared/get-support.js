import{getWindow,getDocument}from"ssr-window";let support;function calcSupport(){const t=getWindow(),e=getDocument();return{smoothScroll:e.documentElement&&"scrollBehavior"in e.documentElement.style,touch:!!("ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch),passiveListener:function(){let e=!1;try{const o=Object.defineProperty({},"passive",{get(){e=!0}});t.addEventListener("testPassiveListener",null,o)}catch(t){}return e}(),gestures:"ongesturestart"in t}}function getSupport(){return support||(support=calcSupport()),support}export{getSupport};