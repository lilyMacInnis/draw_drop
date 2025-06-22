import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const ProfilePage = () => {
  const {authUser, checkAuth, isCheckingAuth, isUpdatingProfile, updateProfilePic, updateUserName} = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth){
    return <div>Loading...</div>
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfilePic({profilePic: base64Image});
    }
  };

  return (
    <div className='h-screen pt-20 max-w-2xl mx-auto p-4 py-8 bg-base-300 rounded-xl p-6 space-y-8'>
        <div className='flex flex-col items-center gap-4'>
            <div className='relative size-32'>
                <img
                    src={selectedImage || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className='size-32 rounded-full object-cover border-4'
                />

                <label
                    htmlFor='avatar-upload'
                    className={`
                        absolute bottom-0 right-0
                        hover:scale-105
                        p-2 rounded-full cursor-pointer
                        transion-all duration-200
                        ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                >
                    <AddAPhotoOutlinedIcon className='size-5 bg-slate-300 rounded-xl p-1'/>
                    <input
                        type='file'
                        id='avatar-upload'
                        className='hidden'
                        accept='image/*'
                        onChange={handleImageUpload}
                        disabled={isUpdatingProfile}
                    />
                </label>
            </div>
            <div>
                <p className='text-sm'>
                    {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update you profile image"}
                </p>
            </div>

            <div>
                <div>
                    Username: 
                    <input
                        type='text'
                        value={`${authUser?.userName}`}
                    />
                </div>

                <div>
                    Email
                    <p>{`${authUser?.email}`}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage
