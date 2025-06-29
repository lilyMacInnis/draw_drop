import React from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const UsersContainer = (props) => {
  if(props.isLoadingUsers){
    return(
        <div className='h-screen w-screen flex flex-col items-center justify-center align-center'>
            <RestartAltIcon className='size-10xl text-9xl text-textl/70 animate-spin'/>
            <div className='text-textl/70'>Fetching Users...</div>
        </div>
    )
  }

  return (
    <div className='pt-5'>
        {props.users.filter((user) => {
          return props.search.toLowerCase() === '' ? user : user.userName.toLowerCase().includes(props.search) || user.email.toLowerCase().includes(props.search);
        }).map((user) => (
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
