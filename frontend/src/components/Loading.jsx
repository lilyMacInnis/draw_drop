import React from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Loading = (props) => {
  return(
        <div className='h-screen w-screen bg-background flex flex-col items-center justify-center align-center'>
            <RestartAltIcon fontSize='text-3xl' className='text-5xl text-textl/70 animate-spin'/>
            <div className='text-textl/70 text-3xl'>{props.text}</div>
        </div>
    )
}

export default Loading
