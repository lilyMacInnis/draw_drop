import React, { useState } from 'react'
import { useDrawStore } from '../store/useDrawStore';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

const SendPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isAnon, setisAnon] = useState(true);
  const {sendDrawing, isSendingDrawing} = useDrawStore();
  const {authUser} = useAuthStore();
  const navigate = useNavigate();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!imageUrl) return;

    try{
      await sendDrawing({
        image: imageUrl,
        isAnon: isAnon
      })
    } catch (error){
      console.log("Failed to send drawing: ", error);
    }

    navigate('/search');
  };

  return (
    <div>

      {authUser && 
        <button onClick={() => setisAnon(!isAnon)}>
          Anon:
          {
            isAnon ? (
              <>
                yes
              </>
            ) : (
              <>
                no
              </>
            )
          }
        </button>
      }

      <form onSubmit={handleSendMessage}>

        <input
          type='text'
          placeholder='imageurl'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          type='submit'
          disabled={!imageUrl.trim() || isSendingDrawing}
        >
          {
            isSendingDrawing ? (
              <>
                Sending...
              </>
            ) : (
              <>
                Send
              </>
            )
          }
        </button>
      </form>
    </div>
  )
}

export default SendPage
