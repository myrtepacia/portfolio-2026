import { MessageSquareMore } from 'lucide-react'
import React from 'react'

const BubbleButton = ( {onClick} : {onClick : ()=> void} ) => {
  return (
     <button className='bg-black dark:bg-white text-white dark:text-black 
     flex gap-2 px-3 py-2 text-xs items-center rounded-full font-bold animate-bounce transition-all cursor-pointer'
     
     onClick={onClick}
     >
                <span>
                    <MessageSquareMore />
                </span> 
                    Chat With Henmyr's AI
            
            </button>
  )
}

export default BubbleButton