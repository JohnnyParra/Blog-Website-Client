import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { useMutation, useQueryClient } from 'react-query'
import CardMedia from '@mui/material/CardMedia';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'

import { addPostRequest } from '../../ApiServices/TasksService'

import SelectOption from '../../Components/SelectOption/SelectOption'
import Navbar from '../../Components/Navbar/Navbar'

import './CreatePostPage.css'

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
  const [input, setInput] = useState({post_title: '', post_description: '', image: '', category: 4})
  const[editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [contentState, setContentState] = useState();
  const [previewImage, setPreviewImage] = useState('')
  const { mutate: mutateAddPosts } = useMutation((newPost) => addPostRequest(newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts'])
        navigate('/HomePage');
      }
    })

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
    }else if(event.target.name === 'save') {
      mutateAddPosts(
        {
          type: 'save',
          post_title: JSON.stringify(input.post_title),
          post_description: JSON.stringify(input.post_description),
          content: JSON.stringify(contentState),
          category: input.category,
          post_id: nanoid(), 
          date_created: new Date().getTime().toString(),
          image: input.image,
        }
      )
    }else if(event.target.name === 'publish'){
      if(input.post_title === '' || input.post_description === '' || input.image === ''){
        return alert('Missing Inputs');
      };
      let data = new FormData();
      data.append('image', input.image);
      data.append('type', 'publish');
      data.append('post_title', JSON.stringify(input.post_title));
      data.append('post_description', JSON.stringify(input.post_description));
      data.append('content', JSON.stringify(contentState));
      data.append('category', input.category);
      data.append('post_id', nanoid());
      data.append('date_created', new Date().getTime().toString());
      mutateAddPosts(data
        // {
        //   type: 'publish',
        //   post_title: JSON.stringify(input.post_title),
        //   post_description: JSON.stringify(input.post_description),
        //   content: JSON.stringify(contentState),
        //   category: input.category,
        //   post_id: nanoid(), 
        //   date_created: new Date().getTime().toString(),
        //   image: input.image,
        // }
      )
    }
  }

  async function fileSubmit(event){
    let imageData = new FormData();
    imageData.append('image', event.target.files[0]);
    setInput(prevInput => ({...prevInput, [event.target.name]:  event.target.files[0]}))
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  return(
    <main className="create-post">
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
          <label htmlFor="image">Chose an Image</label>
          <input type='file' name="image" accept="image/*" onChange={(event) => fileSubmit(event)}></input>
          <div className="image-container">
            {input.image !== '' && 
            <CardMedia
              component="img"
              sx={{ width: 160, height:'100%', display: { xs: 'none', sm: 'block' } }}
              image={previewImage}
              alt='Preview of Image'
            />
            }
          </div>
          <div className="create-post-btns">
            <button onClick={(event) => submit(event)} name="cancel">Cancel</button>
            <button onClick={(event) => submit(event)} name="save">Save</button>
            <button onClick={(event) => submit(event)} name="publish">Publish</button>
          </div>
        </form>
      </div>
    </main>
  )
} 