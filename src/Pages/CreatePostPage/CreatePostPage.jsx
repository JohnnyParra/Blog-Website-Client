import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import {useMutation} from 'react-query'

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
  const [input, setInput] = useState({post_title: '', post_description: '', category: 4})
  const { mutate: mutateAddPosts } = useMutation((newPost) => addPostRequest(newPost))

  function handleChange(event){
    const {name, value} = event.target;
    setInput(prevInput => ({...prevInput, [name]: value}));
  };

  function handleSelect(value){
    setInput(prevInput => ({...prevInput, category: value}))
  }

  function submit(event){
    event.preventDefault();
    mutateAddPosts(
      {
        post_title: JSON.stringify(input.post_title),
        post_description: JSON.stringify(input.post_description),
        category: input.category,
        post_id: nanoid(), 
        date_created: new Date().getTime().toString(),
      }
    )
  }

  return(
    <div className="create-post">
      <Navbar />
      <form onSubmit={(event) => submit(event)} action="">
        <label htmlFor="post_title">Title</label>
        <input type="text" name="post_title" id="post_title" value={input.post_title} onChange={(event) => handleChange(event)}/>
        <label htmlFor="post_description">Description</label>
        <input type="text" name="post_description" id="post_description" value={input.post_description} onChange={(event) => handleChange(event)} />
        <div>
          Choose Category
          <SelectOption options={options} selection='Category' handleSelect={handleSelect} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
} 