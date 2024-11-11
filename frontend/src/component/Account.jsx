import axios from "axios";
import { useState, useEffect } from "react";

const Account = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("/api/balance");
                console.log(response.data)
                setBalance(response.data); // Assuming response.data contains the balance object
            } catch (error) {
                console.error("Error fetching balance", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <>
        {/* <div>
        balance: {balance.length}
        </div>
         */}
            {balance ? `Balance: ${balance.balance[0].balance}` : "Loading..."}
        </>
    );
}

export default Account;



// import axios from "axios";
// import { useState } from "react";

// const Account = async ()=>{
//     const [balance, setBalance] = useState(0);
//     const response = await axios.get("/api/bal");
//     console.log(response);
//     setBalance(response);
//     // console.log(bal)
//     return<>
//     jijj
//     </>
// }

// export default Account;