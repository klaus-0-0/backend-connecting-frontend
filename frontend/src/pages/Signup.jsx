import { useState } from 'react';
import axios from 'axios';


const Signup = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();                         // it stops brouser default actions/events and stops brouser to refreshing the page                    

    try {
      const response = await axios.get('/api/items');
      const postResponse = await axios.post('/api/Signup', data);

      localStorage.setItem("token1", postResponse.data.token1);
      // localStorage.removeItem("token")    when signout use this to remove token so you wont be logged in

      const token1 = postResponse.data.token1; 
      console.log('Received token1:', token1);   

      console.log('Data sent successfully:', postResponse.data);
      setMessage(response.data.message);
    }
    catch (error) {
      setMessage('sign in failed ')
      console.log("error", error)
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });      // taking copy from onChange(live data) then over writing and adding new data [name]: value -> then setdata updates on to data
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input id='1' type="text" name="username" value={data.username} onChange={handleChange} />
        </label>
        <label>
          email:
          <input type="text" name="email" value={data.email} onChange={handleChange} />
        </label>
        <label>
          password:
          <input type="text" name="password" value={data.password} onChange={handleChange} />
        </label>


        {/* <label>
          username:
          <input type='text' onChange={(e) => { setData(e.target.value);}} placeholder="John" label={"First Name"} />
        </label>
        <label>
          value:
          <input type='text' onChange={(e) => {setData(e.target.value);}} placeholder="John" label={"last Name"} />
        </label> */}


        <button type="submit" >Send</button>
      </form>
      {<p>note: {message}</p>}
    </div>
  );
};

export default Signup;
