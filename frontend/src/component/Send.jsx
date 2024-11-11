import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Send = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');
    const username = queryParams.get('name');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        try {
            const response = await axios.post('/api/sendMoney', { userId, amount: parseFloat(amount) });
            setMessage(response.data.message);
            console.log('Transaction successful:', response.data);
        } catch (error) {
            setMessage('Transaction failed. Please try again.');
            console.error('Error sending money:', error);
        }
    };

    return (
        <div>
            <h1>Send Money</h1>
            <p>User ID: {userId}</p>
            <p>Username: {username}</p>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Send;
