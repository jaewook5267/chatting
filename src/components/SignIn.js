import React from "react"
// import firebase from 'firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import {auth} from '../firebase.js'
import {Button} from '@material-ui/core'

function SignIn() {
    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default SignIn