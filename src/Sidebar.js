import { Avatar } from '@mui/material'
import React from 'react'
import './Sidebar.css'
import { selectUser } from './features/userSlice' //this will give u the user from the redux store
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const user = useSelector(selectUser)

    const recentItems = (topic) => {
        return (
            <div className='sidebar__recentItem'>
                <span className='sidebar__hash'>#</span>
                <p>{topic}</p>
            </div>
        )
    }

  return (
    <div className='sidebar'>
        
        <div className='sidebar__top'>
            <img src='https://i.redd.it/nwi84jf5wjx61.jpg' alt='' />   
              <Avatar className='sidebar__avatar' src={user.photoUrl}>
                  {user.email[0]}
              </Avatar>
              <h2>{user.displayName}</h2>
              <h4>{user.email}</h4>
        </div>
        
        <div className='sidebar__stats'>
            <div className='sidebar__stat'>
                <p>Who viewed you</p>
                <p className='sidebar__statNumber'>2,543</p>
            </div>
            <div className='sidebar__stat'>
                <p>views on post</p>
                <p className='sidebar__statNumber'>2,443</p>
            </div>
        </div>
        
        <div className='sidebar__bottom'>
            <p>Recent</p>
            {recentItems('reactjs')}
            {recentItems('reactjs')}
            {recentItems('reactjs')}
            {recentItems('reactjs')}
        </div>
        
    </div>
  )
}

export default Sidebar