// Libraries && Context
import React, { useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

// MUI Components && Icons
import CreateIcon from '@mui/icons-material/Create';

// Api Services
import { fetchUser } from '../../ApiServices/TasksService';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import ContentHolder from '../../Components/ContentHolder/ContentHolder';
import FeaturedContentHolder from '../../Components/FeaturedContentHolder/FeaturedContentHolder';
import SelectOption from '../../Components/SelectOption/SelectOption';
import SquareButton from '../../Components/common/Buttons/SquareButton/SquareButton';

// Utilities
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
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };
  
  function handleCategoryClick(event, value){
    event.preventDefault();
    searchParams.set("category", value);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };

  function scrollToTop() {
    const container = document.querySelector('.App');
    container.scrollTop = 0;
  }

  const linkElements = categoryOptions.map((category, index) => {
    return (
      <a 
        key={index} 
        className={`${searchParams.get('category') == category.value ? 'selected' : ''}`}
        onClick={(event) => handleCategoryClick(event, category.value)}
        href='#'
        aria-current={searchParams.get('category') == category.value ? 'page' : 'false'}
      >
        {category.title}
      </a>
    )
  })

  const currentCategory = categoryOptions.find(category => category.value == searchParams.get('category'))?.title || 'Home Page';
  return (
    <main className='home-page'>
      <Helmet>
        <title>{currentCategory === 'Home Page' ? 'Home' : `${currentCategory}`} | Fire Talks</title>
        <meta name='description' content={`This is the ${currentCategory === 'All' ? 'home' : currentCategory.toLowerCase()} page of our website.`} />
        <meta name='keywords' content={`${currentCategory.toLowerCase()}, posts, blog, fire talks`} />
      </Helmet>
      <div className = 'App'>
        <Navbar />
        <div className='category-links' role='navigation' aria-label='Category Links'>
          <a 
            className={`${searchParams.get('category') == 0 ? 'selected' : ''}`}
            onClick={(event) => handleCategoryClick(event, 0)}
            href='#'
            aria-current={searchParams.get('category') == 0 ? 'page' : 'false'}
          >
            All
          </a>
          {linkElements}
        </div>
        <FeaturedContentHolder category={searchParams.get('category')} />
        <div className='select-option-container'>
          <SquareButton 
            className={""}
            name={"create a post"}
            title={"create a post"}
            text={"Create A Post"}
            disabled={false}
            authRequired={true}
            shape={"square"}
            color={"primary"}
            isSelected={true}
            onClick={() => navigate('/create-post')} 
            icon={<CreateIcon />}
            ariaLabel={'Create a Post'}
          />
          <SelectOption 
            key={searchParams.get('sort')} 
            start={searchParams.get('sort')} 
            options={sortOptions} 
            selection='Sort' 
            handleSelect={handleSelect}
          />
        </div>
        <div className='post-card-container'>
          <ContentHolder 
            category={searchParams.get('category')} 
            sort={searchParams.get('sort')} 
            page={searchParams.get('page')} 
          />
        </div>
        {/* <div className="scroll-to-top">
          <a 
            onClick={() => scrollToTop()} 
            aria-label='Scroll back to the top'
          >
            back to top
          </a>
        </div> */}
      </div>
    </main>
  );
};