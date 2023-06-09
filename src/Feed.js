import React, { useState, useEffect }  from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOptions from './InputOptions'
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Posts from './Posts'
import { db, auth } from './firebase'
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move' //for coming inout when we post animation u gotta yarn add it

const Feed = () => {

  const user = useSelector(selectUser)
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    //creates a real time listener to firebase if post change we update it 
    db.collection('posts')
      .orderBy('timestamp', 'desc') //order in descending order from the timestamp
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => (
          {
            id: doc.id,
            data: doc.data()
          }
        )))
      })
  }, [])

  const sendPost = (e) => {
    e.preventDefault()

    db.collection('posts')
      .add({
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput('')//clears input text
  }

  return (
    <div className='feed'>
        <div className='feed__inputContainer'>
            <div className='feed__input'>
              <CreateIcon />
              <form>
                <input 
                  value={input}  
                  onChange = { e => {
                    setInput(e.target.value)
                  }}
                  type='text' 
                />
            <button onClick={ sendPost } type='submit'>Send</button>
              </form>
            </div>
            
            <div className='feed__inputOptions'>
              <InputOptions Icon={ImageIcon} title='Photo' color='#70B5F9' />
              <InputOptions Icon={SubscriptionsIcon} title='Video' color='#E7A33E' />
              <InputOptions Icon={EventNoteIcon} title='Event' color='#C0CBCD' />
              <InputOptions Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E'/>
            </div>
        </div>
        {/* Posts */}
        <FlipMove>
          {
            posts.map(({ id, data: { name, description, message, photoUrl }}) => (
              <Posts 
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
              />
            ))
          }
        </FlipMove>
        
    </div>
  )
}

export default Feed