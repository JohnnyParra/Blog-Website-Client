import React, { useContext } from 'react'

import { UserContext } from '../../Context/UserContext'

import Navbar from '../../Components/Navbar/Navbar';
import LikeButton from '../../Components/LikeButton/LikeButton';

export default function Post() {
  const { data } = useContext(UserContext);

  return(
    <div>
      <Navbar />
      <h1>{data[0].post_title}</h1>
      <p>Created: {new Date(Number(data[0].date_created)).toLocaleString()}</p>
      <h2>{data[0].post_description}</h2>
      <LikeButton id={data[0].post_id} />
    </div>
  )
}