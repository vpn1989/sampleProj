(window.wbWebpackJsonp=window.wbWebpackJsonp||[]).push([[2],[,,function(t,e,n){"use strict";n.d(e,"f",(function(){return b})),n.d(e,"a",(function(){return _})),n.d(e,"d",(function(){return x})),n.d(e,"b",(function(){return O})),n.d(e,"e",(function(){return N})),n.d(e,"c",(function(){return T}));var r=n(7),i=n(4),o=n(8),a=n(9),u=n(6),s=n(3);function l(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t,e,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e,n){return e&&v(t.prototype,e),n&&v(t,n),t}function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var b=function(t){return null===t||!("object"===m(t)||"function"==typeof t)},g=function(t){return Array.isArray(t)||!(!t||!t[Symbol.iterator])},_=function(){function t(e,n,r){d(this,t),this.dirty=!0,this.element=e,this.name=n,this.strings=r,this.parts=[];for(var i=0;i<r.length-1;i++)this.parts[i]=this._createPart()}return y(t,[{key:"_createPart",value:function(){return new w(this)}},{key:"_getValue",value:function(){for(var t=this.strings,e=t.length-1,n="",r=0;r<e;r++){n+=t[r];var i=this.parts[r];if(void 0!==i){var o=i.value;if(b(o)||!g(o))n+="string"==typeof o?o:String(o);else{var a=!0,u=!1,s=void 0;try{for(var l,c=o[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var f=l.value;n+="string"==typeof f?f:String(f)}}catch(t){u=!0,s=t}finally{try{a||null==c.return||c.return()}finally{if(u)throw s}}}}}return n+=t[e]}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}]),t}(),w=function(){function t(e){d(this,t),this.value=void 0,this.committer=e}return y(t,[{key:"setValue",value:function(t){t===o.a||b(t)&&t===this.value||(this.value=t,Object(r.b)(t)||(this.committer.dirty=!0))}},{key:"commit",value:function(){for(;Object(r.b)(this.value);){var t=this.value;this.value=o.a,t(this)}this.value!==o.a&&this.committer.commit()}}]),t}(),x=function(){function t(e){d(this,t),this.value=void 0,this.__pendingValue=void 0,this.options=e}return y(t,[{key:"appendInto",value:function(t){this.startNode=t.appendChild(Object(s.c)()),this.endNode=t.appendChild(Object(s.c)())}},{key:"insertAfterNode",value:function(t){this.startNode=t,this.endNode=t.nextSibling}},{key:"appendIntoPart",value:function(t){t.__insert(this.startNode=Object(s.c)()),t.__insert(this.endNode=Object(s.c)())}},{key:"insertAfterPart",value:function(t){t.__insert(this.startNode=Object(s.c)()),this.endNode=t.endNode,t.endNode=this.startNode}},{key:"setValue",value:function(t){this.__pendingValue=t}},{key:"commit",value:function(){for(;Object(r.b)(this.__pendingValue);){var t=this.__pendingValue;this.__pendingValue=o.a,t(this)}var e=this.__pendingValue;e!==o.a&&(b(e)?e!==this.value&&this.__commitText(e):e instanceof u.b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):g(e)?this.__commitIterable(e):e===o.b?(this.value=o.b,this.clear()):this.__commitText(e))}},{key:"__insert",value:function(t){this.endNode.parentNode.insertBefore(t,this.endNode)}},{key:"__commitNode",value:function(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}},{key:"__commitText",value:function(t){var e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}},{key:"__commitTemplateResult",value:function(t){var e=this.options.templateFactory(t);if(this.value instanceof a.a&&this.value.template===e)this.value.update(t.values);else{var n=new a.a(e,t.processor,this.options),r=n._clone();n.update(t.values),this.__commitNode(r),this.value=n}}},{key:"__commitIterable",value:function(e){Array.isArray(this.value)||(this.value=[],this.clear());var n,r=this.value,i=0,o=!0,a=!1,u=void 0;try{for(var s,l=e[Symbol.iterator]();!(o=(s=l.next()).done);o=!0){var c=s.value;void 0===(n=r[i])&&(n=new t(this.options),r.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(r[i-1])),n.setValue(c),n.commit(),i++}}catch(t){a=!0,u=t}finally{try{o||null==l.return||l.return()}finally{if(a)throw u}}i<r.length&&(r.length=i,this.clear(n&&n.endNode))}},{key:"clear",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.startNode;Object(i.b)(this.startNode.parentNode,t.nextSibling,this.endNode)}}]),t}(),O=function(){function t(e,n,r){if(d(this,t),this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=n,this.strings=r}return y(t,[{key:"setValue",value:function(t){this.__pendingValue=t}},{key:"commit",value:function(){for(;Object(r.b)(this.__pendingValue);){var t=this.__pendingValue;this.__pendingValue=o.a,t(this)}if(this.__pendingValue!==o.a){var e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=o.a}}}]),t}(),N=function(t){function e(t,n,r){var i;return d(this,e),(i=l(this,f(e).call(this,t,n,r))).single=2===r.length&&""===r[0]&&""===r[1],i}return h(e,t),y(e,[{key:"_createPart",value:function(){return new k(this)}},{key:"_getValue",value:function(){return this.single?this.parts[0].value:c(f(e.prototype),"_getValue",this).call(this)}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}]),e}(_),k=function(t){function e(){return d(this,e),l(this,f(e).apply(this,arguments))}return h(e,t),e}(w),j=!1;try{var E={get capture(){return j=!0,!1}};window.addEventListener("test",E,E),window.removeEventListener("test",E,E)}catch(t){}var T=function(){function t(e,n,r){var i=this;d(this,t),this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=n,this.eventContext=r,this.__boundHandleEvent=function(t){return i.handleEvent(t)}}return y(t,[{key:"setValue",value:function(t){this.__pendingValue=t}},{key:"commit",value:function(){for(;Object(r.b)(this.__pendingValue);){var t=this.__pendingValue;this.__pendingValue=o.a,t(this)}if(this.__pendingValue!==o.a){var e=this.__pendingValue,n=this.value,i=null==e||null!=n&&(e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive),a=null!=e&&(null==n||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=V(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=o.a}}},{key:"handleEvent",value:function(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}]),t}(),V=function(t){return t&&(j?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)}},function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"g",(function(){return i})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return u})),n.d(e,"d",(function(){return l})),n.d(e,"c",(function(){return c})),n.d(e,"e",(function(){return f}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var r="{{lit-".concat(String(Math.random()).slice(2),"}}"),i="\x3c!--".concat(r,"--\x3e"),o=new RegExp("".concat(r,"|").concat(i)),a="$lit$",u=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.parts=[],this.element=n;for(var i=[],u=[],l=document.createTreeWalker(n.content,133,null,!1),h=0,p=-1,d=0,v=e.strings,y=e.values.length;d<y;){var m=l.nextNode();if(null!==m){if(p++,1===m.nodeType){if(m.hasAttributes()){for(var b=m.attributes,g=b.length,_=0,w=0;w<g;w++)s(b[w].name,a)&&_++;for(;_-- >0;){var x=v[d],O=f.exec(x)[2],N=O.toLowerCase()+a,k=m.getAttribute(N);m.removeAttribute(N);var j=k.split(o);this.parts.push({type:"attribute",index:p,name:O,strings:j}),d+=j.length-1}}"TEMPLATE"===m.tagName&&(u.push(m),l.currentNode=m.content)}else if(3===m.nodeType){var E=m.data;if(E.indexOf(r)>=0){for(var T=m.parentNode,V=E.split(o),S=V.length-1,A=0;A<S;A++){var P=void 0,C=V[A];if(""===C)P=c();else{var M=f.exec(C);null!==M&&s(M[2],a)&&(C=C.slice(0,M.index)+M[1]+M[2].slice(0,-a.length)+M[3]),P=document.createTextNode(C)}T.insertBefore(P,m),this.parts.push({type:"node",index:++p})}""===V[S]?(T.insertBefore(c(),m),i.push(m)):m.data=V[S],d+=S}}else if(8===m.nodeType)if(m.data===r){var L=m.parentNode;null!==m.previousSibling&&p!==h||(p++,L.insertBefore(c(),m)),h=p,this.parts.push({type:"node",index:p}),null===m.nextSibling?m.data="":(i.push(m),p--),d++}else for(var H=-1;-1!==(H=m.data.indexOf(r,H+1));)this.parts.push({type:"node",index:-1}),d++}else l.currentNode=u.pop()}for(var R=0,W=i;R<W.length;R++){var I=W[R];I.parentNode.removeChild(I)}},s=function(t,e){var n=t.length-e.length;return n>=0&&t.slice(n)===e},l=function(t){return-1!==t.index},c=function(){return document.createComment("")},f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/},function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return o}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e!==n;){var i=e.nextSibling;t.insertBefore(e,r),e=i}},o=function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e!==n;){var r=e.nextSibling;t.removeChild(e),e=r}}},function(t,e,n){"use strict";var r=n(2);function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var o=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,o;return e=t,(n=[{key:"handleAttributeExpressions",value:function(t,e,n,i){var o=e[0];return"."===o?new r.e(t,e.slice(1),n).parts:"@"===o?[new r.c(t,e.slice(1),i.eventContext)]:"?"===o?[new r.b(t,e.slice(1),n)]:new r.a(t,e,n).parts}},{key:"handleTextExpression",value:function(t){return new r.d(t)}}])&&i(e.prototype,n),o&&i(e,o),t}()),a=n(6),u=n(7),s=n(4),l=(n(8),n(3));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function c(t){var e=f.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},f.set(t.type,e));var n=e.stringsArray.get(t.strings);if(void 0!==n)return n;var r=t.strings.join(l.f);return void 0===(n=e.keyString.get(r))&&(n=new l.a(t,t.getTemplateElement()),e.keyString.set(r,n)),e.stringsArray.set(t.strings,n),n}var f=new Map,h=new WeakMap,p=function(t,e,n){var i=h.get(e);void 0===i&&(Object(s.b)(e,e.firstChild),h.set(e,i=new r.d(Object.assign({templateFactory:c},n))),i.appendInto(e)),i.setValue(t),i.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */n(9);n.d(e,"c",(function(){return d})),n.d(e,"b",(function(){return u.a})),n.d(e,"a",(function(){return r.d})),n.d(e,"d",(function(){return p})),
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");var d=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return new a.b(t,n,"html",o)}},function(t,e,n){"use strict";n.d(e,"b",(function(){return d})),n.d(e,"a",(function(){return v}));var r=n(4),i=n(3);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t,e,n){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=s(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),t}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var p=" ".concat(i.f," "),d=function(){function t(e,n,r,i){c(this,t),this.strings=e,this.values=n,this.type=r,this.processor=i}return h(t,[{key:"getHTML",value:function(){for(var t=this.strings.length-1,e="",n=!1,r=0;r<t;r++){var o=this.strings[r],a=o.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===o.indexOf("--\x3e",a+1);var u=i.e.exec(o);e+=null===u?o+(n?p:i.g):o.substr(0,u.index)+u[1]+u[2]+i.b+u[3]+i.f}return e+=this.strings[t]}},{key:"getTemplateElement",value:function(){var t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}]),t}(),v=function(t){function e(){return c(this,e),a(this,s(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(e,t),h(e,[{key:"getHTML",value:function(){return"<svg>".concat(u(s(e.prototype),"getHTML",this).call(this),"</svg>")}},{key:"getTemplateElement",value:function(){var t=u(s(e.prototype),"getTemplateElement",this).call(this),n=t.content,i=n.firstChild;return n.removeChild(i),Object(r.c)(n,i.firstChild),t}}]),e}(d)},function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var r=new WeakMap,i=function(t){return function(){var e=t.apply(void 0,arguments);return r.set(e,!0),e}},o=function(t){return"function"==typeof t&&r.has(t)}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var r={},i={}},function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(4),i=n(3);function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var u=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.__parts=[],this.template=e,this.processor=n,this.options=r}var e,n,u;return e=t,(n=[{key:"update",value:function(t){var e=0,n=!0,r=!1,i=void 0;try{for(var o,a=this.__parts[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var u=o.value;void 0!==u&&u.setValue(t[e]),e++}}catch(t){r=!0,i=t}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}var s=!0,l=!1,c=void 0;try{for(var f,h=this.__parts[Symbol.iterator]();!(s=(f=h.next()).done);s=!0){var p=f.value;void 0!==p&&p.commit()}}catch(t){l=!0,c=t}finally{try{s||null==h.return||h.return()}finally{if(l)throw c}}}},{key:"_clone",value:function(){for(var t,e=r.a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],a=this.template.parts,u=document.createTreeWalker(e,133,null,!1),s=0,l=0,c=u.nextNode();s<a.length;)if(t=a[s],Object(i.d)(t)){for(;l<t.index;)l++,"TEMPLATE"===c.nodeName&&(n.push(c),u.currentNode=c.content),null===(c=u.nextNode())&&(u.currentNode=n.pop(),c=u.nextNode());if("node"===t.type){var f=this.processor.handleTextExpression(this.options);f.insertAfterNode(c.previousSibling),this.__parts.push(f)}else{var h;(h=this.__parts).push.apply(h,o(this.processor.handleAttributeExpressions(c,t.name,t.strings,this.options)))}s++}else this.__parts.push(void 0),s++;return r.a&&(document.adoptNode(e),customElements.upgrade(e)),e}}])&&a(e.prototype,n),u&&a(e,u),t}()},,,,,,,function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(2),i=n(5),o=new WeakMap,a=Object(i.b)((function(t){return function(e){if(!(e instanceof i.a))throw new Error("unsafeHTML can only be used in text bindings");var n=o.get(e);if(void 0===n||!Object(r.f)(t)||t!==n.value||e.value!==n.fragment){var a=document.createElement("template");a.innerHTML=t;var u=document.importNode(a.content,!0);e.setValue(u),o.set(e,{value:t,fragment:u})}}}))}]]);
//# sourceMappingURL=iapps-common.bundle.legacy.js.map