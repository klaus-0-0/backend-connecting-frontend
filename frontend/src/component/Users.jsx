import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      axios.get(`/api/items?search=${filter}`)
        .then(response => {
          console.log('Fetched users:', response.data.items); // Log fetched users
          setUsers(response.data.items || []); // Ensure users are defined
        })
        .catch(error => {
          console.error("Error fetching users:", error);
        });
    } else {
      setUsers([]); // Clear users if filter is empty
    }
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map(user => <User key={user._id} user={user} />)}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.username[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>{user.username}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <button
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.username}`); // Updated path
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
