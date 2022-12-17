import createElementIfNotDefined from"../../shared/create-element-if-not-defined.js";import $ from"../../shared/dom.js";export default function Navigation({swiper:a,extendParams:n,on:e,emit:i}){function s(n){let e;return n&&(e=$(n),a.params.uniqueNavElements&&"string"==typeof n&&e.length>1&&1===a.$el.find(n).length&&(e=a.$el.find(n))),e}function l(n,e){const i=a.params.navigation;n&&n.length>0&&(n[e?"addClass":"removeClass"](i.disabledClass),n[0]&&"BUTTON"===n[0].tagName&&(n[0].disabled=e),a.params.watchOverflow&&a.enabled&&n[a.isLocked?"addClass":"removeClass"](i.lockClass))}function t(){if(a.params.loop)return;const{$nextEl:n,$prevEl:e}=a.navigation;l(e,a.isBeginning&&!a.params.rewind),l(n,a.isEnd&&!a.params.rewind)}function o(n){n.preventDefault(),(!a.isBeginning||a.params.loop||a.params.rewind)&&a.slidePrev()}function r(n){n.preventDefault(),(!a.isEnd||a.params.loop||a.params.rewind)&&a.slideNext()}function d(){const n=a.params.navigation;if(a.params.navigation=createElementIfNotDefined(a,a.originalParams.navigation,a.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!n.nextEl&&!n.prevEl)return;const e=s(n.nextEl),i=s(n.prevEl);e&&e.length>0&&e.on("click",r),i&&i.length>0&&i.on("click",o),Object.assign(a.navigation,{$nextEl:e,nextEl:e&&e[0],$prevEl:i,prevEl:i&&i[0]}),a.enabled||(e&&e.addClass(n.lockClass),i&&i.addClass(n.lockClass))}function p(){const{$nextEl:n,$prevEl:e}=a.navigation;n&&n.length&&(n.off("click",r),n.removeClass(a.params.navigation.disabledClass)),e&&e.length&&(e.off("click",o),e.removeClass(a.params.navigation.disabledClass))}n({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}}),a.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null},e("init",(()=>{d(),t()})),e("toEdge fromEdge lock unlock",(()=>{t()})),e("destroy",(()=>{p()})),e("enable disable",(()=>{const{$nextEl:n,$prevEl:e}=a.navigation;n&&n[a.enabled?"removeClass":"addClass"](a.params.navigation.lockClass),e&&e[a.enabled?"removeClass":"addClass"](a.params.navigation.lockClass)})),e("click",((n,e)=>{const{$nextEl:s,$prevEl:l}=a.navigation,t=e.target;if(a.params.navigation.hideOnClick&&!$(t).is(l)&&!$(t).is(s)){if(a.pagination&&a.params.pagination&&a.params.pagination.clickable&&(a.pagination.el===t||a.pagination.el.contains(t)))return;let n;s?n=s.hasClass(a.params.navigation.hiddenClass):l&&(n=l.hasClass(a.params.navigation.hiddenClass)),i(!0===n?"navigationShow":"navigationHide"),s&&s.toggleClass(a.params.navigation.hiddenClass),l&&l.toggleClass(a.params.navigation.hiddenClass)}})),Object.assign(a.navigation,{update:t,init:d,destroy:p})}