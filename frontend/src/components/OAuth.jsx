import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore.js';

const OAuth = (props) => {

  const auth = getAuth(app);
  const {signupWithGoogle} = useAuthStore();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: "select_account"});

    try{
        const googleResults = await signInWithPopup(auth, provider);
        await signupWithGoogle({
            username: googleResults.user.displayName,
            email: googleResults.user.email,
            profilePic: googleResults.user.photoURL
        });
        toast.success("Signed up successfully");
    } catch (error){
        console.log(error);
        return toast.error("Something went wrong: " + error);
    }

  };

  return (
    <div className='w-full flex flex-col gap-3 mt-2'>
        <button type='button'
            className='bg-bgUltra text-textPrimary text-lg font-semibold w-full border-2 border-accent hover:bg-accent hover:text-white rounded-lg p-1'
        >
            <GoogleIcon className='mb-1 mr-2'/>
            {props.text} with Google
        </button>

        <button 
            type='button'
            onClick={handleGoogleClick}
            className='bg-bgUltra text-textPrimary text-lg font-semibold w-full border-2 border-accent hover:bg-accent hover:text-white rounded-lg p-1'
        >
            <TwitterIcon className='mb-1 mr-2'/>
            {props.text} with Twitter
        </button>
    </div>
  )
}

export default OAuth
