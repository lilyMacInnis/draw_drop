import React, { useState } from 'react'
// import { useDrawStore } from '../store/useDrawStore';
// import { useNavigate } from 'react-router';
//import { useAuthStore } from '../store/useAuthStore';
import Canvas from '../components/Canvas';

const SendPage = () => {
  //const [imageUrl, setImageUrl] = useState("");
  const [isAnon, setisAnon] = useState(true);
  //const {sendDrawing, isSendingDrawing} = useDrawStore();
  //const {authUser} = useAuthStore();
  //const navigate = useNavigate();

  let width;
  let height;

  if(window.innerWidth < window.innerHeight){
    width = height = window.innerWidth * 0.6;
  } else {
    width = height = window.innerHeight * 0.6;
  }

  return (
    <div className='h-screen bg-background'>

      

      <Canvas width={width} height={height} isAnon={isAnon} setisAnon={setisAnon} />
    </div>
  )
}

export default SendPage
