import React, { useEffect, useState } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import { useNavigate } from 'react-router';

const SearchPage = () => {
  const {users, isLoadingUsers, getUsers, setSelectedUser} = useDrawStore();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect( () => {
    getUsers();
  }, [getUsers]);

  const handleClick = (user) => {
    setSelectedUser(user);
    navigate(`/send/${user._id}`);

  };

  const handleSearch = (user) => {

    // if(search.toLowerCase() === ''){
    //   return user;
    // } else {
    //   return user.userName.toLowerCase().includes(search)  || user.email.toLowerCase().includes(search);
    // };

    return search.toLowerCase() === '' ? user : user.userName.toLowerCase().includes(search);
};

  if(isLoadingUsers){
    return <div>Loading ...</div>
  };

  return (
    <div>
      {/* TODO: implement search */}
      <input 
        placeholder='Search for a User'
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {users.filter((user) => {
          return search.toLowerCase() === '' ? user : user.userName.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
        }).map((user) => (
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
