import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Remove the token from local storage or cookies
        localStorage.removeItem("token1"); // or document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("token");
        // Redirect the user to the login page
        navigate("/signin");
    };

    return (
        <div>
            <h1>Sign Out</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default SignOut;
