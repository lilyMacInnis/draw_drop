import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import Drawing from './Drawing';
import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

const SentContainer = () => {
  const {drawingsFromUser, getDrawingsFromUser, isLoadingDrawings} = useDrawStore();
  const reversedDrawingsToUser = [...drawingsFromUser].reverse();
  const {authUser} = useAuthStore();

  useEffect( () => {
    getDrawingsFromUser();
  }, [getDrawingsFromUser]);

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
                    (authUser._id == drawing.receiverId) ? (
                        <>
                            sent to: You
                        </>
                    ) : (
                        <>
                            <div>Sent to: <Link to={`/send/${drawing.receiverId}`}>{drawing.recieverUserName}</Link></div>
                        </>
                    )
                }
                <time>{drawing.createdAt}</time>

            </div>
        </div>
      ))}
    </div>
  )
}

export default SentContainer
