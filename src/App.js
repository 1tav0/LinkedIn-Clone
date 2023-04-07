import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice'
import Login from './Login'
import { auth } from './firebase'


function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //user is logged in 
        dispatch(login({ //we dispatch login and a payload with that login
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
          })
        )
      }else{
        //user is logged out
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* if theres a no user render a login page else render the rest of the app */}
      {
        !user ? (
          <Login />
        ) : (
            
          <div className='app__body'>
            <Sidebar />
            <Feed /> 
            {/* Widgets */}
            <Widgets />
          </div>
        )
      }
    </div>
  );
}

export default App;
