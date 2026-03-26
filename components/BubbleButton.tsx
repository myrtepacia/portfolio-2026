import { MessageSquareMore } from 'lucide-react'
import React from 'react'

const BubbleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='bg-black dark:bg-white text-white dark:text-black flex gap-2 px-3 py-2 text-xs items-center rounded-full font-bold transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98]'
    >
      <span>
        <MessageSquareMore />
      </span>
      Chat With Henmyr
    </button>
  )
}

export default BubbleButton
