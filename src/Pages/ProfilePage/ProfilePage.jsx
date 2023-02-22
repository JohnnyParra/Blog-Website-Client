import react, { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import Navbar from '../../Components/Navbar/Navbar'
import { Avatar, IconButton } from '@mui/material'

import './ProfilePage.css'


export default function Profile() {
  const [input, setInput] = useState({avatar: ''})
  const [previewImage, setPreviewImage] = useState('');
  const { currentUser } = useContext(UserContext);
  function avatarChange(event){
    setInput(prevInput => ({...prevInput, [event.target.name]: event.target.files[0]}))
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  return(
    <main className="profile-page">
      <div className="App">
        <Navbar />
        <div className="avatar">
          <input accept="image/*" id="avatar-pic" name="avatar" onChange={(event) => avatarChange(event)}type='file' hidden></input>
          <label htmlFor="avatar-pic">
            <IconButton component="span">
              <Avatar src={previewImage} sx={{ fontSize: 100, width: 200, height: 200, m: 1, bgcolor: '#ff3d00' }}>{currentUser.userInfo[0]?.name[0]}</Avatar>
            </IconButton>
          </label>
        </div>
        {input.avatar && <button>Save</button>}
        <p>Member since: {new Date(Number(currentUser.userInfo[0].date_created)).toLocaleString()}</p>
        <div className="input-container">
          <div className="username">
            <p>UserName: </p>
            <input type="text" defaultValue={currentUser.userInfo[0].name}></input>
          </div>
          <div className="email">
            <p>Email: </p>
          <input type="text" defaultValue={currentUser.userInfo[0].email}></input>
          </div>
        </div>
      </div>
    </main>
  )
}