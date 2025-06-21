import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import { useNavigate } from 'react-router';

const SearchPage = () => {
  const {users, isLoadingUsers, getUsers, setSelectedUser} = useDrawStore();
  const navigate = useNavigate();

  useEffect( () => {
    getUsers();
  }, [getUsers]);

  const handleClick = (user) => {
    setSelectedUser(user);
    navigate(`/send/${user._id}`);

  }

  if(isLoadingUsers){
    return <div>Loading ...</div>
  };

  return (
    <div>
      {/* TODO: implement search */}
      <input 
        placeholder='Search for a User'
      />

      <div>
        {users.map((user) => (
            <button
                key = {user._id}
                onClick={() => handleClick(user)}
            >
                <div>{user.userName}</div>
                <div>{user.email}</div>
            </button>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
