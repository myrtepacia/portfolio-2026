import React from 'react'

const Footer = () => {
  return (
    <footer className='max-w-5xl padding-x justify-center'>
      <div className='border-t border-zinc-300 py-10 flex flex-col justify-center gap-3 sm:flex-row sm:justify-between items-center'>
        <div className='text-center space-y-1'>
          <p className='font-bold text-sm'>Henmyr Vincent L. Tepacia</p>
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer .
