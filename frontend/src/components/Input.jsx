import React from 'react'

const Input = ({Icon, name, ...props}) => {
  return (
    <div className='flex flex-col gap-1'>
        <div className='text-base text-textl'>
            {name}
        </div>
        <div className='relative mb-3'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-primary'>
                {Icon}
            </div>
            <input
                {...props}
                className='w-full pl-10 pr-2 py-1.5 outline-none rounded-lg bg-background/40 border border-bgDark focus:border-primaryl/50 focus:border-2 focus:bg-bgUltra hover:bg-bgUltra text-textl transition duration-200'
            />
        </div>
    </div>
  )
}

export default Input
