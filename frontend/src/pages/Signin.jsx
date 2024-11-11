import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signin', { email, password });
      localStorage.setItem("token", response.data.token)
      setMessage(response.data.message);
      console.log(response)

      if (response.data.success) {
        navigate(`/dashboard?token=${response.data.token}`); // Navigate with userId
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>note: {message}</p>}
    </div>
  );
};

export default SignIn;
