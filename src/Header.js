import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice'
import { auth } from './firebase'

const Header = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const logoutOfApp = () => {
        dispatch(logout())
        auth.signOut()
    }

  return (
      <div className='header'>
          <div className='header__left'>
              <img src='https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png'
                  alt=''
              />
              <div className='header__search'>
                  <SearchIcon />
                  <input placeholder='search' type='text'/>
              </div>
          </div>  

          <div className='header__right'>
              <HeaderOption Icon={HomeIcon}  title='Home' />
              <HeaderOption Icon={SupervisorAccountIcon} title='My Network' />
              <HeaderOption Icon={BusinessCenterIcon} title='Jobs' />
              <HeaderOption Icon={ChatIcon} title='Messaging' />
              <HeaderOption Icon={NotificationsIcon} title='Notifications' />
              <HeaderOption onClick={logoutOfApp} title='me' avatar={true} />
          </div>
      </div>
  )
}

export default Header