import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import Drawing from './Drawing';
import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

const InboxContainer = () => {
  const {drawingsToUser, getDrawingsToUser, isLoadingDrawings} = useDrawStore();
  const reversedDrawingsToUser = [...drawingsToUser].reverse();
  const {authUser} = useAuthStore();

  useEffect( () => {
    getDrawingsToUser();
  }, [getDrawingsToUser]);

  if (isLoadingDrawings){
    return <div>Loading...</div>
  };

  return (
    <div>
      {reversedDrawingsToUser.map((drawing) => (
        <div key={drawing._id}>
            {/* <Drawing
                drawing={drawing}
                isInSent={false}
            /> */}

            <div className='flex flex-row'>
                {
                    drawing.image ? (
                        <>
                            <img
                                src={drawing.image}
                                alt="drawing"
                            />
                        </>
                    ) : (
                        <>
                            Image url failed to send
                        </>
                    )
                }

                {
                    (!drawing.isAnon && drawing.senderId) && (

                        (drawing.senderId == authUser._id) ? (
                            <>
                                <div>Sent by: You</div>
                            </>
                        ) : (
                            <>
                                <div>Sent by: <Link to={`/send/${drawing.senderId}`}>{drawing.senderUserName}</Link></div>
                            </>
                        )
                    )
                }
                <time>{drawing.createdAt}</time>

            </div>
        </div>
      ))}
    </div>
  )
}

export default InboxContainer
