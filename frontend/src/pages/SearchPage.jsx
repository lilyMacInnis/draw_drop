import React, { useEffect, useState } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';

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

  if(isLoadingUsers){
    return <div>Loading ...</div>
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

      <div className='pt-5'>
        {users.filter((user) => {
          return search.toLowerCase() === '' ? user : user.userName.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
        }).map((user) => (
            <div className='flex flex-row'>
              <button
                key = {user._id}
                onClick={() => handleClick(user)}
                className='flex items-start border border-bgDark w-full hover:bg-bgUltra/70'
              >
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt="Profile"
                  className='size-14 p-[0.375rem] rounded-full'
                />
                <div className='relative flex items-start gap-y-0'>
                  <div className='absolute text-lg pt-2 pl-1 pb-0 text-textPrimary'>
                    {user.userName}
                  </div>
                  <div className=' text-sm pt-7 pb-1 pl-4 text-textl/60'>
                    {user.email}
                  </div>
                </div>
              </button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
