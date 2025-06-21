import React, { useEffect, useState } from 'react'
import InboxContainer from '../components/InboxContainer'
import { useAuthStore } from '../store/useAuthStore'
import SentContainer from '../components/SentContainer';

const InboxPage = () => {
  const {checkAuth, isCheckingAuth} = useAuthStore();
  const [isInbox, setIsInbox] = useState(true);

  useEffect( () => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth){
    return <div>Loading ...</div>
  }

  return (
    <div>

      <button onClick={() => {setIsInbox(true)}}>Inbox</button>
      <button onClick={() => {setIsInbox(false)}}>Sent</button>

      {
        (isInbox) ? (
          <InboxContainer />
        ) : (
          <SentContainer />
        )
      }
      
    </div>
  )
}

export default InboxPage
