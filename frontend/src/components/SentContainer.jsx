import React, { useEffect } from 'react'
import { useDrawStore } from '../store/useDrawStore'
import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatDistanceToNow } from "date-fns";
import Loading from './Loading';

const SentContainer = () => {
  const {drawingsFromUser, getDrawingsFromUser, isLoadingDrawings, deleteDrawing, isDeleting} = useDrawStore();
  const reversedDrawingsToUser = [...drawingsFromUser].reverse();
  const {authUser} = useAuthStore();

  useEffect( () => {
    getDrawingsFromUser();
  }, [getDrawingsFromUser, isDeleting]);

  const formatDate = (date) => {
      return formatDistanceToNow(date, {addSuffix: true});
   };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this drawing?")) return;

    try{
        await deleteDrawing(id);
    } catch (error){
        console.log("Failed to delete drawing: ", error);
    }
  };

  if (isLoadingDrawings){
    return(
        <Loading text='Loading Drawings...' />
    )
  };

  if(drawingsFromUser.length < 1){
    return(
        <div className='h-screen w-screen bg-background flex items-center justify-center text-xl text-textl/50'>
            No drawings... :{'('}
        </div>
    )
  };

  return (
    <div className='h-screen w-screen bg-background grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pr-7 items-center'>
      {reversedDrawingsToUser.map((drawing) => (
        <div key={drawing._id}>
            {/* <Drawing
                drawing={drawing}
                isInSent={false}
            /> */}

            <div className='flex flex-col'>
                <div>
                    {
                        (authUser._id == drawing.receiverId) ? (
                            <>
                                <div className='w-full bg-bgUltra border-2 border-primary text-textl rounded-t-lg px-2 py-1'>
                                    Sent to: You
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='w-full bg-bgUltra border-2 border-primary text-textl rounded-t-lg px-2 py-1'>
                                    Sent to: <Link className='text-primary hover:underline' to={`/send/${drawing.receiverId}`}>{drawing.receiverUserName}</Link>
                                </div>
                            </>
                        )
                    }
                </div>

                <div className='text-textl'>
                    {
                        drawing.image ? (
                            <>
                                <img
                                    src={drawing.image}
                                    alt="drawing"
                                    className='w-full border-x-2 border-primary'
                                />
                            </>
                        ) : (
                            <>
                                Image url failed to send
                            </>
                        )
                    }
                    </div>

                <div className='flex justify-between bg-bgUltra border-2 border-primary rounded-b-lg px-2 py-1'>
                    <div className='text-textl'>
                        {formatDate(new Date(drawing.createdAt))}
                    </div>

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

export default SentContainer
