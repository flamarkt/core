(()=>{var r={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return r.d(o,{a:o}),o},d:(t,o)=>{for(var e in o)r.o(o,e)&&!r.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:o[e]})},o:(r,t)=>Object.prototype.hasOwnProperty.call(r,t),r:r=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})}},t={};(()=>{"use strict";r.r(t),r.d(t,{mithril2html:()=>v});const o=flarum.core.compat["forum/app"];var e=r.n(o);function n(r,t){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,t){return r.__proto__=t,r},n(r,t)}function a(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,n(r,t)}const i=flarum.core.compat["common/components/Page"];var c=r.n(i);const u=((flarum.extensions["flamarkt-core"]||{}).forum||{})["components/OrderTable"];var d=r.n(u);const s=flarum.core.compat["common/utils/ItemList"];var p=r.n(s);const l=flarum.core.compat["common/components/LinkButton"];var f=r.n(l),h=function(r){function t(){for(var t,o=arguments.length,e=new Array(o),n=0;n<o;n++)e[n]=arguments[n];return(t=r.call.apply(r,[this].concat(e))||this).order=null,t}a(t,r);var o=t.prototype;return o.oninit=function(t){var o=this;r.prototype.oninit.call(this,t),this.order=e().preloadedApiDocument();var n=m.route.param().id;n&&e().store.find("flamarkt/orders",n).then((function(r){o.order=r,m.redraw()}))},o.view=function(){return this.order?m("div",this.sections().toArray()):m("div","There was an error rendering the order")},o.sections=function(){var r=new(p());return r.add("table",m(d(),{order:this.order}),100),r.add("link",m(".ButtonBlock",f().component({className:"Button",href:e().route.order(this.order)},"Order page")),-100),r},t}(c()),y=function(r){function t(){for(var t,o=arguments.length,e=new Array(o),n=0;n<o;n++)e[n]=arguments[n];return(t=r.call.apply(r,[this].concat(e))||this).product=null,t}a(t,r);var o=t.prototype;return o.oninit=function(t){var o=this;r.prototype.oninit.call(this,t),this.product=e().preloadedApiDocument();var n=m.route.param().id;n&&e().store.find("flamarkt/products",n).then((function(r){o.product=r,m.redraw()}))},o.view=function(){return this.product?m("div",this.sections().toArray()):m("div","There was an error rendering the product")},o.sections=function(){var r=new(p());return r.add("title",m("h1",this.product.title()),100),r.add("link",m(".ButtonBlock",f().component({className:"Button",href:e().route.product(this.product)},"Product page")),-100),r},t}(c()),v={"pages/OrderSummary":h,"pages/ProductSummary":y};e().initializers.add("flamarkt-core-mithril2html",(function(){e().routes["flamarkt.order.summary"]={path:"/flamarkt/order-summary",component:h},e().routes["flamarkt.product.summary"]={path:"/flamarkt/product-summary",component:y}}))})(),module.exports=t})();
//# sourceMappingURL=mithril2html.js.map