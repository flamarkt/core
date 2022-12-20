(()=>{var t={n:r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},d:(r,e)=>{for(var n in e)t.o(e,n)&&!t.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};(()=>{"use strict";t.r(r),t.d(r,{backoffice:()=>Ht,common:()=>I});const e=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{}).app;var n=t.n(e);const o=flarum.core.compat["common/Model"];var a=t.n(o);function i(t,r){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},i(t,r)}function s(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,i(t,r)}var c=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).number=a().attribute("number"),r.slug=a().attribute("slug"),r.productCount=a().attribute("productCount"),r.priceTotal=a().attribute("priceTotal"),r.paidAmount=a().attribute("paidAmount"),r.createdAt=a().attribute("createdAt",a().transformDate),r.isHidden=a().attribute("isHidden"),r.user=a().hasOne("user"),r.lines=a().hasMany("lines"),r.payments=a().hasMany("payments"),r}return s(r,t),r.prototype.apiEndpoint=function(){return"/flamarkt/orders"+(this.exists?"/"+this.data.id:"")},r}(a()),u=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).number=a().attribute("number"),r.group=a().attribute("group"),r.type=a().attribute("type"),r.label=a().attribute("label"),r.comment=a().attribute("comment"),r.quantity=a().attribute("quantity"),r.priceUnit=a().attribute("priceUnit"),r.priceTotal=a().attribute("priceTotal"),r.product=a().hasOne("product"),r}return s(r,t),r}(a()),l=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).method=a().attribute("method"),r.identifier=a().attribute("identifier"),r.amount=a().attribute("amount"),r.createdAt=a().attribute("createdAt",a().transformDate),r.isHidden=a().attribute("isHidden"),r}return s(r,t),r.prototype.apiEndpoint=function(){return"/flamarkt/payments"+(this.exists?"/"+this.data.id:"")},r}(a()),d=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).title=a().attribute("title"),r.slug=a().attribute("slug"),r.description=a().attribute("description"),r.descriptionHtml=a().attribute("descriptionHtml"),r.price=a().attribute("price"),r.priceEdit=a().attribute("priceEdit"),r.cartQuantity=a().attribute("cartQuantity"),r.isHidden=a().attribute("isHidden"),r.canOrder=a().attribute("canOrder"),r.canEdit=a().attribute("canEdit"),r}s(r,t);var e=r.prototype;return e.cartPriceTotalLocal=function(){return this.price&&this.cartQuantity?this.price()*this.cartQuantity():0},e.apiEndpoint=function(){return"/flamarkt/products"+(this.exists?"/"+this.data.id:"")},r}(a());const f=flarum.core.compat["common/Component"];var p=t.n(f),h=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.decimals=function(){return this.attrs.decimals||0},e.min=function(){return this.attrs.min},e.max=function(){return this.attrs.max},e.step=function(){return this.attrs.step},e.disabled=function(){return!!this.attrs.disabled},e.className=function(){return this.attrs.className||""},e.fromIntegerValue=function(t){return t/Math.pow(10,this.decimals())},e.toIntegerValue=function(t){return Math.round(t*Math.pow(10,this.decimals()))},e.inputAttrs=function(){var t=this,r={type:"number",value:this.fromIntegerValue(this.attrs.value)+"",onchange:function(r){var e=parseFloat(r.target.value);t.attrs.onchange(t.toIntegerValue(e))},disabled:this.disabled()},e=this.min();void 0!==e&&(r.min=this.fromIntegerValue(e));var n=this.max();void 0!==n&&(r.max=this.fromIntegerValue(n));var o=this.step();void 0!==o?r.step=this.fromIntegerValue(o):this.decimals()>0&&(r.step=1/Math.pow(10,this.decimals()));var a=this.className();return a&&(r.className=a),r},e.view=function(){return m("input.FormControl",this.inputAttrs())},r}(p()),y=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.decimals=function(){return this.attrs.decimals||0},e.fromIntegerValue=function(t){return t/Math.pow(10,this.decimals())},e.view=function(){return this.fromIntegerValue(this.attrs.value).toFixed(this.decimals())},r}(p());const b=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/AbstractSortDropdown"];var v=t.n(b),k=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.className=function(){return"OrderSortDropdown"},e.options=function(){return{"-createdAt":"Newest",createdAt:"Oldest","-priceTotal":"Highest total",priceTotal:"Lowest total"}},r}(v());const g=flarum.core.compat["common/app"];var w=t.n(g),O=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.decimals=function(){return w().forum.attribute("priceDecimals")},r}(h),x=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.decimals=function(){return w().forum.attribute("priceDecimals")},e.view=function(){return[t.prototype.view.call(this)," ",w().forum.attribute("priceUnit")]},r}(y),P=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.className=function(){return"ProductSortDropdown"},e.options=function(){return{"-createdAt":w().translator.trans("flamarkt-core.lib.sort.products.createdAtDesc"),createdAt:w().translator.trans("flamarkt-core.lib.sort.products.createdAtAsc"),price:w().translator.trans("flamarkt-core.lib.sort.products.priceAsc"),"-price":w().translator.trans("flamarkt-core.lib.sort.products.priceDesc"),title:w().translator.trans("flamarkt-core.lib.sort.products.titleAsc"),"-title":w().translator.trans("flamarkt-core.lib.sort.products.titleDesc")}},r}(v()),D=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r}(h),A=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r}(y),L=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).productCount=a().attribute("productCount"),r.priceTotal=a().attribute("priceTotal"),r.products=a().hasMany("products"),r}s(r,t);var e=r.prototype;return e.priceTotalLocal=function(){return(this.products()||[]).reduce((function(t,r){return t+(r?r.cartPriceTotalLocal():0)}),0)},e.apiEndpoint=function(){return"/flamarkt/carts"+(this.exists?"/"+this.data.id:"")},r}(a());const T=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["states/AbstractListState"];var C=t.n(T),S=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.type=function(){return"flamarkt/orders"},r}(C()),F=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.type=function(){return"flamarkt/products"},r}(C()),I={"components/DecimalInput":h,"components/DecimalLabel":y,"components/OrderSortDropdown":k,"components/PriceInput":O,"components/PriceLabel":x,"components/ProductSortDropdown":P,"components/QuantityInput":D,"components/QuantityLabel":A,"helpers/formatPrice":function(t){return t===parseInt(t)&&(t=(t/Math.pow(10,w().forum.attribute("priceDecimals"))).toFixed(w().forum.attribute("priceDecimals"))),[t," "+w().forum.attribute("priceUnit")]},"models/Cart":L,"models/Order":c,"models/OrderLine":u,"models/Payment":l,"models/Product":d,"states/OrderListState":S,"states/ProductListState":F};const E=flarum.core.compat["common/components/Modal"];var B=t.n(E);const N=flarum.core.compat["common/utils/ItemList"];var q=t.n(N);const M=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SubmitButton"];var U=t.n(M);const _=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/PermanentDeleteButton"];var H=t.n(_),R=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).payment=void 0,r.method="",r.identifier="",r.amount=0,r.dirty=!1,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),r.attrs.payment?(this.payment=r.attrs.payment,this.method=this.payment.method()||"",this.identifier=this.payment.identifier()||"",this.amount=this.payment.amount()||0):this.payment=n().store.createRecord("flamarkt-payments")},e.content=function(){return m(".Modal-body",this.fields().toArray())},e.fields=function(){var t=this,r=new(q());return r.add("method",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.field.method")),m("input.FormControl",{type:"text",value:this.method,oninput:function(r){t.method=r.target.value,t.dirty=!0},disabled:this.loading})]),30),r.add("identifier",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.field.identifier")),m("input.FormControl",{type:"text",value:this.identifier,oninput:function(r){t.identifier=r.target.value,t.dirty=!0},disabled:this.loading})]),20),r.add("amount",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.field.amount")),m(O,{value:this.amount,onchange:function(r){t.amount=r,t.dirty=!0},disabled:this.loading})]),10),r.add("submit",m(".Form-group",[U().component({loading:this.loading,dirty:this.dirty,exists:this.payment.exists})," ",H().component({model:this.payment,afterdelete:function(){n().modal.close()}})]),-10),r},e.data=function(){return{method:this.method||null,identifier:this.identifier||null,amount:this.amount}},e.onsubmit=function(t){var r=this;t.preventDefault(),this.loading=!0,this.payment.save(this.data()).then((function(t){r.payment=t,r.dirty=!1,r.loading=!1,m.redraw()}),this.loaded.bind(this))},r}(B());const V=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/SortableHandle"];var j=t.n(V);const Q=flarum.core.compat["common/components/Select"];var G=t.n(Q);const K=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/AbstractRelationshipSelect"];var z=t.n(K);const W=flarum.core.compat["common/helpers/highlight"];var J=t.n(W),X=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).resultsCache=new Map,r}s(r,t);var e=r.prototype;return e.search=function(t){var r=this;return t?n().store.find("flamarkt/products",{filter:{q:t},page:{limit:5}}).then((function(e){r.resultsCache.set(t,e),m.redraw()})):(m.redraw(),Promise.resolve())},e.results=function(t){if(!t)return[];t=t.toLowerCase();var r=this.resultsCache.get(t);return void 0===r?null:(r||[]).concat(n().store.all("flamarkt-products").filter((function(r){return r.title().toLowerCase().substr(0,t.length)===t}))).filter((function(t,r,e){return e.lastIndexOf(t)===r})).sort((function(t,r){return t.title().localeCompare(r.title())}))},e.item=function(t,r){return[r?J()(t.title(),r):t.title()]},r}(z());function Y(){return Y=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},Y.apply(this,arguments)}function Z(t,r){var e;return r?-1!==Object.keys(t).indexOf(r)?t:Y({},t,((e={})[r]=r,e)):t}const $={orderLineGroupOptions:function(){return{_none:"None",shipping:"Shipping"}},orderLineTypeOptions:function(){return{product:"Product",manual:"Manual"}}};var tt=function(){function t(){}var r=t.prototype;return r.view=function(t){var r=t.attrs,e=r.line,n=r.control,o=r.onchange,a=r.sortable,i=r.style,s=r.ondragstart;return m("tr",{style:i,"data-index":t.attrs["data-index"],ondragstart:s},this.columns(e,n,o,a).toArray())},r.columns=function(t,r,e,n){var o=new(q());return o.add("handle",m("td.OrderLineEdit-Handle",n?m(j()):null),100),o.add("group",m("td.OrderLineEdit-Group",G().component({value:null===t.group?"_none":t.group,onchange:function(r){t.group="_none"===r?null:r,e()},options:Z($.orderLineGroupOptions(),t.group)})),90),o.add("type",m("td.OrderLineEdit-Type",G().component({value:t.type,onchange:function(r){t.type=r,e()},options:Z($.orderLineTypeOptions(),t.type)})),80),o.add("info",m("td.OrderLineEdit-Info",this.fields(t,e).toArray()),30),o.add("priceUnit",m("td.OrderLineEdit-PriceUnit",m(O,{value:t.priceUnit,onchange:function(r){t.priceUnit=r,t.updateTotal(),e()},product:t.product})),-30),o.add("quantity",m("td.OrderLineEdit-Quantity",m(D,{value:t.quantity,onchange:function(r){t.quantity=r,t.updateTotal(),e()},product:t.product})),-60),o.add("priceTotal",m("td.OrderLineEdit-PriceTotal",m(x,{value:t.priceTotal,product:t.product})),-90),o.add("control",m("td.OrderLineEdit-Controls",r),-100),o},r.showInfoProduct=function(t){return"product"===t.type},r.showInfoLabel=function(t){return"manual"===t.type},r.showInfoComment=function(t){return"product"===t.type||"manual"===t.type},r.fields=function(t,r){var e=new(q());return this.showInfoProduct(t)&&e.add("product",m(".Form-group",[m("label","Product"),m(X,{relationship:t.product,onchange:function(e){t.product=e,r()},hasOne:!0})])),this.showInfoLabel(t)&&e.add("label",m(".Form-group",[m("label","Label"),m("input.FormControl",{type:"text",value:t.label,onchange:function(e){t.label=e.target.value,r()}})])),this.showInfoComment(t)&&e.add("comment",m(".Form-group",[m("label","Comment"),m("textarea.FormControl",{value:t.comment,onchange:function(e){t.comment=e.target.value,r()}})])),e},t}();const rt=flarum.core.compat["common/components/LinkButton"];var et=t.n(rt);const nt=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/AbstractList"];var ot=t.n(nt);const at=flarum.core.compat["common/helpers/username"];var it=t.n(at);const st=flarum.core.compat["common/helpers/humanTime"];var ct=t.n(st),ut=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.head=function(){var r=t.prototype.head.call(this);return r.add("number",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.number")),50),r.add("date",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.date")),40),r.add("user",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.user")),30),r.add("priceTotal",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.priceTotal")),20),r.add("paidAmount",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.paidAmount")),10),r.add("productCount",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.productCount")),5),r},e.columns=function(r){var e=t.prototype.columns.call(this,r);return e.add("number",m("td",r.number()),50),e.add("date",m("td",ct()(r.createdAt())),40),e.add("user",m("td",it()(r.user())),30),e.add("priceTotal",m("td",m(x,{value:r.priceTotal()})),20),e.add("paidAmount",m("td",m(x,{value:r.paidAmount()})),10),e.add("productCount",m("td",r.productCount()),5),e},e.actions=function(r){var e=t.prototype.actions.call(this,r);return e.add("edit",et().component({className:"Button Button--icon",icon:"fas fa-pen",href:n().route.order(r)})),e},r}(ot()),lt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).resultsCache=new Map,r}s(r,t);var e=r.prototype;return e.search=function(t){var r=this;return t?n().store.find("flamarkt/orders",{filter:{q:t},page:{limit:5}}).then((function(e){r.resultsCache.set(t,e),m.redraw()})):(m.redraw(),Promise.resolve())},e.results=function(t){if(!t)return[];t=t.toLowerCase();var r=this.resultsCache.get(t);return void 0===r?null:r||[]},e.item=function(t,r){return[r?J()(t.number(),r):t.number()]},r}(z());const dt=flarum.core.compat["common/components/Button"];var mt=t.n(dt),ft=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.head=function(){var r=t.prototype.head.call(this);return r.add("date",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.date")),40),r.add("method",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.method")),30),r.add("identifier",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.identifier")),20),r.add("amount",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.amount")),10),r},e.columns=function(r){var e=t.prototype.columns.call(this,r);return e.add("date",m("td",ct()(r.createdAt())),40),e.add("method",m("td",r.method()),30),e.add("identifier",m("td",r.identifier()),20),e.add("amount",m("td",m(x,{value:r.amount()})),10),e},e.actions=function(r){var e=t.prototype.actions.call(this,r);return e.add("edit",mt().component({className:"Button Button--icon",icon:"fas fa-pen",onclick:function(){n().modal.show(R,{payment:r})}})),e},r}(ot()),pt=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.head=function(){var r=t.prototype.head.call(this);return r.add("title",m("th",n().translator.trans("flamarkt-core.backoffice.products.head.title")),10),r},e.columns=function(r){var e=t.prototype.columns.call(this,r);return e.add("title",m("td",r.title()),10),e},e.actions=function(r){var e=t.prototype.actions.call(this,r);return e.add("edit",et().component({className:"Button Button--icon",icon:"fas fa-pen",href:n().route.product(r)})),e},r}(ot());const ht=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SearchInput"];var yt=t.n(ht);const bt=flarum.core.compat["common/components/Page"];var vt=t.n(bt);const kt=flarum.core.compat["common/utils/extractText"];var gt=t.n(kt),wt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).list=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.list=this.initState(),this.list.refresh(),n().setTitle(gt()(n().translator.trans("flamarkt-core.backoffice.orders.title"))),n().setTitleCount(0)},e.initState=function(){var t=m.route.param(),r={sort:t.sort};return t.user&&(r.filter=r.filter||{},r.filter.user=t.user),new S(r)},e.filters=function(){var t=this,r=new(q());return r.add("sort",m(k,{list:this.list}),100),r.add("search",m(yt(),{initialValue:"",onchange:function(r){t.list.params.q=r,t.list.refresh()},placeholder:gt()(n().translator.trans("flamarkt-core.backoffice.orders.searchPlaceholder"))}),50),r.add("separator",m(".BackofficeListFilters--separator"),-10),r.add("new",et().component({className:"Button",href:n().route("orders.show",{id:"new"})},n().translator.trans("flamarkt-core.backoffice.orders.new")),-100),r},e.view=function(){return m(".OrderIndexPage",m(".container",[m(".BackofficeListFilters",this.filters().toArray()),m(ut,{list:this.list})]))},r}(vt());const Ot=flarum.core.compat["common/components/LoadingIndicator"];var xt=t.n(Ot);const Pt=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["pages/AbstractShowPage"];var Dt=t.n(Pt);const At=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/Sortable"];var Lt=t.n(At);const Tt=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/UserRelationshipSelect"];var Ct=t.n(Tt),St=0,Ft=function(){function t(){this.uniqueFormKey=void 0,this.line=void 0,this.group=null,this.type=null,this.label="",this.comment="",this.quantity=0,this.priceUnit=0,this.priceTotal=0,this.product=null,this.uniqueFormKey=++St+""}var r=t.prototype;return r.init=function(t){this.line=t,this.group=t.group()||null,this.type=t.type()||null,this.label=t.label()||"",this.comment=t.comment()||"",this.quantity=t.quantity()||0,this.priceUnit=t.priceUnit()||0,this.priceTotal=t.priceTotal()||0,this.product=t.product()||null},r.updateTotal=function(){this.priceTotal=this.quantity*this.priceUnit},r.data=function(){var t={attributes:{group:this.group,type:this.type,label:this.label,comment:this.comment,quantity:this.quantity,priceUnit:this.priceUnit},relationships:{product:{data:a().getIdentifier(this.product)}}};return this.line&&(t.id=this.line.id()),t},t}();const It=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SoftDeleteButton"];var Et=t.n(It),Bt=function(t){function r(r){var e;e=t.call(this)||this;var n=r.payments();return e.loading=!1,e.pages=[new T.Page(1,n||[])],e}return s(r,t),r.prototype.type=function(){return"flamarkt-payments"},r}(C()),Nt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).order=null,r.user=null,r.lines=[],r.saving=!1,r.dirty=!1,r.newLine=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.initNewLine()},e.initNewLine=function(){this.newLine=new Ft},e.initLineState=function(t){var r=new Ft;return r.init(t),r},e.newRecord=function(){return n().store.createRecord("flamarkt-orders")},e.findType=function(){return"flamarkt/orders"},e.show=function(t){this.order=t,this.user=t.user()||null,this.lines=(t.lines()||[]).map(this.initLineState.bind(this)),n().setTitleCount(0)},e.view=function(){return this.order?m("form.OrderShowPage",{onsubmit:this.onsubmit.bind(this)},m(".container.container--narrow",this.fields().toArray())):xt().component()},e.fields=function(){var t=this,r=new(q());return r.add("number",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.orders.field.number")),m("input.FormControl",{value:this.order.number(),readonly:!0})]),30),r.add("user",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.orders.field.user")),m(Ct(),{relationship:this.user,onchange:function(r){t.user=r,t.dirty=!0},hasOne:!0})]),20),r.add("lines",m("table.OrderComposerTable",[m("thead",m("tr",this.tableHead().toArray())),m(Lt(),{containerTag:"tbody",placeholderTag:"tr",onsort:function(r,e){var n;(n=t.lines).splice.apply(n,[e,0].concat(t.lines.splice(r,1))),t.dirty=!0}},this.lines.map((function(r,e){return m(tt,{key:r.uniqueFormKey,line:r,sortable:!0,control:mt().component({icon:"fas fa-times",className:"Button Button--icon Button--delete",onclick:function(){t.lines.splice(e,1),t.dirty=!0},title:n().translator.trans("flamarkt-core.backoffice.orders.lines.control.delete")}),onchange:function(){t.dirty=!0}})}))),m("tbody",m(tt,{key:"new",line:this.newLine,control:mt().component({icon:"fas fa-plus",className:"Button Button--icon",onclick:function(){t.lines.push(t.newLine),t.dirty=!0,t.initNewLine()},title:n().translator.trans("flamarkt-core.backoffice.orders.lines.control.add")}),onchange:function(){t.dirty=!0}}))]),10),r.add("submit",m(".Form-group",[U().component({loading:this.saving,dirty:this.dirty,exists:this.order.exists})," ",Et().component({model:this.order})," ",H().component({model:this.order,afterdelete:function(){m.route.set(n().route("orders.index"))}})]),-10),r.add("payments",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.title")),m(ft,{state:new Bt(this.order)})]),-20),r},e.tableHead=function(){var t=new(q());return t.add("handle",m("th"),100),t.add("group",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.group")),90),t.add("type",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.type")),80),t.add("info",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.info")),30),t.add("priceUnit",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.priceUnit")),-30),t.add("quantity",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.quantity")),-60),t.add("priceTotal",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.priceTotal")),-90),t.add("control",m("th"),-100),t},e.data=function(){return{relationships:{lines:this.lines.map((function(t){return Y({verbatim:!0,type:"flamarkt-product-lines"},t.data())})),user:this.user}}},e.onsubmit=function(t){var r,e=this;t.preventDefault(),this.saving=!0,this.saveThroughNewRecord(null==(r=this.order)?void 0:r.id(),this.data()).then((function(t){e.order=t,e.saving=!1,e.dirty=!1,m.redraw(),m.route.set(n().route.order(t))})).catch((function(t){e.saving=!1,m.redraw()}))},r}(Dt()),qt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).list=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.list=this.initState(),this.list.refresh(),n().setTitle(gt()(n().translator.trans("flamarkt-core.backoffice.products.title"))),n().setTitleCount(0)},e.initState=function(){var t=m.route.param();return new F({sort:t.sort})},e.filters=function(){var t=this,r=new(q());return r.add("sort",m(P,{list:this.list}),100),r.add("search",m(yt(),{initialValue:"",onchange:function(r){t.list.params.q=r,t.list.refresh()},placeholder:gt()(n().translator.trans("flamarkt-core.backoffice.products.searchPlaceholder"))}),50),r.add("separator",m(".BackofficeListFilters--separator"),-10),r.add("new",et().component({className:"Button",href:n().route("products.show",{id:"new"})},n().translator.trans("flamarkt-core.backoffice.products.new")),-100),r},e.view=function(){return m(".ProductIndexPage",m(".container",[m(".BackofficeListFilters",this.filters().toArray()),m(pt,{list:this.list})]))},r}(vt());const Mt=flarum.core.compat["common/components/TextEditor"];var Ut=t.n(Mt),_t=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).product=null,r.saving=!1,r.dirty=!1,r.title="",r.description="",r.price=0,r.availabilityDriver=null,r.priceDriver=null,r.composer={editor:null},r}s(r,t);var e=r.prototype;return e.newRecord=function(){return n().store.createRecord("flamarkt-products",{attributes:{}})},e.findType=function(){return"flamarkt/products"},e.show=function(t){this.product=t,this.title=t.title()||"",this.description=t.description()||"",this.price=t.priceEdit()||0,this.availabilityDriver=t.attribute("availabilityDriver"),this.priceDriver=t.attribute("priceDriver"),n().setTitle(t.title()),n().setTitleCount(0)},e.view=function(){return this.product?m("form.ProductShowPage",{onsubmit:this.onsubmit.bind(this)},m(".container.container--narrow",this.fields().toArray())):xt().component()},e.fields=function(){var t=this,r=new(q());return n().composer=this.composer,r.add("title",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.title")),m("input.FormControl",{type:"text",value:this.title,oninput:function(r){t.title=r.target.value,t.dirty=!0},disabled:this.saving})]),50),r.add("description",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.description")),m(".FormControl.FormControl--editor",Ut().component({value:this.description,onchange:function(r){t.description=r,t.dirty=!0,m.redraw()},disabled:this.saving,composer:this.composer}))]),40),r.add("price",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.price")),m(O,{value:this.price,onchange:function(r){t.price=r,t.dirty=!0},disabled:this.saving})]),30),r.add("availabilityDriver",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.availabilityDriver")),G().component({value:this.availabilityDriver||"_default",options:this.availabilityDriverOptions(),onchange:function(r){t.availabilityDriver="_default"===r?null:r,t.dirty=!0}})]),20),r.add("priceDriver",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.priceDriver")),G().component({value:this.priceDriver||"_default",options:this.priceDriverOptions(),onchange:function(r){t.priceDriver="_default"===r?null:r,t.dirty=!0}})]),10),r.add("submit",m(".Form-group",[U().component({loading:this.saving,dirty:this.dirty,exists:this.product.exists})," ",Et().component({model:this.product})," ",H().component({model:this.product,afterdelete:function(){m.route.set(n().route("products.index"))}})]),-10),r},e.availabilityDriverOptions=function(){var t={_default:"Default"};return(n().forum.attribute("flamarktAvailabilityDrivers")||[]).forEach((function(r){t[r]=r})),t},e.priceDriverOptions=function(){var t={_default:"Default"};return(n().forum.attribute("flamarktPriceDrivers")||[]).forEach((function(r){t[r]=r})),t},e.data=function(){return{title:this.title,description:this.description,price:this.price,availabilityDriver:this.availabilityDriver,priceDriver:this.priceDriver}},e.onsubmit=function(t){var r,e=this;t.preventDefault(),this.saving=!0,this.saveThroughNewRecord(null==(r=this.product)?void 0:r.id(),this.data()).then((function(t){e.product=t,e.saving=!1,e.dirty=!1,m.redraw(),m.route.set(n().route.product(t))})).catch((function(t){throw e.saving=!1,m.redraw(),t}))},r}(Dt()),Ht={"components/EditPaymentModal":R,"components/OrderLineEdit":tt,"components/OrderList":ut,"components/OrderRelationshipSelect":lt,"components/PaymentList":ft,"components/ProductList":pt,"components/ProductRelationshipSelect":X,"pages/OrderIndexPage":wt,"pages/OrderShowPage":Nt,"pages/ProductIndexPage":qt,"pages/ProductShowPage":_t,"states/OrderLineEditState":Ft,"states/PaymentListPassthroughState":Bt,"utils/augmentOptionsWithValue":Z,"utils/OrderLineOptions":$};const Rt=flarum.core.compat["common/extend"],Vt=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/BackofficeNav"];var jt=t.n(Vt);const Qt=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/ActiveLinkButton"];var Gt=t.n(Qt);n().initializers.add("flamarkt-core",(function(){n().store.models["flamarkt-orders"]=c,n().store.models["flamarkt-order-lines"]=u,n().store.models["flamarkt-payments"]=l,n().store.models["flamarkt-products"]=d,n().store.models.users.prototype.flamarktOrderCount=a().attribute("flamarktOrderCount"),n().routes["products.index"]={path:"/products",component:qt},n().routes["products.show"]={path:"/products/:id",component:_t},n().routes["orders.index"]={path:"/orders",component:wt},n().routes["orders.show"]={path:"/orders/:id",component:Nt},n().route.product=function(t){return n().route("products.show",{id:t.id()})},n().route.order=function(t){return n().route("orders.show",{id:t.id()})},(0,Rt.extend)(jt().prototype,"items",(function(t){t.add("products",Gt().component({href:n().route("products.index"),icon:"fas fa-box",activeRoutes:["products.*"]},n().translator.trans("flamarkt-core.backoffice.nav.products")),40),t.add("orders",Gt().component({href:n().route("orders.index"),icon:"fas fa-shopping-cart",activeRoutes:["orders.*"]},n().translator.trans("flamarkt-core.backoffice.nav.orders")),20)})),n().extensionData.for("flamarkt-core").registerSetting((function(){var t={};return(n().forum.attribute("flamarktAvailabilityDrivers")||[]).forEach((function(r){t[r]=r})),m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.settings.defaultAvailabilityDriver")),G().component({value:this.setting("flamarkt.defaultAvailabilityDriver")()||"never",options:t,onchange:this.setting("flamarkt.defaultAvailabilityDriver")})])})).registerSetting((function(){var t={};return(n().forum.attribute("flamarktPriceDrivers")||[]).forEach((function(r){t[r]=r})),m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.settings.defaultPriceDriver")),G().component({value:this.setting("flamarkt.defaultPriceDriver")()||"fixed",options:t,onchange:this.setting("flamarkt.defaultPriceDriver")})])})).registerSetting({type:"switch",setting:"flamarkt.forceOrderPrepayment",label:n().translator.trans("flamarkt-core.backoffice.settings.forceOrderPrepayment")}).registerPermission({icon:"fas fa-shopping-cart",label:n().translator.trans("flamarkt-core.backoffice.permissions.shop"),permission:"flamarkt.shop",allowGuest:!0},"reply").registerPermission({icon:"fas fa-wrench",label:n().translator.trans("flamarkt-core.backoffice.permissions.backoffice"),permission:"backoffice"},"moderate")}))})(),module.exports=r})();
//# sourceMappingURL=backoffice.js.map