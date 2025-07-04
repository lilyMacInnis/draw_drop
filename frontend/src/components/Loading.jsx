import React from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Loading = (props) => {
  return(
        <div className='h-screen w-screen bg-background flex flex-col items-center justify-center align-center'>
            <RestartAltIcon className='size-10xl text-9xl text-textl/70 animate-spin'/>
            <div className='text-textl/70'>{props.text}</div>
        </div>
    )
}

export default Loading
