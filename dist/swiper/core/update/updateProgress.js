export default function updateProgress(e){const s=this;if(void 0===e){const t=s.rtlTranslate?-1:1;e=s&&s.translate&&s.translate*t||0}const t=s.params,n=s.maxTranslate()-s.minTranslate();let{progress:i,isBeginning:r,isEnd:a}=s;const g=r,o=a;0===n?(i=0,r=!0,a=!0):(i=(e-s.minTranslate())/n,r=i<=0,a=i>=1),Object.assign(s,{progress:i,isBeginning:r,isEnd:a}),(t.watchSlidesProgress||t.centeredSlides&&t.autoHeight)&&s.updateSlidesProgress(e),r&&!g&&s.emit("reachBeginning toEdge"),a&&!o&&s.emit("reachEnd toEdge"),(g&&!r||o&&!a)&&s.emit("fromEdge"),s.emit("progress",i)}