import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/productcard/productcard';
import axios from 'axios';
import '../../screens/home/home.css';

function AddtoFav()  {
    const [data, setData] = useState(null);

    //Need an api to fetch details from Database
    useEffect(() => {
      axios.get('/user_data.json')
        .then(response => setData(response.data))
        .catch(error => console.error(error));
    }, []);
    if (!data) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container py-5" >
        <div className="row">
  
        </div>
        <hr />
  
        <div className="row pt-2">
          {data.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
              <ProductCard  product={data[index]} width={216} height={330} isfav={data.isfav} />
            </div> 
          ))}
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
            
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
          </div>
          
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
            
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-2">
  
          </div>
        </div>
      </div>
    )
};

export default AddtoFav;