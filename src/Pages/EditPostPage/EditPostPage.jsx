import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

import { updatePostRequest, deletePostRequest } from '../../ApiServices/TasksService'

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
  const [input, setInput] = useState({post_title: data[0].post_title, post_description: data[0].post_description, image: '' , category: data[0].category})
  const [contentState, setContentState] = useState();
  const [previewImage, setPreviewImage] = useState(data[0].image)

  const { mutate: mutateUpdatePosts } = useMutation((newPost) => updatePostRequest(newPost),
  {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      navigate('/HomePage');
    }
  })

  const { mutate: mutateDeletePosts } = useMutation((id) => deletePostRequest(id),
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
      return
    }else if(event.target.name === 'delete'){
      mutateDeletePosts(data[0].post_id)
    }else if(event.target.name === 'save'){
      if(input.post_title === '' || input.post_description === ''){
        return alert('Missing Inputs');
      };
      let formData = new FormData();
      if(input.image != '') formData.append('image', input.image);
      data[0].published == 1 ? formData.append('type', 'publish') : formData.append('type', 'save');
      formData.append('post_title', JSON.stringify(input.post_title));
      formData.append('post_description', JSON.stringify(input.post_description));
      formData.append('content', JSON.stringify(contentState));
      formData.append('category', input.category);
      formData.append('post_id', data[0].post_id);
      formData.append('date_edited', new Date().getTime().toString());
      mutateUpdatePosts(formData);
    } else if(event.target.name === 'publish'){
      if(input.post_title === '' || input.post_description === ''){
        return alert('Missing Inputs');
      };
      let formData = new FormData();
      if(input.image != '')formData.append('image', input.image);
      formData.append('type', 'publish');
      formData.append('post_title', JSON.stringify(input.post_title));
      formData.append('post_description', JSON.stringify(input.post_description));
      formData.append('content', JSON.stringify(contentState));
      formData.append('category', input.category);
      formData.append('post_id', data[0].post_id);
      formData.append('date_created', new Date().getTime().toString());
      mutateUpdatePosts(formData);
    }
  }

  async function fileSubmit(event){
    let imageData = new FormData();
    imageData.append('image', event.target.files[0]);
    setInput(prevInput => ({...prevInput, [event.target.name]:  event.target.files[0]}))
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
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
          <input type='file' name="image" accept="image/*" onChange={(event) => fileSubmit(event)}></input>
          <div className="image-container">
            <CardMedia
              component="img"
              sx={{ width: 160, height:'100%', display: { sm: 'block' } }}
              image={previewImage}
              alt='Preview of Image'
            />
          </div>
          <div className="create-post-btns">
            <Button className="btn" onClick={(event) => submit(event)} name="cancel" size='small' variant="contained" color="warning" startIcon={<ClearIcon/>}>Cancel</Button>
            <Button className="btn" onClick={(event) => submit(event)} name="delete" size='small' variant="contained" color="warning" endIcon={<DeleteIcon/>}>Delete</Button>
            <Button className="btn" onClick={(event) => submit(event)} name="save" size='small' variant="contained" color="warning" endIcon={<SaveIcon/>}>Save</Button>
            {data[0].published != 1 && <Button className="btn" onClick={(event) => submit(event)} name="publish" size='small' variant="contained" color="warning" endIcon={<PublishIcon/>}>Publish</Button>}
          </div>
        </form>
      </div>
    </main>
  )
} 