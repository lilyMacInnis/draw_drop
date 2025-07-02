import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router';
import { useThemeStore } from '../store/useThemeStore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const { authUser, logout, profilePic } = useAuthStore();
  const [isDark, setIsDark] = useState(false);
  const { setTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setTheme(newTheme ? 'dark' : 'light');
  };

  return (
    <header className="bg-bgUltra border-b-2 border-bgDark w-full top-0 z-40">
      <div className="container mx-auto px-4 h-14">
        <div className="flex items-center justify-between h-full">

          <Link to="/" className="flex items-center gap-2.5">
            <h1 className="size-10 text-2xl font-extrabold text-primary hover:text-primaryl rounded-lg flex items-center justify-center">
              Logo
            </h1>
          </Link>

          <div className="flex items-center gap-3 md:gap-8">
            
            <div className="relative ">
              <label className="relative block w-14 h-7">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={handleChangeTheme}
                  className="sr-only peer"
                />
                <div className="absolute w-full h-full bg-background hover:bg-primary/20 ring-1 ring-bgDark rounded-full
                    peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
                    after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all" />
                <span className="absolute left-1 transition-transform duration-300 peer-checked:hidden">
                  <LightModeIcon className="p-0.5 text-background" />
                </span>
                <span className="absolute left-7 hidden peer-checked:inline transition-transform duration-300">
                  
                  <DarkModeIcon className="p-0.5 text-background" />
                </span>
              </label>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <CloseIcon className='text-primary'/> : <MenuIcon className='text-primary'/>}
            </button>

            <div className="hidden md:flex items-center gap-5">
              {authUser ? (
                <>
                  <Link to="/profile" className="flex items-center rounded-xl border border-bgDark bg-bgUltra hover:bg-background">
                    <img src={authUser.profilePic || profilePic || "/avatar.png"} alt="Profile" className="size-8 p-[0.1875rem] rounded-full" />
                    <span className="text-textl mr-1">Profile</span>
                  </Link>
                  <Link to="/inbox" className="rounded-xl border border-bgDark bg-bgUltra hover:bg-background flex items-center pl-0.5 pr-2">
                    <InboxIcon className="p-[0.1875rem] text-primary" />
                    <span className="text-textl">Inbox</span>
                  </Link>
                  <button onClick={logout} className="rounded-xl border border-bgDark bg-bgUltra hover:bg-background flex items-center pl-0.5 pr-2">
                    <LogoutIcon className="p-[0.1875rem] text-primary" />
                    <span className="text-textl">Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="rounded-lg border-2 border-background bg-bgUltra hover:bg-background flex items-center pl-0.5 pr-2">
                  <LoginIcon className="p-[0.1875rem] text-primary" />
                  <span className="text-textl">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-bgUltra border-t border-background px-4 py-3 space-y-4">
          {authUser ? (
            <div className="flex flex-col gap-3">
              <Link to="/profile" className="flex items-center gap-2 text-textl">
                <img src={authUser.profilePic || "/avatar.png"} alt="Profile" className="size-6 rounded-full" />
                Profile
              </Link>
              <Link to="/inbox" className="flex items-center gap-2 text-textl">
                <InboxIcon className='text-primary'/>
                Inbox
              </Link>
              <button onClick={logout} className="flex items-center gap-2 text-textl">
                <LogoutIcon className='text-primary'/>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-textl">
              <LoginIcon className='text-primary'/>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;


// import React, { useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { Link } from 'react-router';
// import { useThemeStore } from '../store/useThemeStore';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import InboxIcon from '@mui/icons-material/Inbox';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';

// const Navbar = () => {
//   const { authUser, logout } = useAuthStore();
//   const [isDark, setIsDark] = useState(false);
//   const { setTheme } = useThemeStore();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleChangeTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);
//     localStorage.setItem('theme', newTheme ? 'dark' : 'light');
//     setTheme(newTheme ? 'dark' : 'light');
//   };

//   return (
//     <header className="bg-bgUltra border-b-2 border-background w-full top-0 z-40">
//       <div className="container mx-auto px-4 h-14">
//         <div className="flex items-center justify-between h-full">
//           <Link to="/" className="flex items-center gap-2.5">
//             <h1 className="size-10 text-2xl font-extrabold text-primary hover:text-primaryl rounded-lg flex items-center justify-center">
//               Logo
//             </h1>
//           </Link>

//           {/* Hamburger button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <CloseIcon /> : <MenuIcon />}
//           </button>

//           {/* Desktop nav */}
//           <div className="hidden md:flex items-center gap-20">
//             {/* Dark mode toggle */}
//             <div className='relative bottom-3'>
//                <label>
//                  <input
//                   type='checkbox'
//                   checked={isDark}
//                   onChange={handleChangeTheme}
//                   className='sr-only peer'
//                 />
//                 {/*peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary */}
//                 <div className='absolute w-14 h-7 bg-background hover:bg-primary/20  ring-2 ring-background rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
//                   after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all'
//                 />
//                 <span className='absolute left-1 transition-transform duration-300 peer-checked:hidden'>
//                   <DarkModeIcon className='p-0.5 text-background'/>
//                 </span>
//                 <span className='absolute left-7 hidden peer-checked:inline transition-transform duration-300'>
//                   <LightModeIcon className='p-0.5 text-background'/>
//                 </span>
//               </label>
//              </div>

//             {authUser ? (
//               <div className="flex items-center gap-5">
//                 <Link to="/profile" className="flex items-center rounded-xl border border-bgDark bg-bgUltra hover:bg-background">
//                   <img src={authUser.profilePic || "/avatar.png"} alt="Profile" className="size-8 p-[0.1875rem] rounded-full" />
//                   <span className="font-semibold text-primary mr-1">Profile</span>
//                 </Link>
//                 <Link to="/inbox" className="rounded-xl border border-bgDark bg-bgUltra hover:bg-background flex items-center gap-1 px-2">
//                   <InboxIcon className="text-primary" />
//                   <span className="font-semibold text-primary">Inbox</span>
//                 </Link>
//                 <button onClick={logout} className="rounded-xl border border-bgDark bg-bgUltra hover:bg-background flex items-center gap-1 px-2">
//                   <LogoutIcon className="text-primary" />
//                   <span className="font-semibold text-primary">Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <Link to="/login" className="rounded-lg border-2 border-background bg-bgUltra hover:bg-background flex items-center gap-1 px-2">
//                 <LoginIcon className="text-primary" />
//                 <span className="font-semibold text-primary">Login</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-bgUltra border-t border-background px-4 py-3 space-y-4">
//           {/* Dark mode toggle */}
//           <div className="flex items-center gap-20">
//             <label className="relative mb-5">
//               <input
//                 type="checkbox"
//                 checked={isDark}
//                 onChange={handleChangeTheme}
//                 className="sr-only peer"
//               />
//               <div className="absolute w-14 h-7 bg-background hover:bg-primary/20 ring-2 ring-background rounded-full
//                 peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
//                 after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all" />
//               <span className="absolute left-1 transition-transform duration-300 peer-checked:hidden">
//                 <DarkModeIcon className="p-0.5 text-background" />
//               </span>
//               <span className="absolute left-7 hidden peer-checked:inline transition-transform duration-300">
//                 <LightModeIcon className="p-0.5 text-background" />
//               </span>
//             </label>
//           </div>

//           {authUser ? (
//             <div className="flex flex-col gap-3">
//               <Link to="/profile" className="flex items-center gap-2 text-primary">
//                 <img src={authUser.profilePic || "/avatar.png"} alt="Profile" className="size-6 rounded-full" />
//                 Profile
//               </Link>
//               <Link to="/inbox" className="flex items-center gap-2 text-primary">
//                 <InboxIcon />
//                 Inbox
//               </Link>
//               <button onClick={logout} className="flex items-center gap-2 text-primary">
//                 <LogoutIcon />
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link to="/login" className="flex items-center gap-2 text-primary">
//               <LoginIcon />
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore'
// import { Link } from 'react-router';
// import { useThemeStore } from '../store/useThemeStore';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import InboxIcon from '@mui/icons-material/Inbox';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';

// const Navbar = () => {
//   const {authUser, logout} = useAuthStore();
//   const [isDark, setIsDark] = useState(false);
//   const {setTheme} = useThemeStore();

//   const handleChangeTheme = () => {
//     setIsDark(!isDark);

//     if(isDark){
//       localStorage.setItem("theme", "dark");
//       setTheme("dark");
//     } else{
//       localStorage.setItem("theme", "light");
//       setTheme("light")
//     }
//   };

//   return (
//     <header className='bg-bgUltra border-b-2 border-background w-full top-0 z-40'>
//       <div className='container mx-auto px-4 h-14'>
//         <div className='flex items-center justify-between h-full'>
//           <div className='flex items-center gap-8'>
//             <Link to="/" className='flex items-center gap-2.5 transition-all'>
//               <h1 className='size-10 text-2xl font-extrabold text-primary hover:text-primaryl rounded-lg flex items-center justify-center'>Logo</h1>
//             </Link>
//           </div>

//           <div className='flex items-center gap-20'>

//             <div className='relative bottom-3'>
//               <label>
//                 <input
//                   type='checkbox'
//                   checked={isDark}
//                   onChange={handleChangeTheme}
//                   className='sr-only peer'
//                 />
//                 {/*peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary */}
//                 <div className='absolute w-14 h-7 bg-background hover:bg-primary/20  ring-2 ring-background rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
//                   after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all'
//                 />
//                 <span className='absolute left-1 transition-transform duration-300 peer-checked:hidden'>
//                   <DarkModeIcon className='p-0.5 text-background'/>
//                 </span>
//                 <span className='absolute left-7 hidden peer-checked:inline transition-transform duration-300'>
//                   <LightModeIcon className='p-0.5 text-background'/>
//                 </span>
//               </label>
//             </div>
            

//             {authUser && (
//               <>
//                 <div className='flex items-center gap-5'>
//                   <Link to="/profile" className='flex items-center rounded-xl border border-bgDark bg-bgUltra hover:bg-background'>
//                     <img
//                       src={authUser.profilePic || "/avatar.png"}
//                       alt="Profile"
//                       className='size-8 p-[0.1875rem] rounded-full'
//                     />
//                     <span className='font-semibold text-primary mr-1'>Profile</span>
//                   </Link>

//                   <Link to="/inbox" className='rounded-xl border border-bgDark bg-bgUltra hover:bg-background'>
//                     <InboxIcon className='p-[0.1875rem] text-primary'/>
//                     <span className='font-semibold text-primary mr-1'>Inbox</span>
//                   </Link>

//                   <button onClick={logout} className='rounded-xl border border-bgDark bg-bgUltra hover:bg-background'>
//                     <LogoutIcon className='p-[0.1875rem] text-primary'/>
//                     <span className='font-semibold text-primary mr-1'>Logout</span>
//                   </button>
//                 </div>
//               </>
//             )}

//             {!authUser && (
//               <>
//                 <Link to="/login" className='rounded-lg border-2 border-background bg-bgUltra hover:bg-background gap-5 mr-0'>
//                   <LoginIcon className='p-[0.1875rem] text-primary'/>
//                   <span className='font-semibold text-primary mr-1'>Login</span>
//                 </Link>
//               </>
//             )}
//           </div>
          
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar

{/*import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router';
import { useThemeStore } from '../store/useThemeStore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isDark, setIsDark] = useState(false);
  const { setTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setTheme(newTheme ? 'dark' : 'light');
  };

  return (
    <header className="bg-bgUltra border-b-2 border-background w-full top-0 z-40">
      <div className="container mx-auto px-4 h-14">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2.5">
            <h1 className="size-10 text-2xl font-extrabold text-primary hover:text-primaryl rounded-lg flex items-center justify-center">
              Logo
            </h1>
          </Link>

          {/* Hamburger button 
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Desktop nav 
          <div className="hidden md:flex items-center gap-8">
            {/* Dark mode toggle 
            <div className="relative bottom-1.5">
              <label className="relative">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={handleChangeTheme}
                  className="sr-only peer"
                />
                <div className="absolute w-14 h-7 bg-background hover:bg-primary/20 ring-2 ring-background rounded-full
                  peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
                  after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all" />
                <span className="absolute left-1 transition-transform duration-300 peer-checked:hidden">
                  <DarkModeIcon className="p-0.5 text-background" />
                </span>
                <span className="absolute left-7 hidden peer-checked:inline transition-transform duration-300">
                  <LightModeIcon className="p-0.5 text-background" />
                </span>
              </label>
            </div>

            {authUser ? (
              <div className="flex items-center gap-5">
                <Link to="/profile" className="flex items-center rounded-xl border border-bgDark bg-bgUltra hover:bg-background">
                  <img src={authUser.profilePic || "/avatar.png"} alt="Profile" className="size-8 p-[0.1875rem] rounded-full" />
                  <span className="font-semibold text-primary mr-1">Profile</span>
                </Link>
                <Link to="/inbox" className="rounded-xl border border-bgDark bg-bgUltra hover:bg-background flex items-center gap-1 px-2">
                  <InboxIcon className="text-primary" />
                  <span className="font-semibold text-primary">Inbox</span>
                </Link>
                <button onClick={logout} className="rounded-xl border border-bgDark bg-bgUltra hover:bg-background flex items-center gap-1 px-2">
                  <LogoutIcon className="text-primary" />
                  <span className="font-semibold text-primary">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="rounded-lg border-2 border-background bg-bgUltra hover:bg-background flex items-center gap-1 px-2">
                <LoginIcon className="text-primary" />
                <span className="font-semibold text-primary">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu 
      {menuOpen && (
        <div className="md:hidden bg-bgUltra border-t border-background px-4 py-3 space-y-4">
          {/* Dark mode toggle 
          <div className="flex items-center">
            <label className="relative">
              <input
                type="checkbox"
                checked={isDark}
                onChange={handleChangeTheme}
                className="sr-only peer"
              />
              <div className="absolute w-14 h-7 bg-background hover:bg-primary/20 ring-2 ring-background rounded-full
                peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary 
                after:absolute after:top-0.5 after:start-[4px] after:bg-primary after:border-primary after:border after:rounded-full after:h-6 after:w-6 after:transition-all" />
              <span className="absolute left-1 transition-transform duration-300 peer-checked:hidden">
                <DarkModeIcon className="p-0.5 text-background" />
              </span>
              <span className="absolute left-7 hidden peer-checked:inline transition-transform duration-300">
                <LightModeIcon className="p-0.5 text-background" />
              </span>
            </label>
          </div>

          {authUser ? (
            <div className="flex flex-col gap-3">
              <Link to="/profile" className="flex items-center gap-2 text-primary">
                <img src={authUser.profilePic || "/avatar.png"} alt="Profile" className="size-6 rounded-full" />
                Profile
              </Link>
              <Link to="/inbox" className="flex items-center gap-2 text-primary">
                <InboxIcon />
                Inbox
              </Link>
              <button onClick={logout} className="flex items-center gap-2 text-primary">
                <LogoutIcon />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-primary">
              <LoginIcon />
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
 */}