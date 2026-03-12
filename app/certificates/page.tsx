'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { certificates } from '@/constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const page = () => {


    useGSAP(()=> {

        gsap.from('#certificate', {
            opacity: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: "power4.inOut"

        })

    }, [])
  return (
    <div className=' max-w-5xl padding-x py-10 space-y-5'>

            <div className='flex flex-nowrap  gap-5 flex-col sm:items-center sm:flex-row'>
                
          
                    
                    <Link href={'/'} className='text-sm flex flex-nowrap items-center gap-2'>
                        <ArrowLeft size={20} className=''/>
                        Back to home
                    </Link>

             
                <h1 className='text-2xl font-bold'>All Certifications</h1>

            </div>

            <div className=' grid grid-cols-1 sm:grid-cols-2 gap-3' >

                {certificates.map( (item, index)=> 
                    <Link key={index} className='card space-y-2' href={item.link} target='_blank' id='certificate'>
                            <h3 className='font-bold'>{item.title}</h3>
                            <p className='text-sm text-zinc-500 '>{item.provider}</p>
                   
                    </Link>
                )}
            </div>
    </div>
  )
}

export default page