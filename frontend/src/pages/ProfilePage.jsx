import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Input from '../components/Input';

const ProfilePage = () => {
  const {
    authUser,
    checkAuth,
    isCheckingAuth,
    isUpdatingProfilePic,
    isUpdatingUserName,
    updateProfilePic,
    updateUserName,
  } = useAuthStore();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="text-center mt-10 text-textl">Loading...</div>;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfilePic({ profilePic: base64Image });
    };
  };

  const handleUserNameChange = async (e) => {
    if (e.key !== 'Enter') return;
    const userName = e.target.value;
    if (!userName) return;
    await updateUserName({ userName });
  };

  return (
    <div className="bg-background min-h-screen pt-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-bgUltra border border-bgDark rounded-2xl p-4 sm:p-6 space-y-6 sm:space-y-8">
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl text-textl font-semibold">Profile</h1>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative w-28 h-28 sm:size-32">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfilePic ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <AddAPhotoOutlinedIcon className="size-5 bg-accent text-white rounded-xl p-1" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfilePic}
                />
              </label>
            </div>

            <p className="text-xs sm:text-sm text-textl text-center px-2">
              {isUpdatingProfilePic
                ? "Uploading..."
                : "Click the camera icon to update your profile image"}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 w-full">
            
            <div>
              {
                isUpdatingUserName ? (
                  <>
                    <div className='text-textl flex items-center'>Updating...</div>
                  </>
                ) : (
                  <>
                    <Input
                      Icon={<PersonIcon />}
                      name={
                        <div className="flex justify-between items-end">
                          <span>Username:</span>
                          <span className="text-xs text-textl">Click to edit</span>
                        </div>
                      }
                      type="text"
                      placeholder="Username"
                      defaultValue={authUser?.userName}
                      onKeyDown={handleUserNameChange}
                      disabled={isUpdatingUserName}
                    />
                  </>
                )
              }
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-textl">Email:</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-primary">
                  <EmailIcon />
                </div>
                <input
                  defaultValue={authUser?.email}
                  disabled
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-background/40 border border-bgDark text-textl outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


// import React, { useEffect, useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore'
// import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import Input from '../components/Input';

// const ProfilePage = () => {
//   const {authUser, checkAuth, isCheckingAuth, isUpdatingProfile, updateProfilePic, updateUserName} = useAuthStore();
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if(isCheckingAuth){
//     return <div>Loading...</div>
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if(!file) return;

//     const reader = new FileReader();

//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//         const base64Image = reader.result;
//         setSelectedImage(base64Image);
//         await updateProfilePic({profilePic: base64Image});
//     }
//   };

//   const handleUserNameChange = async (e) => {
//     if(e.key !== "Enter") return;

//     const userName = e.target.value;
//     if(!userName) return;

//     await updateUserName({userName: userName});
//   };

//   return (
//     <div className='bg-background h-screen pt-10'>
//         <div className='max-w-xl mx-auto p-4'>
//             <div className='bg-bgUltra border border-bgDark rounded-2xl p-6 space-y-8'>
//                 <div className='flex flex-col items-center gap-4'>
//                     <div className="text-center">
//                         <h1 className="text-2xl text-textl font-semibold ">Profile</h1>
//                     </div>

//                     <div className='relative size-32'>
//                         <img
//                             src={selectedImage || authUser.profilePic || "/avatar.png"}
//                             alt="Profile"
//                             className='size-32 rounded-full object-cover'
//                         />

//                         <label
//                             htmlFor='avatar-upload'
//                             className={`
//                                 absolute bottom-0 right-0
//                                 hover:scale-105
//                                 p-2 rounded-full cursor-pointer
//                                 transion-all duration-200
//                                 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
//                             `}
//                         >
//                             <AddAPhotoOutlinedIcon className='size-5 bg-primary text-white rounded-xl p-1'/>
//                             <input
//                                 type='file'
//                                 id='avatar-upload'
//                                 className='hidden'
//                                 accept='image/*'
//                                 onChange={handleImageUpload}
//                                 disabled={isUpdatingProfile}
//                             />
//                         </label>
//                     </div>
//                     <div>
//                         <p className='text-xs text-textl'>
//                             {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update you profile image"}
//                         </p>
//                     </div>

//                     <div className='space-y-1 w-full pb-3 px-7'>
//                         <div>
//                             <Input
//                                 Icon={<PersonIcon />}
//                                 name={
//                                     <>
//                                         <div className='flex justify-between items-end gap-0'>
//                                             <div>Username:</div>
//                                             <div className='text-xs text-textl'>Click to edit</div>
//                                         </div>
//                                     </>
//                                 }
//                                 type='text'
//                                 placeholder='Username'
//                                 defaultValue={`${authUser?.userName}`}
//                                 onKeyDown={handleUserNameChange}
//                             />
//                         </div>

//                         <div>
//                             <div className='flex flex-col gap-1'>
//                                 <div className='text-base text-textl'>
//                                     Email:
//                                 </div>
//                                 <div className='relative mb-1'>
//                                     <div className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-primary'>
//                                         <EmailIcon />
//                                     </div>
//                                     <input
//                                         defaultValue={`${authUser?.email}`}
//                                         disabled
//                                         className='w-full pl-10 pr-2 py-1.5 outline-none rounded-lg bg-background/40 border border-bgDark text-textl transition duration-200'
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ProfilePage
