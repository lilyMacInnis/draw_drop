import React, { useEffect, useState } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import UsersContainer from '../components/UsersContainer';

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

  return (
    <div className='bg-background h-full min-h-screen pr-10 pl-10 pb-5 pt-5'>

      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <SearchIcon className='size-5 text-primary'/>
        </div>
        <input 
          placeholder='Search for a User'
          onChange={(e) => setSearch(e.target.value)}
          className='w-full pl-10 pr-3 py-2 rounded-full bg-bgUltra border border-bgDark outline-none focus:border-primaryl/50 focus:border-2 text-textPrimary'
        />
      </div>

      <UsersContainer
        users={users}
        handleClick={handleClick}
        isLoadingUsers={isLoadingUsers}
        search={search}
      />
    </div>
  )
}

export default SearchPage
