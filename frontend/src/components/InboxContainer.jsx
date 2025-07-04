import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import Drawing from './Drawing';
import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const InboxContainer = () => {
  const {drawingsToUser, getDrawingsToUser, isLoadingDrawings, deleteDrawing, isDeleting} = useDrawStore();
  const reversedDrawingsToUser = [...drawingsToUser].reverse();
  const {authUser} = useAuthStore();

  useEffect( () => {
    getDrawingsToUser();
  }, [getDrawingsToUser, isDeleting]);

  if (isLoadingDrawings){
    return <div>Loading...</div>
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this drawing?")) return;

    try{
        await deleteDrawing(id);
    } catch (error){
        console.log("Failed to delete drawing: ", error);
    }
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
                
                <div className='flex justify-between bg-background border-2 border-primary rounded-b-lg px-2 py-1'>
                    <time>{drawing.createdAt}</time>

                    <div>
                        {/* <button className='text-primary hover:text-primaryl' >
                            <SaveIcon />
                        </button> */}
                        <button className='text-red-600 hover:text-red-400' onClick={() => handleDelete(drawing._id)}>
                            <DeleteOutlineIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default InboxContainer
