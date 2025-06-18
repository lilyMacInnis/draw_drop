import React, { useState } from 'react'
import { useDrawStore } from '../store/useDrawStore';

const SendPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isAnon, setisAnon] = useState(true);
  const {sendDrawing, isSendingDrawing} = useDrawStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!imageUrl) return;

    try{
      await sendDrawing({
        image: imageUrl,
        isAnon,
      })
    } catch (error){
      console.log("Failed to send drawing: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <button onClick={setisAnon(!isAnon)}>
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
