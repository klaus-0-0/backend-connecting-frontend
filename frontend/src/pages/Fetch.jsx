//  eslint-disable no-unused-vars 
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uiqueID } from "uuid"

const Fetch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/items');
        // console.log(response)
        setData(response.data.items);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      <div>DATA-Length: {data.length }</div> 
      {
        data.map((value, index) => (
          <div key={uiqueID()}>
            <div>{value.username}</div>
            <div>{value.email}</div>
            <div>{value.password}</div>
            <div>INDEX: {index}</div>
          </div>
        ))
      }
    </div>
  )
};

export default Fetch;
