import React, { useEffect, useState } from 'react'
import InboxContainer from '../components/InboxContainer'
import { useAuthStore } from '../store/useAuthStore'
import SentContainer from '../components/SentContainer';
import Loading from '../components/Loading';

const InboxPage = () => {
  const {checkAuth, isCheckingAuth} = useAuthStore();
  const [isInbox, setIsInbox] = useState(true);

  useEffect( () => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth){
    return <Loading text='Loading...'/>
  }

  return (
    <div className='h-full w-full bg-background'>

      <div className='flex flex-col gap-4 pt-5 pl-7 bg-background'>
        <div className="relative">
          <label className="relative block w-[6.75rem] h-6">
            <input
              type="checkbox"
              checked={!isInbox}
              onChange={() => setIsInbox(!isInbox)}
              className="sr-only peer"
            />
            <div className="absolute w-full h-full bg-background hover:bg-primary/20 ring-1 ring-bgDark rounded-full
                peer peer-checked:after:translate-x-[3.75rem] rtl:peer-checked:after:-translate-x-full peer-checked:after:w-12 
                after:absolute  after:bg-bgUltra after:border after:border-bgDark after:rounded-full after:h-6 after:w-[3.65rem] after:transition-all" />
            <span className="absolute left-2 bottom-[0.1rem] text-textl transition-transform duration-300 peer-checked:text-textl/50">
              Inbox
            </span>
            <span className="absolute left-[4.25rem] peer-checked:inline text-textl/50 peer-checked:text-textl transition-transform duration-300">
              Sent
            </span>
          </label>
        </div>

        {
          (isInbox) ? (
            <InboxContainer />
          ) : (
            <SentContainer />
          )
        }
      </div>
      
    </div>
  )
}

export default InboxPage
