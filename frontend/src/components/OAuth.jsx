import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const OAuth = (props) => {
  return (
    <div className='w-full flex flex-col gap-3 mt-2'>
        <button type='button'
            className='bg-bgUltra text-textPrimary text-lg font-semibold w-full border-2 border-accent hover:bg-accent hover:text-white rounded-lg p-1'
        >
            <GoogleIcon className='mb-1 mr-2'/>
            {props.text} with Google
        </button>

        <button type='button'
            className='bg-bgUltra text-textPrimary text-lg font-semibold w-full border-2 border-accent hover:bg-accent hover:text-white rounded-lg p-1'
        >
            <TwitterIcon className='mb-1 mr-2'/>
            {props.text} with Twitter
        </button>
    </div>
  )
}

export default OAuth
