import{getWindow}from"ssr-window";import $ from"../../shared/dom.js";export default function loadImage(o,e,r,t,n,s){const i=getWindow();let d;function m(){s&&s()}$(o).parent("picture")[0]||o.complete&&n?m():e?(d=new i.Image,d.onload=m,d.onerror=m,t&&(d.sizes=t),r&&(d.srcset=r),e&&(d.src=e)):m()}