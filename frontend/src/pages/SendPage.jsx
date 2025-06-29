import React, { useState } from 'react'
// import { useDrawStore } from '../store/useDrawStore';
// import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import Canvas from '../components/Canvas';

const SendPage = () => {
  //const [imageUrl, setImageUrl] = useState("");
  const [isAnon, setisAnon] = useState(true);
  //const {sendDrawing, isSendingDrawing} = useDrawStore();
  const {authUser} = useAuthStore();
  //const navigate = useNavigate();

  return (
    <div className='h-screen bg-background'>

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

      

      <Canvas width={400} height={200} isAnon={isAnon} />
    </div>
  )
}

export default SendPage
