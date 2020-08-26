import React from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Auth as AuthEl } from './auth';

const Auth = <AuthEl auth={firebase.auth()} db={firebase.firestore()} />;

export default Auth;
