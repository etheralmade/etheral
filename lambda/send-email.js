!(function(e, n) {
    for (var t in n) e[t] = n[t];
})(
    exports,
    (function(e) {
        var n = {};
        function t(r) {
            if (n[r]) return n[r].exports;
            var a = (n[r] = { i: r, l: !1, exports: {} });
            return e[r].call(a.exports, a, a.exports, t), (a.l = !0), a.exports;
        }
        return (
            (t.m = e),
            (t.c = n),
            (t.d = function(e, n, r) {
                t.o(e, n) ||
                    Object.defineProperty(e, n, { enumerable: !0, get: r });
            }),
            (t.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (t.t = function(e, n) {
                if ((1 & n && (e = t(e)), 8 & n)) return e;
                if (4 & n && 'object' == typeof e && e && e.__esModule)
                    return e;
                var r = Object.create(null);
                if (
                    (t.r(r),
                    Object.defineProperty(r, 'default', {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & n && 'string' != typeof e)
                )
                    for (var a in e)
                        t.d(
                            r,
                            a,
                            function(n) {
                                return e[n];
                            }.bind(null, a)
                        );
                return r;
            }),
            (t.n = function(e) {
                var n =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return t.d(n, 'a', n), n;
            }),
            (t.o = function(e, n) {
                return Object.prototype.hasOwnProperty.call(e, n);
            }),
            (t.p = ''),
            t((t.s = 10))
        );
    })({
        0: function(e, n) {
            e.exports = require('dotenv');
        },
        10: function(e, n, t) {
            var r = t(11);
            t(0).config();
            var a = process.env,
                o = a.MAIL_ADDR,
                i = a.MAIL_PASS,
                c = r.createTransport({
                    service: 'gmail',
                    auth: { user: o, pass: i },
                }),
                l = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                s = function(e) {
                    var n,
                        t,
                        r,
                        a,
                        o = e.name,
                        i = e.email,
                        c = e.phone,
                        s = e.message;
                    return '\n        <div>\n\n            <style>\n                * {\n                    font-family: sans-serif;\n                }\n\n                ul, li {\n                    list-style: none;\n                }\n            </style>\n\n            <h1>New contact form.</h1>\n            <h4>Submitted on: '
                        .concat(
                            ((n = new Date()),
                            (t = n.getUTCFullYear()),
                            (r = n.getUTCMonth()),
                            (a = n.getUTCDate()),
                            ''
                                .concat(a, ' ')
                                .concat(l[r], ' ')
                                .concat(t)),
                            '</h4>\n\n            <br />\n\n            <ul>\n                <h3>User Data</h3>\n                <li>Name: '
                        )
                        .concat(
                            o,
                            '</li>\n                <li>Email: <a href="mailto:'
                        )
                        .concat(i, '">')
                        .concat(i, '</a></li>\n                <li>Phone: ')
                        .concat(
                            c,
                            '</li>\n            </ul>\n\n            <br />\n\n            <div>\n                <h3>Message: </h3>\n                <p>'
                        )
                        .concat(
                            s.split('//n').join('<br />'),
                            '</p>\n            </div>\n        </div>\n    '
                        );
                };
            n.handler = function(e, n, t) {
                var r,
                    a,
                    i,
                    l,
                    u = e.queryStringParameters,
                    d = u.type,
                    f = '',
                    h = '';
                switch (void 0 === d ? '' : d) {
                    case 'PAYMENT_NOTIF':
                        var m = u.oid;
                        (h = 'Order '.concat(m, ' has been paid')),
                            (f = '\n                <h1>Order '
                                .concat(m, ' has been paid on ')
                                .concat(
                                    ((r = function(e) {
                                        return e < 10
                                            ? '0'.concat(e)
                                            : ''.concat(e);
                                    }),
                                    (a = new Date()),
                                    (i =
                                        a.getTime() +
                                        6e4 * a.getTimezoneOffset()),
                                    (l = new Date(i + 252e5)),
                                    ''
                                        .concat(r(l.getDate()), '.')
                                        .concat(r(l.getMonth() + 1), '.')
                                        .concat(
                                            l.getFullYear().toString(),
                                            ' (+7GMT)'
                                        )),
                                    "</h1>\n                <br />\n                <p>Please procceed to fullfil the order. Click <a href='/'>Here</a> to directly go to the admin link.</p>\n            "
                                ));
                        break;
                    case 'ERROR':
                        (h = 'ERROR Etheral'), (f = e.body);
                        break;
                    case 'CONTACT':
                        var b = JSON.parse(e.body),
                            p = b.name,
                            y = b.email,
                            v = b.phone,
                            g = b.subject,
                            O = b.message;
                        (h = g),
                            (f = s({
                                name: p,
                                email: y,
                                phone: v,
                                message: O,
                            }));
                        break;
                    case 'ADD_ADMIN':
                        var M = JSON.parse(e.body),
                            S = M.invitedBy,
                            D = M.webUrl;
                        (h = 'You have been invited to join the etheral Admin'),
                            (f = '\n                <h1>Hi! '
                                .concat(
                                    S,
                                    ' has invited you to join the etheral admin</h1>\n                <br />\n                <p>\n                    Please go to <a href='
                                )
                                .concat(D, '>')
                                .concat(
                                    D,
                                    '</a> to enter the admin dashboard\n                    <br />\n                    Your password is set to default <strong>123456</strong>.\n                    You can change your password later after signing in.\n                </p>\n            '
                                ));
                        break;
                    case 'REMOVE_ADMIN':
                        (h = 'You have been removed from etheral admin'),
                            (f =
                                "\n                <h1>Hi! you have been removed from the etheral admin</h1>\n                <br />\n                <p>\n                    From now on you won't be able to sign in to the etheral admin dashboard.\n                    Changes you've made on the admin dashboard would still persist.\n                </p>\n            ");
                        break;
                    case 'VERIFY_ORDER':
                        (h = 'Order confirmation from Etheral.com'),
                            (f = JSON.parse(e.body).template);
                }
                var N = JSON.parse(e.body).to,
                    T = {
                        from: '"Etheral notification 📿" <'.concat(o, '>'),
                        to: N || 'asketheral@gmail.com',
                        subject: h,
                        html: '\n            <style>\n                * {\n                    font-family: sans-serif;\n                }\n\n                ul, li {\n                    list-style-type: none;\n                }\n\n                a {\n                    color: #444;\n                }\n            </style>\n\n            '.concat(
                            f,
                            '\n        '
                        ),
                    };
                c.sendMail(T, function(e, n) {
                    e && t(null, { statusCode: 400, body: JSON.stringify(e) }),
                        t(null, { statusCode: 200, body: 'Success' });
                });
            };
        },
        11: function(e, n) {
            e.exports = require('nodemailer');
        },
    })
);
