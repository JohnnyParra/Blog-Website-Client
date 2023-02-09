import React, { useState, useContext } from 'react'

import { UserContext } from '../../Context/UserContext'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'

import Navbar from '../../Components/Navbar/Navbar';
import LikeButton from '../../Components/LikeButton/LikeButton';

export default function Post() {
  const { data } = useContext(UserContext);
  const convertedState = convertFromRaw(data[0].content)
  const[editorState, setEditorState] = useState(() => EditorState.createWithContent(convertedState))

  return(
    <div>
      <Navbar />
      <h1>{data[0].post_title}</h1>
      <p>Created: {new Date(Number(data[0].date_created)).toLocaleString()}</p>
      <h2>{data[0].post_description}</h2>
      <LikeButton id={data[0].post_id} />
      <Editor toolbarHidden={true} editorState={editorState} readOnly={true} />
    </div>
  )
}