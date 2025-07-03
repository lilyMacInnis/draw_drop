import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import Drawing from './Drawing';
import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import SaveIcon from '@mui/icons-material/Save';

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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pr-7'>
      {reversedDrawingsToUser.map((drawing) => (
        <div key={drawing._id}>
            {/* <Drawing
                drawing={drawing}
                isInSent={false}
            /> */}

            <div className='flex flex-col'>
                <div>
                    {
                        (drawing.senderId) && (

                            (drawing.senderId == authUser._id) ? (
                                <>
                                    <div className='w-full bg-background border-2 border-primary text-textl rounded-t-lg px-2 py-1'>
                                        Sent by: You
                                    </div>
                                </>
                            ) : (
                                (!drawing.isAnon) && (
                                    <>
                                        <div className='w-full bg-background border-2 border-primary text-textl rounded-t-lg px-2 py-1'>
                                            Sent by: <Link className='text-primary hover:underline' to={`/send/${drawing.senderId}`}>{drawing.senderUserName}</Link>
                                        </div>
                                    </>
                                )
                            )
                        )
                    }
                </div>
                
                <div>
                    {
                        drawing.image ? (
                            <>
                                <img
                                    src={drawing.image}
                                    alt="drawing"
                                    className={`w-full ${
                                        (drawing.senderId && !drawing.isAnon) || (drawing.senderId == authUser._id) ? (
                                            `border-x-2 border-primary`
                                        ) : (
                                            `border-x-2 border-t-2 border-primary rounded-t-lg`
                                        )
                                    }`}
                                />
                            </>
                        ) : (
                            <>
                                Image url failed to send
                            </>
                        )
                    }
                </div>
                
                <div className='bg-background border-2 border-primary rounded-b-lg px-2 py-1'>
                    <time>{drawing.createdAt}</time>
                </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default InboxContainer
