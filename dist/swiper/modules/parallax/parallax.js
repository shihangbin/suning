import $ from"../../shared/dom.js";export default function Parallax({swiper:a,extendParams:r,on:l}){r({parallax:{enabled:!1}});const t=(r,l)=>{const{rtl:t}=a,e=$(r),s=t?-1:1,p=e.attr("data-swiper-parallax")||"0";let i=e.attr("data-swiper-parallax-x"),d=e.attr("data-swiper-parallax-y");const n=e.attr("data-swiper-parallax-scale"),x=e.attr("data-swiper-parallax-opacity");if(i||d?(i=i||"0",d=d||"0"):a.isHorizontal()?(i=p,d="0"):(d=p,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*l*s+"%":i*l*s+"px",d=d.indexOf("%")>=0?parseInt(d,10)*l+"%":d*l+"px",null!=x){const a=x-(x-1)*(1-Math.abs(l));e[0].style.opacity=a}if(null==n)e.transform(`translate3d(${i}, ${d}, 0px)`);else{const a=n-(n-1)*(1-Math.abs(l));e.transform(`translate3d(${i}, ${d}, 0px) scale(${a})`)}},e=()=>{const{$el:r,slides:l,progress:e,snapGrid:s}=a;r.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((a=>{t(a,e)})),l.each(((r,l)=>{let p=r.progress;a.params.slidesPerGroup>1&&"auto"!==a.params.slidesPerView&&(p+=Math.ceil(l/2)-e*(s.length-1)),p=Math.min(Math.max(p,-1),1),$(r).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((a=>{t(a,p)}))}))};l("beforeInit",(()=>{a.params.parallax.enabled&&(a.params.watchSlidesProgress=!0,a.originalParams.watchSlidesProgress=!0)})),l("init",(()=>{a.params.parallax.enabled&&e()})),l("setTranslate",(()=>{a.params.parallax.enabled&&e()})),l("setTransition",((r,l)=>{a.params.parallax.enabled&&((r=a.params.speed)=>{const{$el:l}=a;l.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((a=>{const l=$(a);let t=parseInt(l.attr("data-swiper-parallax-duration"),10)||r;0===r&&(t=0),l.transition(t)}))})(l)}))}