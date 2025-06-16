import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'

const SearchPage = () => {
  const {users, isLoadingUsers, getUsers} = useDrawStore();

  useEffect( () => {
    getUsers();
  }, [getUsers]);

  if(isLoadingUsers){
    return <div>Lodaing ...</div>
  };

  return (
    <div>
      {/* TODO: implement search */}
      <input 
        placeholder='Search for a User'
      />

      <div>
        
      </div>
    </div>
  )
}

export default SearchPage
