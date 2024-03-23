// Library && Context
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { UserContext } from '../../Context/UserContext';

// MUI components && Icons
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';

// Api Services
import { updatePostRequest, deletePostRequest } from '../../ApiServices/TasksService';

// Components
import SelectOption from '../../Components/SelectOption/SelectOption';
import Navbar from '../../Components/Navbar/Navbar';

// Utilities
import { categoryOptions } from '../../Utils/CategoryOptions';

// Styling
import './EditPostPage.css';

export default function CreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data } = useContext(UserContext);
  if (data[0].id !== id) navigate(-1);
  const convertedState = convertFromRaw(data[0].content);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertedState)
  );
  const [input, setInput] = useState({
    title: data[0].title,
    description: data[0].description,
    image: '',
    category: data[0].category,
  });
  const [contentState, setContentState] = useState();
  const [previewImage, setPreviewImage] = useState(data[0].image);

  const { mutate: mutateUpdatePosts } = useMutation(
    (newPost) => updatePostRequest(newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        navigate('/HomePage/Posts');
      },
    }
  );

  const { mutate: mutateDeletePosts } = useMutation(
    (id) => deletePostRequest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        navigate('/HomePage/Posts');
      },
    }
  );

  useEffect(() => {
    const content = editorState.getCurrentContent();
    setContentState(convertToRaw(content));
  }, [editorState]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  function handleSelect(value) {
    setInput((prevInput) => ({ ...prevInput, category: value }));
  };

  function submit(event) {
    event.preventDefault();
    if (event.target.name === 'cancel') {
      navigate(`/HomePage/Posts`);
      return;
    } else if (event.target.name === 'delete') {
      mutateDeletePosts(data[0].id);
    } else if (event.target.name === 'save') {
      if (input.title === '' || input.description === '') {
        return alert('Missing Inputs');
      }
      let formData = new FormData();
      if (input.image != '') formData.append('image', input.image);
      data[0].published == 1
        ? formData.append('type', 'publish')
        : formData.append('type', 'save');
      formData.append('title', JSON.stringify(input.title));
      formData.append(
        'description',
        JSON.stringify(input.description)
      );
      formData.append('content', JSON.stringify(contentState));
      formData.append('category', input.category);
      formData.append('id', data[0].id);
      formData.append('date_edited', new Date().getTime().toString());
      mutateUpdatePosts(formData);
    } else if (event.target.name === 'publish') {
      if (input.title === '' || input.description === '') {
        return alert('Missing Inputs');
      }
      let formData = new FormData();
      if (input.image != '') formData.append('image', input.image);
      formData.append('type', 'publish');
      formData.append('title', JSON.stringify(input.title));
      formData.append(
        'description',
        JSON.stringify(input.description)
      );
      formData.append('content', JSON.stringify(contentState));
      formData.append('category', input.category);
      formData.append('id', data[0].id);
      mutateUpdatePosts(formData);
    }
  };

  function fileSubmit(event) {
    let imageData = new FormData();
    imageData.append('image', event.target.files[0]);
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.files[0],
    }));
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <main className='edit-page'>
      <div className='App'>
        <Navbar />
        <form>
          <div className='top-container'>
            <div className='left-container'>
              <label htmlFor='post-title'>Title</label>
              <input
                className='title-input'
                type='text'
                maxLength='50'
                name='title'
                id='post-title'
                value={input.title}
                onChange={(event) => handleChange(event)}
              />
              <label htmlFor='post-description'>Description</label>
              <input
                className='description-input'
                type='text'
                maxLength='100'
                name='description'
                id='post-description'
                value={input.description}
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className='right-container'>
              <SelectOption
                options={categoryOptions}
                selection='Category'
                handleSelect={handleSelect}
              />
            </div>
          </div>
          <div className='body-container'>
            <Editor
              name='body'
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </div>
          <label htmlFor='image'>URL of Image</label>
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={(event) => fileSubmit(event)}
          ></input>
          <div className='image-container'>
            <CardMedia
              component='img'
              sx={{ width: 160, height: '100%', display: { sm: 'block' } }}
              image={previewImage}
              alt='Preview of Image'
            />
          </div>
          <div className='create-post-btns'>
            <Button
              className='btn'
              onClick={(event) => submit(event)}
              name='cancel'
              size='small'
              variant='contained'
              color='warning'
              startIcon={<ClearIcon />}
            >
              Cancel
            </Button>
            <Button
              className='btn'
              onClick={(event) => submit(event)}
              name='delete'
              size='small'
              variant='contained'
              color='warning'
              endIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              className='btn'
              onClick={(event) => submit(event)}
              name='save'
              size='small'
              variant='contained'
              color='warning'
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
            {data[0].published != 1 && (
              <Button
                className='btn'
                onClick={(event) => submit(event)}
                name='publish'
                size='small'
                variant='contained'
                color='warning'
                endIcon={<PublishIcon />}
              >
                Publish
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};
