export function isObject(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}export function isShowEl(e,t,o){return!0===coerceBooleanProperty(e)&&t&&!t.el||!("boolean"!=typeof t&&t.el!==(null==o?void 0:o.nativeElement)&&("string"==typeof t.el||"object"==typeof t.el))}export function extend(e,t){const o=["__proto__","constructor","prototype"];Object.keys(t).filter((e=>o.indexOf(e)<0)).forEach((o=>{void 0!==e[o]?e[o]&&!t[o]||(isObject(t[o])&&isObject(e[o])&&Object.keys(t[o]).length>0?t[o].__swiper__?e[o]=t[o]:extend(e[o],t[o]):e[o]=t[o]):e[o]=t[o]}))}export function coerceBooleanProperty(e){return null!=e&&"false"!=`${e}`}export const ignoreNgOnChanges=["pagination","navigation","scrollbar","virtual"];export function setProperty(e,t={}){return isObject(e)?e:!0===coerceBooleanProperty(e)&&t}