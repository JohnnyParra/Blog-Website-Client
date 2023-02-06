import React from 'react'

export function orderPosts(sort, data ){
  if(sort == 1){
    return [...data].sort(({date_created:a}, {date_created: b}) => b-a)
  } else if(sort == 2){
    return [...data].sort(({date_created:a}, {date_created: b}) => b-a)
  } else if(sort == 3){
    return [...data].sort(({date_created:a}, {date_created: b}) => b-a)
  }
}