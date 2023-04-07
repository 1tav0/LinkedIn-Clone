import React, { forwardRef } from 'react' //forwardRef is used with FlipMove
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import InputOptions from './InputOptions'
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';

const Posts = forwardRef(({ name, description, message, photoUrl }, ref) => {
  return (
    <div ref={ref} className='post'>
        <div className='post__header'>
        <Avatar src={photoUrl}>{ name[0]}</Avatar>
            <div className='post__info'>
                  <h2>{name}</h2>
                  <p>{description}</p>
            </div>
        </div>
        
        <div className='post__body'>
              <p>{message}</p>
        </div>
        
        <div className='post__buttons'>
            <InputOptions Icon={ThumbUpOffAltIcon } title='Like' color='gray' />
            <InputOptions Icon={ChatIcon } title='chat' color='gray' />
            <InputOptions Icon={ShareIcon } title='share' color='gray' />
            <InputOptions Icon={SendIcon } title='send' color='gray' />
        </div>
    </div>
  )
})

export default Posts