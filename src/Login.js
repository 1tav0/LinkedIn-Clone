import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'

const Login = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const dispatch = useDispatch()//WE GOT TO DISPATCH THE LOGIN OPTION INTO THE FIREBASE STORE -AKA PUSH THE USER INTO THE FIREBASE STORE

    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(userAuth => {
                dispatch(login({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    displayName: userAuth.user.displayName,
                    profileUrl: userAuth.user.photoURL
                }))
            })
            .catch( (error) => alert((error)))
    }

    const register = () => {
        if (!name) {
          return alert('Please enter a full name!')
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth
                    .user
                    .updateProfile({
                    displayName: name,
                    photoURL: profilePic
                    })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                            photoURL: profilePic
                        }))
                    })
            })
            .catch((error) => alert(error.message))
    }  

  return (
    <div className='login'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png'
            alt=''
    />
        <form>
              <input value={name} onChange={e => setName(e.target.value)} placeholder='Fullname (required if registering)' type='text' />
              <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type='text' />
              <input value={email} onChange={ e => setEmail(e.target.value)} placeholder='Email' type='email' />
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' />
              <button onClick={loginToApp}>
                  SignIn
              </button>
          </form> 
          <p>
            Not a member?{" "}
            <span className='login__register' onClick={register}>
                Register Now
            </span>
          </p>  
    </div>
  )
}

export default Login