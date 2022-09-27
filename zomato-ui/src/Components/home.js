import React from 'react';
import axios from 'axios';
import Wallpaper from '../Components/Wallpaper';
import QuickSearch from '../Components/QuickSearch';
import { API_URL } from '../properties';
class Home extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      location: [],
      mealType: []
    }
  }
  componentDidMount(){
    axios(
      {
        method: 'GET',
        url:`${API_URL}/meals/getMeals`,
        headers: { 'content-Type':'application/json' }

      }
    ).then(response => this.setState ({mealType: response.data })).catch()
    axios(
      {
        method: 'GET',
        url:`${API_URL}/citylist/getcitylist`,
        headers: { 'content-Type':'application/json' }

      }
    ).then(response => this.setState ({location: response.data })).catch()
  }


    render() 
    {
      const { location, mealType } = this.state;
      return (
        <div className='app'>
            <Wallpaper locationValues={location} />
            <QuickSearch quicksearch={mealType}/>
          </div>
      );
       
     }
      }  
            
      
export default Home;