import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { useMutation, useQueryClient } from 'react-query'
import CardMedia from '@mui/material/CardMedia';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

import { addPostRequest } from '../../ApiServices/TasksService'

import SelectOption from '../../Components/SelectOption/SelectOption'
import Navbar from '../../Components/Navbar/Navbar'

import { UserContext } from '../../Context/UserContext';
import './EditPostPage.css'

const options = [
  {value: 4, title: 'Business'},
  {value: 5, title: 'Technology'},
  {value: 6, title: 'Politics'},
  {value: 7, title: 'Science'},
  {value: 8, title: 'Health'},
  {value: 9, title: 'Travel'},
  {value: 10, title: 'Sports'},
  {value: 11, title: 'Gaming'},
  {value: 12, title: 'Culture'},
  {value: 13, title: 'Style'},
  {value: 14, title: 'Other'},
]

export default function CreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const {data} = useContext(UserContext)
  const convertedState = convertFromRaw(data[0].content)
  const[editorState, setEditorState] = useState(() => EditorState.createWithContent(convertedState))
  const [input, setInput] = useState({post_title: data[0].post_title, post_description: data[0].post_description, image: data[0].image , category: data[0].category})
  const [contentState, setContentState] = useState();

  useEffect(() => {
    const content = editorState.getCurrentContent();
    setContentState(convertToRaw(content));
  }, [editorState])

  function handleChange(event){
    const {name, value} = event.target;
    setInput(prevInput => ({...prevInput, [name]: value}));
  };

  function handleSelect(value){
    setInput(prevInput => ({...prevInput, category: value}))
  }

  function submit(event){
    event.preventDefault();
    console.log(event.target)
    if(input.post_title === '' || input.post_description === '' || input.image === ''){
      return
    };
    navigate(`/HomePage/${data[0].post_id}`);
    queryClient.invalidateQueries(['posts'])
  }

  return(
    <main className="edit-page">
      <div className="App">
        <Navbar />
        <form onSubmit={(event) => submit(event)} action="">
          <div className="top-container">
            <div className="left-container">
              <label htmlFor="post-title">Title</label>
              <input className="title-input" type="text" maxLength="50" name="post_title" id="post-title" value={input.post_title} onChange={(event) => handleChange(event)}/>
              <label htmlFor="post-description">Description</label>
              <input className="description-input" type="text" maxLength="100" name="post_description" id="post-description" value={input.post_description} onChange={(event) => handleChange(event)} />
            </div>
            <div className="right-container">
              <SelectOption start={data[0].category} options={options} selection='Category' handleSelect={handleSelect} />
            </div>
          </div>
          <div className="body-container">
            <Editor name='body' editorState={editorState} onEditorStateChange={setEditorState}/>
          </div>
          <label htmlFor="image">URL of Image</label>
          <input className="image-input" type='text' name="image" id="image" value={input.image} onChange={(event) => handleChange(event)} />
          <div className="image-container">
            <CardMedia
              component="img"
              sx={{ width: 160, height:'100%', display: { xs: 'none', sm: 'block' } }}
              image={input.image}
              alt='Preview of Image'
            />
          </div>
          <div className="create-post-btns">
            <button>Cancel</button>
            <button>Save</button>
            <button>Publish</button>
          </div>
        </form>
      </div>
    </main>
  )
} 