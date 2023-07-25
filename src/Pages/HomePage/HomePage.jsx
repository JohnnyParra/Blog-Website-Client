// Libraries
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';

// API Services
import { fetchUser } from '../../ApiServices/TasksService';

//Components
import Navbar from '../../Components/Navbar/Navbar';
import ContentHolder from '../../Components/ContentHolder/ContentHolder';
import FeaturedContentHolder from '../../Components/FeaturedContentHolder/FeaturedContentHolder';
import SelectOption from '../../Components/SelectOption/SelectOption';

//Utilities
import { sortOptions } from '../../Utils/SortOptions';
import { categoryOptions } from '../../Utils/CategoryOptions';

// Styling
import './HomePage.css';

export default function Home(){
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ sort: 1, category: 0, page: 1 });
  const { loginUser } = useContext(UserContext);

  const { isLoading: userLoading } = useQuery(
    'user', 
    fetchUser,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        loginUser(data);
      }
    }
  );

  if(!(sortOptions.some(el => el.value == searchParams.get('sort')))) {console.log('invalid param')};
  if(userLoading) {return <p>Loading...</p>};

  function handleSelect(value){
    searchParams.set('sort', value);
    searchParams.set('page', 1)
    setSearchParams(searchParams);
  };
  
  function handleCategoryClick(event, value){
    event.preventDefault();
    searchParams.set("category", value);
    searchParams.set('page', 1)
    setSearchParams(searchParams);
  };

  const linkElements = categoryOptions.map((category, index) => {
    return <a key={index} style={{color: searchParams.get('category') == category.value ? 'rgb(255, 106, 0)' : 'black'}} onClick={(event) => handleCategoryClick(event, category.value)}href='#'>{category.title}</a>
  })

  return (
    <main className='home-page'>
      <div className = 'App'>
        <Navbar />
        <div className='category-links'>
          <a style={{color: searchParams.get('category') == 0 ? 'rgb(255, 106, 0)' : 'black'}} onClick={(event) => handleCategoryClick(event, 0)}href='#'>All</a>
          {linkElements}
        </div>
        <FeaturedContentHolder category={searchParams.get('category')} />
        <div className='select-option-container'>
          <Button onClick={() => navigate('Posts/CreatePost')} size='small' variant='contained' color='warning' startIcon={<CreateIcon />}>
            Create A Post
          </Button>
          <SelectOption start={searchParams.get('sort')} options={sortOptions} selection='Sort' handleSelect={handleSelect}/>
        </div>
        <div className='post-card-container'>
          <ContentHolder category={searchParams.get('category')} sort={searchParams.get('sort')} page={searchParams.get('page')} />
        </div>
      </div>
    </main>
  );
};