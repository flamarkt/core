module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=30)}({27:function(e,t){e.exports=flarum.core.compat["admin/components/ExtensionPage"]},28:function(e,t){e.exports=flarum.core.compat["admin/components/BasicsPage"]},30:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n(27),a=n.n(o),i=n(28),c=n.n(i);app.initializers.add("flamarkt-core",(function(){Object(r.override)(a.a.prototype,"content",(function(e){return this.extension.extra["flamarkt-backoffice"]&&this.extension.extra["flamarkt-backoffice"].settingsInBackoffice?m(".ExtensionPage-settings",m(".container",m(".Form-group",m("a.Button",{href:"/backoffice/extension/"+this.extension.id},app.translator.trans("flamarkt-core.admin.settingsInBackoffice"))))):e()})),Object(r.extend)(c.a.prototype,"homePageItems",(function(e){e.add("flamarkt-products",{path:"/products",label:app.translator.trans("flamarkt-core.admin.homepage.products")})}))}))},5:function(e,t){e.exports=flarum.core.compat["common/extend"]}});
//# sourceMappingURL=admin.js.map