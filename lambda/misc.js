!function(e,n){for(var r in n)e[r]=n[r]}(exports,function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=6)}([function(e,n){e.exports=require("dotenv")},function(e,n){e.exports=require("regenerator-runtime/runtime")},,,,,function(e,n,r){function t(e,n,r,t,o,u,i){try{var c=e[u](i),a=c.value}catch(e){return void r(e)}c.done?n(a):Promise.resolve(a).then(t,o)}r(0).config(),r(1);var o=process.env,u=o.FIREBASE_CLIENT_EMAIL,i=o.FIREBASE_PRIVATE_KEY;n.handler=function(){var e,n=(e=regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("keys: ".concat(i.replace(/\\n/g,"\n"))),console.log("Client email: ".concat(u)),e.next=4,{statusCode:200,body:"Success"};case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})),function(){var n=this,r=arguments;return new Promise((function(o,u){var i=e.apply(n,r);function c(e){t(i,o,u,c,a,"next",e)}function a(e){t(i,o,u,c,a,"throw",e)}c(void 0)}))});return function(e){return n.apply(this,arguments)}}()}]));