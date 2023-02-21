import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query'
import CardMedia from '@mui/material/CardMedia';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

import { updatePostRequest } from '../../ApiServices/TasksService'

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

  const { mutate: mutateUpdatePosts } = useMutation((newPost) => updatePostRequest(newPost),
  {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      navigate('/HomePage');
    }
  })

  console.log(data)
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
    if(event.target.name === 'cancel'){
      navigate(`/HomePage`)
    }else if(event.target.name === 'save'){
      if(input.post_title === '' || input.post_description === '' || input.image === ''){
        return alert('Missing Inputs');
      };
      mutateUpdatePosts(
        {
          post_title: JSON.stringify(input.post_title),
          post_description: JSON.stringify(input.post_description),
          content: JSON.stringify(contentState),
          category: input.category,
          post_id: data[0].post_id, 
          date_edited: new Date().getTime().toString(),
          image: input.image,
        }
      )
    }
  }

  return(
    <main className="edit-page">
      <div className="App">
        <Navbar />
        <form>
          <div className="top-container">
            <div className="left-container">
              <label htmlFor="post-title">Title</label>
              <input className="title-input" type="text" maxLength="50" name="post_title" id="post-title" value={input.post_title} onChange={(event) => handleChange(event)}/>
              <label htmlFor="post-description">Description</label>
              <input className="description-input" type="text" maxLength="100" name="post_description" id="post-description" value={input.post_description} onChange={(event) => handleChange(event)} />
            </div>
            <div className="right-container">
              <SelectOption options={options} selection='Category' handleSelect={handleSelect} />
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
            <button onClick={(event) => submit(event)} name="cancel">Cancel</button>
            <button onClick={(event) => submit(event)} name="save">Save Changes</button>
          </div>
        </form>
      </div>
    </main>
  )
} 