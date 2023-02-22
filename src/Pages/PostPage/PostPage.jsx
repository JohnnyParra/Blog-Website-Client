import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../Context/UserContext'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'

import Navbar from '../../Components/Navbar/Navbar';
import LikeButton from '../../Components/LikeButton/LikeButton';

import './PostPage.css'

export default function Post() {
  const { data, currentUser } = useContext(UserContext);
  const convertedState = convertFromRaw(data[0].content)
  const[editorState, setEditorState] = useState(() => EditorState.createWithContent(convertedState))
  console.log(data)

  return(
    <main className="post-page">
      <div className="App">
        <Navbar />
        <h1>{data[0].post_title}</h1>
        <h3><i>{data[0].post_description}</i></h3>
        <p className="created-date">Created: {new Date(Number(data[0].date_created)).toLocaleString()}</p>
        {data[0].date_edited && <p className="edited-date">Last Edited: {new Date(Number(data[0].date_edited)).toLocaleString()}</p>}
        <p className="created-by">By: {data[0].Author}</p>
        {data[0].user_id === currentUser.user.userId && <Link to="/HomePage/Posts/EditPost">edit</Link>}
        <LikeButton id={data[0].post_id} />
        <div className="editor-container">
          <Editor toolbarHidden={true} editorState={editorState} readOnly={true} />
        </div>
      </div>
    </main>
  )
}
