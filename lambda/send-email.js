!function(e,n){for(var t in n)e[t]=n[t]}(exports,function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=10)}({0:function(e,n){e.exports=require("dotenv")},10:function(e,n,t){var o=t(11);t(0).config();var r=process.env,a=r.MAIL_ADDR,i=r.MAIL_PASS,c=o.createTransport({service:"gmail",auth:{user:a,pass:i},tls:{rejectUnauthorized:!1}}),l=["January","February","March","April","May","June","July","August","September","October","November","December"],s=function(e){var n,t,o,r,a=e.name,i=e.email,c=e.phone,s=e.message;return"\n        <div>\n\n            <style>\n                * {\n                    font-family: sans-serif;\n                }\n\n                ul, li {\n                    list-style: none;\n                }\n            </style>\n\n            <h1>New contact form.</h1>\n            <h4>Submitted on: ".concat((n=new Date,t=n.getUTCFullYear(),o=n.getUTCMonth(),r=n.getUTCDate(),"".concat(r," ").concat(l[o]," ").concat(t)),"</h4>\n\n            <br />\n\n            <ul>\n                <h3>User Data</h3>\n                <li>Name: ").concat(a,'</li>\n                <li>Email: <a href="mailto:').concat(i,'">').concat(i,"</a></li>\n                <li>Phone: ").concat(c,"</li>\n            </ul>\n\n            <br />\n\n            <div>\n                <h3>Message: </h3>\n                <p>").concat(s.split("//n").join("<br />"),"</p>\n            </div>\n        </div>\n    ")};n.handler=function(e,n,t){var o,r,i,l,u=e.queryStringParameters,d=u.type,f="",h="";switch(void 0===d?"":d){case"PAYMENT_NOTIF":var b=u.oid;h="Order ".concat(b," has been paid"),f="\n                <h1>Order ".concat(b," has been paid on ").concat((o=function(e){return e<10?"0".concat(e):"".concat(e)},r=new Date,i=r.getTime()+6e4*r.getTimezoneOffset(),l=new Date(i+252e5),"".concat(o(l.getDate()),".").concat(o(l.getMonth()+1),".").concat(l.getFullYear().toString()," (+7GMT)")),"</h1>\n                <br />\n                <p>Please procceed to fullfil the order. Click <a href='/'>Here</a> to directly go to the admin link.</p>\n            ");break;case"ERROR":h="ERROR Etheral",f=e.body;break;case"CONTACT":var m=JSON.parse(e.body),p=m.name,y=m.email,g=m.phone,v=m.subject,O=m.message;h=v,f=s({name:p,email:y,phone:g,message:O});break;case"ADD_ADMIN":var S=JSON.parse(e.body),M=S.invitedBy,D=S.webUrl;h="You have been invited to join the etheral Admin",f="\n                <h1>Hi! ".concat(M," has invited you to join the etheral admin</h1>\n                <br />\n                <p>\n                    Please go to <a href=").concat(D,">").concat(D,"</a> to enter the admin dashboard\n                    <br />\n                    Your password is set to default <strong>123456</strong>.\n                    You can change your password later after signing in.\n                </p>\n            ");break;case"REMOVE_ADMIN":h="You have been removed from etheral admin",f="\n                <h1>Hi! you have been removed from the etheral admin</h1>\n                <br />\n                <p>\n                    From now on you won't be able to sign in to the etheral admin dashboard.\n                    Changes you've made on the admin dashboard would still persist.\n                </p>\n            ";break;case"VERIFY_ORDER":h="Order confirmation from Etheral.com",f=JSON.parse(e.body).template}var N=JSON.parse(e.body).to,j={from:'"Etheral notification 📿" <'.concat(a,">"),to:N||"asketheral@gmail.com",subject:h,html:"\n            <style>\n                * {\n                    font-family: sans-serif;\n                    color: #000;\n                }\n\n                ul, li {\n                    list-style-type: none;\n                }\n\n                a {\n                    color: #444;\n                }\n            </style>\n\n            ".concat(f,"\n        ")};try{c.sendMail(j,(function(e,n){e&&(console.error(e),t(null,{statusCode:400,body:JSON.stringify(e)})),console.log(n),t(null,{statusCode:200,body:"Success"})}))}catch(e){console.error(e),console.error(e),t(null,{statusCode:400,body:JSON.stringify(e)})}}},11:function(e,n){e.exports=require("nodemailer")}}));