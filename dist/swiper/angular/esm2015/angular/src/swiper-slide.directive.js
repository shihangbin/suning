import{Directive,Input}from"@angular/core";import{coerceBooleanProperty}from"./utils/utils";import*as i0 from"@angular/core";export class SwiperSlideDirective{constructor(e){this.template=e,this.class="",this.autoplayDelay=null,this.slideData={isActive:!1,isPrev:!1,isNext:!1,isVisible:!1,isDuplicate:!1}}set zoom(e){this._zoom=coerceBooleanProperty(e)}get zoom(){return this._zoom}get classNames(){return this._classNames}set classNames(e){this._classNames!==e&&(this._classNames=e,this.slideData={isActive:this._hasClass(["swiper-slide-active","swiper-slide-duplicate-active"]),isVisible:this._hasClass(["swiper-slide-visible"]),isDuplicate:this._hasClass(["swiper-slide-duplicate"]),isPrev:this._hasClass(["swiper-slide-prev","swiper-slide-duplicate-prev"]),isNext:this._hasClass(["swiper-slide-next","swiper-slide-duplicate-next"])})}_hasClass(e){return e.some((e=>this._classNames.indexOf(e)>=0))}}SwiperSlideDirective.ɵfac=i0.ɵɵngDeclareFactory({minVersion:"12.0.0",version:"12.2.2",ngImport:i0,type:SwiperSlideDirective,deps:[{token:i0.TemplateRef}],target:i0.ɵɵFactoryTarget.Directive}),SwiperSlideDirective.ɵdir=i0.ɵɵngDeclareDirective({minVersion:"12.0.0",version:"12.2.2",type:SwiperSlideDirective,selector:"ng-template[swiperSlide]",inputs:{virtualIndex:"virtualIndex",class:"class",autoplayDelay:["data-swiper-autoplay","autoplayDelay"],zoom:"zoom"},ngImport:i0}),i0.ɵɵngDeclareClassMetadata({minVersion:"12.0.0",version:"12.2.2",ngImport:i0,type:SwiperSlideDirective,decorators:[{type:Directive,args:[{selector:"ng-template[swiperSlide]"}]}],ctorParameters:function(){return[{type:i0.TemplateRef}]},propDecorators:{virtualIndex:[{type:Input}],class:[{type:Input}],autoplayDelay:[{type:Input,args:["data-swiper-autoplay"]}],zoom:[{type:Input}]}});