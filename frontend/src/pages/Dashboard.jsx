/* eslint-disable no-unused-vars */
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignOut from '../component/SignOut';
import {Users} from '../component/Users'

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [balance, setBalance] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id; // Extract userId from decoded token

                const fetchUserData = async () => {
                    try {
                        const response = await axios.get(`/api/dashboard?userId=${userId}`);
                        setUserData(response.data.user);
                        setBalance(response.data.balance); // Assuming balance is part of the response
                    } catch (error) {
                        console.error("Error fetching user data", error);
                    }
                };
                
                fetchUserData();
            } catch (error) {
                console.error("Error decoding token", error);
            }
        }
    }, [token]);

    return (
        <>
            <div>{balance !== null ? `Balance: ${balance}` : "Loading..."}</div>
            <Users />
            <SignOut />
        </>
    );
};

export default Dashboard;



// // import { Appbar } from "../components/Appbar"
// import  Balance  from "../component/Account"
// import  {Users}  from "../component/Users"

//  const Dashboard = () => {
//     return <div>
//          <Balance /> 
//         {/* <Appbar /> */}
//         <div className="m-8">
//             {/* <Balance value={"10,000"} /> */}
//             <Users />
//         </div>
//     </div>
// }

// export default Dashboard;