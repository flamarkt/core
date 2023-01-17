(()=>{var t={n:r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},d:(r,e)=>{for(var n in e)t.o(e,n)&&!t.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},o:(t,r)=>Object.prototype.hasOwnProperty.call(t,r),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};(()=>{"use strict";t.r(r),t.d(r,{backoffice:()=>Qt,common:()=>N});const e=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{}).app;var n=t.n(e);const o=flarum.core.compat["common/Model"];var a=t.n(o);function i(t,r){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,r){return t.__proto__=r,t},i(t,r)}function s(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,i(t,r)}const c=flarum.core.compat["common/Component"];var u=t.n(c);const l=flarum.core.compat["common/utils/classList"];var d=t.n(l),f=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).hasFocus=!1,r}s(r,t);var e=r.prototype;return e.decimals=function(){return this.attrs.decimals||0},e.min=function(){return this.attrs.min},e.max=function(){return this.attrs.max},e.step=function(){return this.attrs.step},e.disabled=function(){return!!this.attrs.disabled},e.readonly=function(){return!!this.attrs.readonly},e.className=function(){return[{focused:this.hasFocus},this.attrs.className]},e.fromIntegerValue=function(t){return t/Math.pow(10,this.decimals())},e.toIntegerValue=function(t){return Math.round(t*Math.pow(10,this.decimals()))},e.inputAttrs=function(){var t=this,r={type:"number",value:this.fromIntegerValue(this.attrs.value)+"",onchange:function(r){var e=parseFloat(r.target.value);t.attrs.onchange(t.toIntegerValue(e))},onfocus:function(){t.hasFocus=!0},onblur:function(){t.hasFocus=!1},disabled:this.disabled(),readonly:this.readonly()},e=this.min();void 0!==e&&(r.min=this.fromIntegerValue(e));var n=this.max();void 0!==n&&(r.max=this.fromIntegerValue(n));var o=this.step();return void 0!==o?r.step=this.fromIntegerValue(o):this.decimals()>0&&(r.step=1/Math.pow(10,this.decimals())),r},e.unitLabel=function(){return""},e.view=function(){var t=this,r=this.unitLabel();return m(".FlamarktDecimalInput.FormControl",{className:d()(this.className())},[m("input",this.inputAttrs()),r?m(".FlamarktDecimalInputUnit",{onclick:function(){t.$("input").focus()}},r):null])},r}(u()),p=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.decimals=function(){return this.attrs.decimals||0},e.fromIntegerValue=function(t){return t/Math.pow(10,this.decimals())},e.view=function(){return this.fromIntegerValue(this.attrs.value).toFixed(this.decimals())},r}(u());const h=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/AbstractSortDropdown"];var y=t.n(h),b=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.className=function(){return"OrderSortDropdown"},e.options=function(){return{"-createdAt":"Newest",createdAt:"Oldest","-priceTotal":"Highest total",priceTotal:"Lowest total"}},r}(y());const v=flarum.core.compat["common/app"];var k=t.n(v),g=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.decimals=function(){return k().forum.attribute("priceDecimals")},e.className=function(){return["FlamarktPriceInput"].concat(t.prototype.className.call(this))},e.unitLabel=function(){return k().forum.attribute("priceUnit")},r}(f),w=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.decimals=function(){return k().forum.attribute("priceDecimals")},e.view=function(){return[t.prototype.view.call(this)," ",k().forum.attribute("priceUnit")]},r}(p),D=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.className=function(){return"ProductSortDropdown"},e.options=function(){return{"-createdAt":k().translator.trans("flamarkt-core.lib.sort.products.createdAtDesc"),createdAt:k().translator.trans("flamarkt-core.lib.sort.products.createdAtAsc"),price:k().translator.trans("flamarkt-core.lib.sort.products.priceAsc"),"-price":k().translator.trans("flamarkt-core.lib.sort.products.priceDesc"),title:k().translator.trans("flamarkt-core.lib.sort.products.titleAsc"),"-title":k().translator.trans("flamarkt-core.lib.sort.products.titleDesc")}},r}(y()),O=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r}(f),P=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r}(p),x=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).productCount=a().attribute("productCount"),r.priceTotal=a().attribute("priceTotal"),r.products=a().hasMany("products"),r}s(r,t);var e=r.prototype;return e.priceTotalLocal=function(){return(this.products()||[]).reduce((function(t,r){return t+(r?r.cartPriceTotalLocal():0)}),0)},e.apiEndpoint=function(){return"/flamarkt/carts"+(this.exists?"/"+this.data.id:"")},r}(a());const A={defaultFormat:function(){return"YYYY-MM-DD"},orderDayFormat:function(){return this.defaultFormat()},paymentDayFormat:function(){return this.defaultFormat()}};var L=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).number=a().attribute("number"),r.slug=a().attribute("slug"),r.productCount=a().attribute("productCount"),r.priceTotal=a().attribute("priceTotal"),r.paidAmount=a().attribute("paidAmount"),r.createdAt=a().attribute("createdAt",a().transformDate),r.isHidden=a().attribute("isHidden"),r.user=a().hasOne("user"),r.lines=a().hasMany("lines"),r.payments=a().hasMany("payments"),r}s(r,t);var e=r.prototype;return e.titleDate=function(){var t=this.createdAt();return t?dayjs(t).format(A.orderDayFormat()):"<not dated>"},e.apiEndpoint=function(){return"/flamarkt/orders"+(this.exists?"/"+this.data.id:"")},r}(a()),T=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).number=a().attribute("number"),r.group=a().attribute("group"),r.type=a().attribute("type"),r.label=a().attribute("label"),r.comment=a().attribute("comment"),r.quantity=a().attribute("quantity"),r.priceUnit=a().attribute("priceUnit"),r.priceTotal=a().attribute("priceTotal"),r.product=a().hasOne("product"),r}return s(r,t),r}(a()),F=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).method=a().attribute("method"),r.identifier=a().attribute("identifier"),r.amount=a().attribute("amount"),r.createdAt=a().attribute("createdAt",a().transformDate),r.isHidden=a().attribute("isHidden"),r}return s(r,t),r.prototype.apiEndpoint=function(){return"/flamarkt/payments"+(this.exists?"/"+this.data.id:"")},r}(a()),S=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).title=a().attribute("title"),r.slug=a().attribute("slug"),r.description=a().attribute("description"),r.descriptionHtml=a().attribute("descriptionHtml"),r.price=a().attribute("price"),r.priceEdit=a().attribute("priceEdit"),r.cartQuantity=a().attribute("cartQuantity"),r.isHidden=a().attribute("isHidden"),r.canOrder=a().attribute("canOrder"),r.canEdit=a().attribute("canEdit"),r}s(r,t);var e=r.prototype;return e.cartPriceTotalLocal=function(){return this.price&&this.cartQuantity?this.price()*this.cartQuantity():0},e.apiEndpoint=function(){return"/flamarkt/products"+(this.exists?"/"+this.data.id:"")},r}(a());const C=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["states/AbstractListState"];var I=t.n(C),B=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.type=function(){return"flamarkt/orders"},r}(I()),E=function(t){function r(){return t.apply(this,arguments)||this}return s(r,t),r.prototype.type=function(){return"flamarkt/products"},r}(I()),N={"components/DecimalInput":f,"components/DecimalLabel":p,"components/OrderSortDropdown":b,"components/PriceInput":g,"components/PriceLabel":w,"components/ProductSortDropdown":D,"components/QuantityInput":O,"components/QuantityLabel":P,"helpers/formatPrice":function(t){return t===parseInt(t)&&(t=(t/Math.pow(10,k().forum.attribute("priceDecimals"))).toFixed(k().forum.attribute("priceDecimals"))),[t," "+k().forum.attribute("priceUnit")]},"models/Cart":x,"models/Order":L,"models/OrderLine":T,"models/Payment":F,"models/Product":S,"states/OrderListState":B,"states/ProductListState":E};const M=flarum.core.compat["common/components/Modal"];var q=t.n(M);const U=flarum.core.compat["common/utils/ItemList"];var _=t.n(U);const R=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SubmitButton"];var H=t.n(R);const j=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/PermanentDeleteButton"];var V=t.n(j),Q=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).payment=void 0,r.method="",r.identifier="",r.amount=0,r.dirty=!1,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),r.attrs.payment?(this.payment=r.attrs.payment,this.method=this.payment.method()||"",this.identifier=this.payment.identifier()||"",this.amount=this.payment.amount()||0):this.payment=n().store.createRecord("flamarkt-payments")},e.content=function(){return m(".Modal-body",this.fields().toArray())},e.fields=function(){var t=this,r=new(_());return r.add("method",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.field.method")),m("input.FormControl",{type:"text",value:this.method,oninput:function(r){t.method=r.target.value,t.dirty=!0},disabled:this.loading})]),30),r.add("identifier",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.field.identifier")),m("input.FormControl",{type:"text",value:this.identifier,oninput:function(r){t.identifier=r.target.value,t.dirty=!0},disabled:this.loading})]),20),r.add("amount",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.payments.field.amount")),m(g,{value:this.amount,onchange:function(r){t.amount=r,t.dirty=!0},disabled:this.loading})]),10),r.add("submit",m(".Form-group",[H().component({loading:this.loading,dirty:this.dirty,exists:this.payment.exists})," ",V().component({model:this.payment,afterdelete:function(){n().modal.close()}})]),-10),r},e.data=function(){return{method:this.method||null,identifier:this.identifier||null,amount:this.amount}},e.onsubmit=function(t){var r=this;t.preventDefault(),this.loading=!0,this.payment.save(this.data()).then((function(t){r.payment=t,r.dirty=!1,r.loading=!1,m.redraw()}),this.loaded.bind(this))},r}(q());const G=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/SortableHandle"];var Y=t.n(G);const K=flarum.core.compat["common/components/Select"];var z=t.n(K);const W=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/AbstractRelationshipSelect"];var $=t.n(W);const J=flarum.core.compat["common/helpers/highlight"];var X=t.n(J),Z=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).resultsCache=new Map,r}s(r,t);var e=r.prototype;return e.search=function(t){var r=this;return t?n().store.find("flamarkt/products",{filter:{q:t},page:{limit:5}}).then((function(e){r.resultsCache.set(t,e),m.redraw()})):(m.redraw(),Promise.resolve())},e.results=function(t){if(!t)return[];t=t.toLowerCase();var r=this.resultsCache.get(t);return void 0===r?null:(r||[]).concat(n().store.all("flamarkt-products").filter((function(r){return r.title().toLowerCase().substr(0,t.length)===t}))).filter((function(t,r,e){return e.lastIndexOf(t)===r})).sort((function(t,r){return t.title().localeCompare(r.title())}))},e.item=function(t,r){return[r?X()(t.title(),r):t.title()]},r}($());function tt(){return tt=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},tt.apply(this,arguments)}function rt(t,r){var e;return r?-1!==Object.keys(t).indexOf(r)?t:tt({},t,((e={})[r]=r,e)):t}const et={orderLineGroupOptions:function(){return{_none:"None",shipping:"Shipping"}},orderLineTypeOptions:function(){return{product:"Product",manual:"Manual"}}};var nt=function(){function t(){}var r=t.prototype;return r.view=function(t){var r=t.attrs,e=r.line,n=r.control,o=r.onchange,a=r.sortable,i=r.style,s=r.ondragstart;return m("tr",{style:i,"data-index":t.attrs["data-index"],ondragstart:s},this.columns(e,n,o,a).toArray())},r.columns=function(t,r,e,n){var o=new(_());return o.add("handle",m("td.OrderLineEdit-Handle",n?m(Y()):null),100),o.add("group",m("td.OrderLineEdit-Group",z().component({value:null===t.group?"_none":t.group,onchange:function(r){t.group="_none"===r?null:r,e()},options:rt(et.orderLineGroupOptions(),t.group)})),90),o.add("type",m("td.OrderLineEdit-Type",z().component({value:t.type,onchange:function(r){t.type=r,e()},options:rt(et.orderLineTypeOptions(),t.type)})),80),o.add("info",m("td.OrderLineEdit-Info",this.fields(t,e).toArray()),30),o.add("priceUnit",m("td.OrderLineEdit-PriceUnit",m(g,{value:t.priceUnit,onchange:function(r){t.priceUnit=r,t.updateTotal(),e()},product:t.product})),-30),o.add("quantity",m("td.OrderLineEdit-Quantity",m(O,{value:t.quantity,onchange:function(r){t.quantity=r,t.updateTotal(),e()},product:t.product})),-60),o.add("priceTotal",m("td.OrderLineEdit-PriceTotal",m(w,{value:t.priceTotal,product:t.product})),-90),o.add("control",m("td.OrderLineEdit-Controls",r),-100),o},r.showInfoProduct=function(t){return"product"===t.type},r.showInfoLabel=function(t){return"manual"===t.type},r.showInfoComment=function(t){return"product"===t.type||"manual"===t.type},r.fields=function(t,r){var e=new(_());return this.showInfoProduct(t)&&e.add("product",m(".Form-group",[m("label","Product"),m(Z,{relationship:t.product,onchange:function(e){t.product=e,r()},hasOne:!0})])),this.showInfoLabel(t)&&e.add("label",m(".Form-group",[m("label","Label"),m("input.FormControl",{type:"text",value:t.label,onchange:function(e){t.label=e.target.value,r()}})])),this.showInfoComment(t)&&e.add("comment",m(".Form-group",[m("label","Comment"),m("textarea.FormControl",{value:t.comment,onchange:function(e){t.comment=e.target.value,r()}})])),e},t}();const ot=flarum.core.compat["common/components/LinkButton"];var at=t.n(ot);const it=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/AbstractList"];var st=t.n(it);const ct=flarum.core.compat["common/helpers/username"];var ut=t.n(ct);const lt=flarum.core.compat["common/helpers/humanTime"];var dt=t.n(lt),mt=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.head=function(){var r=t.prototype.head.call(this);return r.add("number",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.number")),50),r.add("date",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.date")),40),r.add("user",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.user")),30),r.add("priceTotal",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.priceTotal")),20),r.add("paidAmount",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.paidAmount")),10),r.add("productCount",m("th",n().translator.trans("flamarkt-core.backoffice.orders.head.productCount")),5),r},e.columns=function(r){var e=t.prototype.columns.call(this,r);return e.add("number",m("td",r.number()),50),e.add("date",m("td",dt()(r.createdAt())),40),e.add("user",m("td",ut()(r.user())),30),e.add("priceTotal",m("td",m(w,{value:r.priceTotal()})),20),e.add("paidAmount",m("td",m(w,{value:r.paidAmount()})),10),e.add("productCount",m("td",r.productCount()),5),e},e.actions=function(r){var e=t.prototype.actions.call(this,r);return e.add("edit",at().component({className:"Button Button--icon",icon:"fas fa-pen",href:n().route.order(r)})),e},r}(st());const ft=flarum.core.compat["common/components/Button"];var pt=t.n(ft),ht=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.head=function(){var r=t.prototype.head.call(this);return r.add("date",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.date")),40),r.add("method",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.method")),30),r.add("identifier",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.identifier")),20),r.add("amount",m("th",n().translator.trans("flamarkt-core.backoffice.payments.head.amount")),10),r},e.columns=function(r){var e=t.prototype.columns.call(this,r);return e.add("date",m("td",dt()(r.createdAt())),40),e.add("method",m("td",r.method()),30),e.add("identifier",m("td",r.identifier()),20),e.add("amount",m("td",m(w,{value:r.amount()})),10),e},e.actions=function(r){var e=t.prototype.actions.call(this,r);return e.add("edit",pt().component({className:"Button Button--icon",icon:"fas fa-pen",onclick:function(){n().modal.show(Q,{payment:r})}})),e},r}(st()),yt=function(t){function r(r){var e;e=t.call(this)||this;var n=r.payments();return e.loading=!1,e.pages=[new C.Page(1,n||[])],e}return s(r,t),r.prototype.type=function(){return"flamarkt-payments"},r}(I()),bt=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.view=function(){return m(".OrderPaymentSection",this.fields().toArray())},e.fields=function(){var t=new(_()),r=this.attrs.order;return t.add("title",m("h3",n().translator.trans("flamarkt-core.backoffice.payments.title")),100),t.add("totals",m(".Form-group.OrderPaymentSectionTotals",["Due: ",m(w,{value:r.priceTotal()})," / Paid: ",m(w,{value:r.paidAmount()})]),100),t.add("payments",m(".Form-group",[m(ht,{state:new yt(r)})]),0),t},r}(u()),vt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).resultsCache=new Map,r}s(r,t);var e=r.prototype;return e.search=function(t){var r=this;return t?n().store.find("flamarkt/orders",{filter:{q:t},page:{limit:5}}).then((function(e){r.resultsCache.set(t,e),m.redraw()})):(m.redraw(),Promise.resolve())},e.results=function(t){if(!t)return[];t=t.toLowerCase();var r=this.resultsCache.get(t);return void 0===r?null:r||[]},e.item=function(t,r){return[r?X()(t.number(),r):t.number()]},r}($()),kt=function(t){function r(){return t.apply(this,arguments)||this}s(r,t);var e=r.prototype;return e.head=function(){var r=t.prototype.head.call(this);return r.add("title",m("th",n().translator.trans("flamarkt-core.backoffice.products.head.title")),10),r},e.columns=function(r){var e=t.prototype.columns.call(this,r);return e.add("title",m("td",r.title()),10),e},e.actions=function(r){var e=t.prototype.actions.call(this,r);return e.add("edit",at().component({className:"Button Button--icon",icon:"fas fa-pen",href:n().route.product(r)})),e},r}(st());const gt=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SearchInput"];var wt=t.n(gt);const Dt=flarum.core.compat["common/components/Page"];var Ot=t.n(Dt);const Pt=flarum.core.compat["common/utils/extractText"];var xt=t.n(Pt),At=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).list=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.list=this.initState(),this.list.refresh(),n().setTitle(xt()(n().translator.trans("flamarkt-core.backoffice.orders.title"))),n().setTitleCount(0)},e.initState=function(){var t=m.route.param(),r={sort:t.sort};return t.user&&(r.filter=r.filter||{},r.filter.user=t.user),new B(r)},e.filters=function(){var t=this,r=new(_());return r.add("sort",m(b,{list:this.list}),100),r.add("search",m(wt(),{initialValue:"",onchange:function(r){t.list.params.q=r,t.list.refresh()},placeholder:xt()(n().translator.trans("flamarkt-core.backoffice.orders.searchPlaceholder"))}),50),r.add("separator",m(".BackofficeListFilters--separator"),-10),r.add("new",at().component({className:"Button",href:n().route("orders.show",{id:"new"})},n().translator.trans("flamarkt-core.backoffice.orders.new")),-100),r},e.view=function(){return m(".OrderIndexPage",m(".container",[m(".BackofficeListFilters",this.filters().toArray()),m(mt,{list:this.list})]))},r}(Ot());const Lt=flarum.core.compat["common/components/LoadingIndicator"];var Tt=t.n(Lt);const Ft=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["pages/AbstractShowPage"];var St=t.n(Ft);const Ct=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/Sortable"];var It=t.n(Ct);const Bt=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/UserRelationshipSelect"];var Et=t.n(Bt),Nt=0,Mt=function(){function t(){this.uniqueFormKey=void 0,this.line=void 0,this.group=null,this.type=null,this.label="",this.comment="",this.quantity=0,this.priceUnit=0,this.priceTotal=0,this.product=null,this.uniqueFormKey=++Nt+""}var r=t.prototype;return r.init=function(t){this.line=t,this.group=t.group()||null,this.type=t.type()||null,this.label=t.label()||"",this.comment=t.comment()||"",this.quantity=t.quantity()||0,this.priceUnit=t.priceUnit()||0,this.priceTotal=t.priceTotal()||0,this.product=t.product()||null},r.updateTotal=function(){this.priceTotal=this.quantity*this.priceUnit},r.data=function(){var t={attributes:{group:this.group,type:this.type,label:this.label,comment:this.comment,quantity:this.quantity,priceUnit:this.priceUnit},relationships:{product:{data:a().getIdentifier(this.product)}}};return this.line&&(t.id=this.line.id()),t},t}();const qt=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/SoftDeleteButton"];var Ut=t.n(qt),_t=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).order=null,r.user=null,r.lines=[],r.saving=!1,r.dirty=!1,r.newLine=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.initNewLine()},e.initNewLine=function(){this.newLine=new Mt},e.initLineState=function(t){var r=new Mt;return r.init(t),r},e.newRecord=function(){return n().store.createRecord("flamarkt-orders")},e.findType=function(){return"flamarkt/orders"},e.show=function(t){this.order=t,this.user=t.user()||null,this.lines=(t.lines()||[]).map(this.initLineState.bind(this)),n().setTitleCount(0)},e.view=function(){return this.order?m("form.OrderShowPage",{onsubmit:this.onsubmit.bind(this)},m(".container",this.fields().toArray())):Tt().component()},e.fields=function(){var t=this,r=new(_());return r.add("number",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.orders.field.number")),m("input.FormControl",{value:this.order.number(),readonly:!0})]),30),r.add("user",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.orders.field.user")),m(Et(),{relationship:this.user,onchange:function(r){t.user=r,t.dirty=!0},hasOne:!0})]),20),r.add("lines",m("table.OrderComposerTable",[m("thead",m("tr",this.tableHead().toArray())),m(It(),{containerTag:"tbody",placeholderTag:"tr",onsort:function(r,e){var n;(n=t.lines).splice.apply(n,[e,0].concat(t.lines.splice(r,1))),t.dirty=!0}},this.lines.map((function(r,e){return m(nt,{key:r.uniqueFormKey,line:r,sortable:!0,control:pt().component({icon:"fas fa-times",className:"Button Button--icon Button--delete",onclick:function(){t.lines.splice(e,1),t.dirty=!0},title:n().translator.trans("flamarkt-core.backoffice.orders.lines.control.delete")}),onchange:function(){t.dirty=!0}})}))),m("tbody",m(nt,{key:"new",line:this.newLine,control:pt().component({icon:"fas fa-plus",className:"Button Button--icon",onclick:function(){t.lines.push(t.newLine),t.dirty=!0,t.initNewLine()},title:n().translator.trans("flamarkt-core.backoffice.orders.lines.control.add")}),onchange:function(){t.dirty=!0}}))]),10),r.add("submit",m(".Form-group",[H().component({loading:this.saving,dirty:this.dirty,exists:this.order.exists})," ",Ut().component({model:this.order})," ",V().component({model:this.order,afterdelete:function(){m.route.set(n().route("orders.index"))}})]),-10),r.add("payments",m(bt,{order:this.order}),-20),r},e.tableHead=function(){var t=new(_());return t.add("handle",m("th"),100),t.add("group",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.group")),90),t.add("type",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.type")),80),t.add("info",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.info")),30),t.add("priceUnit",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.priceUnit")),-30),t.add("quantity",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.quantity")),-60),t.add("priceTotal",m("th",n().translator.trans("flamarkt-core.backoffice.orders.lines.head.priceTotal")),-90),t.add("control",m("th"),-100),t},e.data=function(){return{relationships:{lines:this.lines.map((function(t){return tt({verbatim:!0,type:"flamarkt-product-lines"},t.data())})),user:this.user}}},e.onsubmit=function(t){var r,e=this;t.preventDefault(),this.saving=!0,this.saveThroughNewRecord(null==(r=this.order)?void 0:r.id(),this.data()).then((function(t){e.order=t,e.saving=!1,e.dirty=!1,m.redraw(),m.route.set(n().route.order(t))})).catch((function(t){e.saving=!1,m.redraw()}))},r}(St()),Rt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).list=void 0,r}s(r,t);var e=r.prototype;return e.oninit=function(r){t.prototype.oninit.call(this,r),this.list=this.initState(),this.list.refresh(),n().setTitle(xt()(n().translator.trans("flamarkt-core.backoffice.products.title"))),n().setTitleCount(0)},e.initState=function(){var t=m.route.param();return new E({sort:t.sort})},e.filters=function(){var t=this,r=new(_());return r.add("sort",m(D,{list:this.list}),100),r.add("search",m(wt(),{initialValue:"",onchange:function(r){t.list.params.q=r,t.list.refresh()},placeholder:xt()(n().translator.trans("flamarkt-core.backoffice.products.searchPlaceholder"))}),50),r.add("separator",m(".BackofficeListFilters--separator"),-10),r.add("new",at().component({className:"Button",href:n().route("products.show",{id:"new"})},n().translator.trans("flamarkt-core.backoffice.products.new")),-100),r},e.view=function(){return m(".ProductIndexPage",m(".container",[m(".BackofficeListFilters",this.filters().toArray()),m(kt,{list:this.list})]))},r}(Ot());const Ht=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/RichTextInput"];var jt=t.n(Ht),Vt=function(t){function r(){for(var r,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(r=t.call.apply(t,[this].concat(n))||this).product=null,r.saving=!1,r.dirty=!1,r.title="",r.description="",r.price=0,r.availabilityDriver=null,r.priceDriver=null,r}s(r,t);var e=r.prototype;return e.newRecord=function(){return n().store.createRecord("flamarkt-products",{attributes:{}})},e.findType=function(){return"flamarkt/products"},e.show=function(t){this.product=t,this.title=t.title()||"",this.description=t.description()||"",this.price=t.priceEdit()||0,this.availabilityDriver=t.attribute("availabilityDriver"),this.priceDriver=t.attribute("priceDriver"),n().setTitle(t.title()),n().setTitleCount(0)},e.view=function(){return this.product?m("form.ProductShowPage",{onsubmit:this.onsubmit.bind(this)},m(".container.container--narrow",this.fields().toArray())):Tt().component()},e.fields=function(){var t=this,r=new(_());return r.add("title",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.title")),m("input.FormControl",{type:"text",value:this.title,oninput:function(r){t.title=r.target.value,t.dirty=!0},disabled:this.saving})]),50),r.add("description",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.description")),m(jt(),{value:this.description,onchange:function(r){t.description=r,t.dirty=!0,m.redraw()},disabled:this.saving})]),40),r.add("price",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.price")),m(g,{value:this.price,onchange:function(r){t.price=r,t.dirty=!0},disabled:this.saving})]),30),r.add("availabilityDriver",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.availabilityDriver")),z().component({value:this.availabilityDriver||"_default",options:this.availabilityDriverOptions(),onchange:function(r){t.availabilityDriver="_default"===r?null:r,t.dirty=!0}})]),20),r.add("priceDriver",m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.products.field.priceDriver")),z().component({value:this.priceDriver||"_default",options:this.priceDriverOptions(),onchange:function(r){t.priceDriver="_default"===r?null:r,t.dirty=!0}})]),10),r.add("submit",m(".Form-group",[H().component({loading:this.saving,dirty:this.dirty,exists:this.product.exists})," ",Ut().component({model:this.product})," ",V().component({model:this.product,afterdelete:function(){m.route.set(n().route("products.index"))}})]),-10),r},e.availabilityDriverOptions=function(){var t={_default:"Default"};return(n().forum.attribute("flamarktAvailabilityDrivers")||[]).forEach((function(r){t[r]=r})),t},e.priceDriverOptions=function(){var t={_default:"Default"};return(n().forum.attribute("flamarktPriceDrivers")||[]).forEach((function(r){t[r]=r})),t},e.data=function(){return{title:this.title,description:this.description,price:this.price,availabilityDriver:this.availabilityDriver,priceDriver:this.priceDriver}},e.onsubmit=function(t){var r,e=this;t.preventDefault(),this.saving=!0,this.saveThroughNewRecord(null==(r=this.product)?void 0:r.id(),this.data()).then((function(t){e.product=t,e.saving=!1,e.dirty=!1,m.redraw(),m.route.set(n().route.product(t))})).catch((function(t){throw e.saving=!1,m.redraw(),t}))},r}(St()),Qt={"components/EditPaymentModal":Q,"components/OrderLineEdit":nt,"components/OrderList":mt,"components/OrderPaymentSection":bt,"components/OrderRelationshipSelect":vt,"components/PaymentList":ht,"components/ProductList":kt,"components/ProductRelationshipSelect":Z,"pages/OrderIndexPage":At,"pages/OrderShowPage":_t,"pages/ProductIndexPage":Rt,"pages/ProductShowPage":Vt,"states/OrderLineEditState":Mt,"states/PaymentListPassthroughState":yt,"utils/augmentOptionsWithValue":rt,"utils/OrderLineOptions":et};const Gt=flarum.core.compat["common/extend"],Yt=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/BackofficeNav"];var Kt=t.n(Yt);const zt=((flarum.extensions["flamarkt-backoffice"]||{}).common||{})["components/ActiveLinkButton"];var Wt=t.n(zt);n().initializers.add("flamarkt-core",(function(){k().store.models["flamarkt-carts"]=x,k().store.models["flamarkt-orders"]=L,k().store.models["flamarkt-order-lines"]=T,k().store.models["flamarkt-payments"]=F,k().store.models["flamarkt-products"]=S,n().store.models.users.prototype.flamarktOrderCount=a().attribute("flamarktOrderCount"),n().routes["products.index"]={path:"/products",component:Rt},n().routes["products.show"]={path:"/products/:id",component:Vt},n().routes["orders.index"]={path:"/orders",component:At},n().routes["orders.show"]={path:"/orders/:id",component:_t},n().route.product=function(t){return n().route("products.show",{id:t.id()})},n().route.order=function(t){return n().route("orders.show",{id:t.id()})},(0,Gt.extend)(Kt().prototype,"items",(function(t){t.add("products",Wt().component({href:n().route("products.index"),icon:"fas fa-box",activeRoutes:["products.*"]},n().translator.trans("flamarkt-core.backoffice.nav.products")),40),t.add("orders",Wt().component({href:n().route("orders.index"),icon:"fas fa-shopping-cart",activeRoutes:["orders.*"]},n().translator.trans("flamarkt-core.backoffice.nav.orders")),20)})),n().extensionData.for("flamarkt-core").registerSetting((function(){var t={};return(n().forum.attribute("flamarktAvailabilityDrivers")||[]).forEach((function(r){t[r]=r})),m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.settings.defaultAvailabilityDriver")),z().component({value:this.setting("flamarkt.defaultAvailabilityDriver")()||"never",options:t,onchange:this.setting("flamarkt.defaultAvailabilityDriver")})])})).registerSetting((function(){var t={};return(n().forum.attribute("flamarktPriceDrivers")||[]).forEach((function(r){t[r]=r})),m(".Form-group",[m("label",n().translator.trans("flamarkt-core.backoffice.settings.defaultPriceDriver")),z().component({value:this.setting("flamarkt.defaultPriceDriver")()||"fixed",options:t,onchange:this.setting("flamarkt.defaultPriceDriver")})])})).registerSetting({type:"switch",setting:"flamarkt.forceOrderPrepayment",label:n().translator.trans("flamarkt-core.backoffice.settings.forceOrderPrepayment")}).registerPermission({icon:"fas fa-shopping-cart",label:n().translator.trans("flamarkt-core.backoffice.permissions.shop"),permission:"flamarkt.shop",allowGuest:!0},"reply").registerPermission({icon:"fas fa-wrench",label:n().translator.trans("flamarkt-core.backoffice.permissions.backoffice"),permission:"backoffice"},"moderate")}))})(),module.exports=r})();
//# sourceMappingURL=backoffice.js.map