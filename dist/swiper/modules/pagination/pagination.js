import $ from"../../shared/dom.js";import classesToSelector from"../../shared/classes-to-selector.js";import createElementIfNotDefined from"../../shared/create-element-if-not-defined.js";export default function Pagination({swiper:a,extendParams:e,on:l,emit:s}){const t="swiper-pagination";let n;e({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:a=>a,formatFractionTotal:a=>a,bulletClass:`${t}-bullet`,bulletActiveClass:`${t}-bullet-active`,modifierClass:`${t}-`,currentClass:`${t}-current`,totalClass:`${t}-total`,hiddenClass:`${t}-hidden`,progressbarFillClass:`${t}-progressbar-fill`,progressbarOppositeClass:`${t}-progressbar-opposite`,clickableClass:`${t}-clickable`,lockClass:`${t}-lock`,horizontalClass:`${t}-horizontal`,verticalClass:`${t}-vertical`}}),a.pagination={el:null,$el:null,bullets:[]};let i=0;function r(){return!a.params.pagination.el||!a.pagination.el||!a.pagination.$el||0===a.pagination.$el.length}function o(e,l){const{bulletActiveClass:s}=a.params.pagination;e[l]().addClass(`${s}-${l}`)[l]().addClass(`${s}-${l}-${l}`)}function p(){const e=a.rtl,l=a.params.pagination;if(r())return;const t=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,p=a.pagination.$el;let d;const c=a.params.loop?Math.ceil((t-2*a.loopedSlides)/a.params.slidesPerGroup):a.snapGrid.length;if(a.params.loop?(d=Math.ceil((a.activeIndex-a.loopedSlides)/a.params.slidesPerGroup),d>t-1-2*a.loopedSlides&&(d-=t-2*a.loopedSlides),d>c-1&&(d-=c),d<0&&"bullets"!==a.params.paginationType&&(d=c+d)):d=void 0!==a.snapIndex?a.snapIndex:a.activeIndex||0,"bullets"===l.type&&a.pagination.bullets&&a.pagination.bullets.length>0){const s=a.pagination.bullets;let t,r,c;if(l.dynamicBullets&&(n=s.eq(0)[a.isHorizontal()?"outerWidth":"outerHeight"](!0),p.css(a.isHorizontal()?"width":"height",n*(l.dynamicMainBullets+4)+"px"),l.dynamicMainBullets>1&&void 0!==a.previousIndex&&(i+=d-(a.previousIndex-a.loopedSlides||0),i>l.dynamicMainBullets-1?i=l.dynamicMainBullets-1:i<0&&(i=0)),t=Math.max(d-i,0),r=t+(Math.min(s.length,l.dynamicMainBullets)-1),c=(r+t)/2),s.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map((a=>`${l.bulletActiveClass}${a}`)).join(" ")),p.length>1)s.each((a=>{const e=$(a),s=e.index();s===d&&e.addClass(l.bulletActiveClass),l.dynamicBullets&&(s>=t&&s<=r&&e.addClass(`${l.bulletActiveClass}-main`),s===t&&o(e,"prev"),s===r&&o(e,"next"))}));else{const e=s.eq(d),n=e.index();if(e.addClass(l.bulletActiveClass),l.dynamicBullets){const e=s.eq(t),i=s.eq(r);for(let a=t;a<=r;a+=1)s.eq(a).addClass(`${l.bulletActiveClass}-main`);if(a.params.loop)if(n>=s.length){for(let a=l.dynamicMainBullets;a>=0;a-=1)s.eq(s.length-a).addClass(`${l.bulletActiveClass}-main`);s.eq(s.length-l.dynamicMainBullets-1).addClass(`${l.bulletActiveClass}-prev`)}else o(e,"prev"),o(i,"next");else o(e,"prev"),o(i,"next")}}if(l.dynamicBullets){const t=Math.min(s.length,l.dynamicMainBullets+4),i=(n*t-n)/2-c*n,r=e?"right":"left";s.css(a.isHorizontal()?r:"top",`${i}px`)}}if("fraction"===l.type&&(p.find(classesToSelector(l.currentClass)).text(l.formatFractionCurrent(d+1)),p.find(classesToSelector(l.totalClass)).text(l.formatFractionTotal(c))),"progressbar"===l.type){let e;e=l.progressbarOpposite?a.isHorizontal()?"vertical":"horizontal":a.isHorizontal()?"horizontal":"vertical";const s=(d+1)/c;let t=1,n=1;"horizontal"===e?t=s:n=s,p.find(classesToSelector(l.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${t}) scaleY(${n})`).transition(a.params.speed)}"custom"===l.type&&l.renderCustom?(p.html(l.renderCustom(a,d+1,c)),s("paginationRender",p[0])):s("paginationUpdate",p[0]),a.params.watchOverflow&&a.enabled&&p[a.isLocked?"addClass":"removeClass"](l.lockClass)}function d(){const e=a.params.pagination;if(r())return;const l=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,t=a.pagination.$el;let n="";if("bullets"===e.type){let s=a.params.loop?Math.ceil((l-2*a.loopedSlides)/a.params.slidesPerGroup):a.snapGrid.length;a.params.freeMode&&a.params.freeMode.enabled&&!a.params.loop&&s>l&&(s=l);for(let l=0;l<s;l+=1)e.renderBullet?n+=e.renderBullet.call(a,l,e.bulletClass):n+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;t.html(n),a.pagination.bullets=t.find(classesToSelector(e.bulletClass))}"fraction"===e.type&&(n=e.renderFraction?e.renderFraction.call(a,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,t.html(n)),"progressbar"===e.type&&(n=e.renderProgressbar?e.renderProgressbar.call(a,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`,t.html(n)),"custom"!==e.type&&s("paginationRender",a.pagination.$el[0])}function c(){a.params.pagination=createElementIfNotDefined(a,a.originalParams.pagination,a.params.pagination,{el:"swiper-pagination"});const e=a.params.pagination;if(!e.el)return;let l=$(e.el);0!==l.length&&(a.params.uniqueNavElements&&"string"==typeof e.el&&l.length>1&&(l=a.$el.find(e.el),l.length>1&&(l=l.filter((e=>$(e).parents(".swiper")[0]===a.el)))),"bullets"===e.type&&e.clickable&&l.addClass(e.clickableClass),l.addClass(e.modifierClass+e.type),l.addClass(e.modifierClass+a.params.direction),"bullets"===e.type&&e.dynamicBullets&&(l.addClass(`${e.modifierClass}${e.type}-dynamic`),i=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&l.addClass(e.progressbarOppositeClass),e.clickable&&l.on("click",classesToSelector(e.bulletClass),(function(e){e.preventDefault();let l=$(this).index()*a.params.slidesPerGroup;a.params.loop&&(l+=a.loopedSlides),a.slideTo(l)})),Object.assign(a.pagination,{$el:l,el:l[0]}),a.enabled||l.addClass(e.lockClass))}function m(){const e=a.params.pagination;if(r())return;const l=a.pagination.$el;l.removeClass(e.hiddenClass),l.removeClass(e.modifierClass+e.type),l.removeClass(e.modifierClass+a.params.direction),a.pagination.bullets&&a.pagination.bullets.removeClass&&a.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&l.off("click",classesToSelector(e.bulletClass))}l("init",(()=>{c(),d(),p()})),l("activeIndexChange",(()=>{(a.params.loop||void 0===a.snapIndex)&&p()})),l("snapIndexChange",(()=>{a.params.loop||p()})),l("slidesLengthChange",(()=>{a.params.loop&&(d(),p())})),l("snapGridLengthChange",(()=>{a.params.loop||(d(),p())})),l("destroy",(()=>{m()})),l("enable disable",(()=>{const{$el:e}=a.pagination;e&&e[a.enabled?"removeClass":"addClass"](a.params.pagination.lockClass)})),l("lock unlock",(()=>{p()})),l("click",((e,l)=>{const t=l.target,{$el:n}=a.pagination;if(a.params.pagination.el&&a.params.pagination.hideOnClick&&n.length>0&&!$(t).hasClass(a.params.pagination.bulletClass)){if(a.navigation&&(a.navigation.nextEl&&t===a.navigation.nextEl||a.navigation.prevEl&&t===a.navigation.prevEl))return;const e=n.hasClass(a.params.pagination.hiddenClass);s(!0===e?"paginationShow":"paginationHide"),n.toggleClass(a.params.pagination.hiddenClass)}})),Object.assign(a.pagination,{render:d,update:p,init:c,destroy:m})}