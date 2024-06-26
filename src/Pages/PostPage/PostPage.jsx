// Libraries && Context
import React, { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import { UserContext } from '../../Context/UserContext';

// Api Services
import { fetchPost } from '../../ApiServices/TasksService';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import LikeButton from '../../Components/LikeButton/LikeButton';
import CommentSection from '../../Components/CommentSection/CommentSection';

// Styling
import './PostPage.css';

export default function Post() { /// something wrong with how the LikeButton component works
  const { updateData, currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [editorState, setEditorState] = useState();

  const { data: postData , isLoading, isError } = useQuery(
    'posts', 
    () => fetchPost(id),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const convertedState = convertFromRaw(data.post[0].content);
        setEditorState(() => EditorState.createWithContent(convertedState));
        updateData(data.post[0])
      }
    }
  );

  if (isLoading) {return <p>Loading...</p>};
  if (isError) {return <p>An Error occurred</p>};
  const data = postData.post;
  
  return (
    <main className='post-page'>
      <div className='App'>
        <Navbar />
        <div className="title-container">
          <h1>{data[0].title}</h1>
        </div>
        <div className="description-container">
          <h5>
            <i>{data[0].description}</i>
          </h5>
        </div>
        <div className="dates-container">
          {data[0].date_published && (
            <span className='created-date'>
            Published: {new Date(data[0].date_published).toLocaleString()}
          </span>
          )}
          {data[0].date_edited && (
            <span className='edited-date'>
              Last Edited:{' '}
              {new Date(data[0].date_edited).toLocaleString()}
            </span>
          )}
        </div>
        <div className="by-container">
          <span className='created-by'>By: {data[0].author}</span>
        </div>
        <div className="edit-link-container">
          {data[0].user_id === currentUser.user.userId && (
            <Link to={`/HomePage/Posts/EditPost/${data[0].id}`}>edit</Link>
          )}
        </div>
        <LikeButton id={id} type={'post_likes'} />
        <div className='editor-container'>
          <Editor
            toolbarHidden={true}
            editorState={editorState}
            readOnly={true}
          />
        </div>
        <CommentSection id={id} />
      </div>
    </main>
  );
};
