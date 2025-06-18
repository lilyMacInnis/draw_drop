import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import { useAuthStore } from '../store/useAuthStore';

const InboxContainer = () => {
  const {drawingsToUser, getDrawingsToUser, isLoadingDrawings} = useDrawStore();
  const {authUser} = useAuthStore();

  useEffect( () => {
    getDrawingsToUser();
  }, [getDrawingsToUser]);

  if (isLoadingDrawings){
    return <div>Loading...</div>
  };

  return (
    <div>
      
    </div>
  )
}

export default InboxContainer
