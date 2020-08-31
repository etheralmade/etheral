!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("regenerator-runtime/runtime")},function(e,t,r){"use strict";r.r(t),r.d(t,"db",(function(){return s})),r(0).config();var n=r(3),o=process.env,u=o.FIREBASE_CLIENT_EMAIL,i=o.FIREBASE_PRIVATE_KEY,a={credential:n.credential.cert({client_email:u,private_key:i.replace(/\\n/g,"\n"),project_id:"etheral-dev-f86af"}),databaseURL:"https://etheral-dev-f86af.firebaseio.com"};n.apps.length||n.initializeApp(a);var s=n.firestore()},function(e,t){e.exports=require("firebase-admin")},,,,function(e,t,r){function n(e,t,r,n,o,u,i){try{var a=e[u](i),s=a.value}catch(e){return void r(e)}a.done?t(s):Promise.resolve(s).then(n,o)}var o=r(8),u=r(2).db;r(1),r(0).config(),t.handler=function(){var e,t=(e=regeneratorRuntime.mark((function e(t){var r,n,i,a,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.queryStringParameters,n=r.oid){e.next=8;break}return e.next=5,{statusCode:404,body:JSON.stringify({message:"ERROR, no oid found."})};case 5:return e.abrupt("return",e.sent);case 8:return i=u.collection("order").doc(n),e.next=11,i.get();case 11:return a=e.sent,e.next=14,!a.exists;case 14:if(!e.sent){e.next=20;break}return e.next=17,{statusCode:404,body:JSON.stringify({message:"Order ID does not exists."})};case 17:return e.abrupt("return",e.sent);case 20:return s="localhost:9000/send-email",e.prev=21,e.next=24,i.update({paid:!0});case 24:return e.next=26,o("http://".concat(s,"?type=PAYMENT_NOTIF&oid=").concat(n));case 26:return e.next=28,{statusCode:200,body:JSON.stringify({message:"Success"})};case 28:return e.abrupt("return",e.sent);case 31:return e.prev=31,e.t0=e.catch(21),console.error(e.t0),o("http://".concat(s,"?type=ERROR"),JSON.stringify(e.t0)),e.next=37,{statusCode:404,body:JSON.stringify({message:"Error"})};case 37:return e.abrupt("return",e.sent);case 38:case"end":return e.stop()}}),e,null,[[21,31]])})),function(){var t=this,r=arguments;return new Promise((function(o,u){var i=e.apply(t,r);function a(e){n(i,o,u,a,s,"next",e)}function s(e){n(i,o,u,a,s,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}()},function(e,t){e.exports=require("node-fetch")}]));