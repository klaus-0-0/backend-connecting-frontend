import { useState } from "react";
import axios from "axios";
import { v4 as uiqueID } from "uuid"


// not good way of signin but can look good for understing

const Signin = () => {

    const [data, setData] = useState({ username: '', email: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await axios.get('/api/items'); 
        console.log('Response data:', response );
  
      let usernameExists = false;
  
      if (usernameExists) {
        console.log("Username already exists");
      } else {
        const postResponse = await axios.post('/api/items', data);
        console.log('Data sent successfully:', postResponse.data);
      }
  
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });        
    };

    return <div className="bg-slate-200 h-screen flex justify-center">
        <form onSubmit={handleSubmit}>
            <label>
                username:
                <input type="text" name="username" value={data.username} onChange={handleChange} />
            </label>
            <label>
                email:
                <input type="text" name="email" value={data.email} onChange={handleChange} />
            </label>
            <button type="submit" >Send</button>
        </form>
    </div>
}

export default Signin;