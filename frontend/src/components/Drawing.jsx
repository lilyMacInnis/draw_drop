import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuthStore } from '../store/useAuthStore';
import { useDrawStore } from '../store/useDrawStore';

const Drawing = (drawing, isInSent) => {
  const {authUser} = useAuthStore();
  const {deleteDrawing, isDeleting} = useDrawStore();

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this drawing?")){
      await deleteDrawing(id);
    }
  };

  if(isDeleting){
    return <div>Deleting...</div>
  };

  return (
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
        (!isInSent && 
          (drawing.senderId) && (

            (drawing.senderId == authUser._id) ? (
              <>
                <div>Sent by: You</div>
              </>
            ) : (
              (!drawing.isAnon) && (
                <>
                  <div>Sent by: <Link to={`/send/${drawing.senderId}`}>{drawing.senderUserName}</Link></div>
                </>
              )
            )
          )
        )
      }

      {
        (isInSent && 
          (authUser._id == drawing.receiverId) ? (
            <>
              sent to: You
            </>
          ) : (
            <>
              <div>Sent to: <Link to={`/send/${drawing.receiverId}`}>{drawing.recieverUserName}</Link></div>
            </>
          )
        )
      }
      <time>{drawing.createdAt}</time>

      <button onClick={handleDelete(drawing._id)}>
        <DeleteOutlineOutlinedIcon />
      </button>

    </div>
  )
}

export default Drawing
