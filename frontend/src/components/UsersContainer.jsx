import React from 'react'
import Loading from './Loading';
import SearchIcon from '@mui/icons-material/Search';

const UsersContainer = (props) => {
  if(props.isLoadingUsers){
    return(
        <Loading text='Fetching Users...'/>
    )
  };

  if(props.search.length == 0){
    return(
      // <div className='flex items-center justify-center text-textl/30 pt-10'>
      //   <SearchIcon fontSize='text-3xl' className='text-5xl pr-3'/>
      //   <div className='text-2xl'>Search for a User</div>
      // </div>
      <div className='pt-5'>
        {props.users.map((user) => (
            <div className='flex flex-row' key = {user._id}>
              <button
                onClick={() => props.handleClick(user)}
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
    )
  };

  if(props.search.length != 0 && props.users.length == 0){
    return (
      <div className='flex items-center justify-center text-textl/30 pt-10'>
        <div className='text-2xl'>"{props.search}" was not found</div>
      </div>
    )
  };

  return (
    <div className='pt-5'>
        {props.users.map((user) => (
            <div className='flex flex-row' key = {user._id}>
              <button
                onClick={() => props.handleClick(user)}
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
  )
}

export default UsersContainer
