import {  BrainCog, CodeXml, FolderOpen, Globe, GraduationCap } from 'lucide-react'
import React from 'react'
import { projectData } from '@/constants'
import SelectedProject from '@/components/SelectedProject'
const Projects = () => {
  return (
    <div className='card '>
            <div className='flex flex-nowrap items-center gap-2 '>
                <span><FolderOpen color='#71717a' size='20'/></span>
                <h2 className='font-bold'>Projects</h2>
            </div>

            <div className='flex gap-4'>


                {/* Experience */}
                <div className='flex flex-col justify-between w-full gap-5'>


                  {projectData.map( (project, index)=> 
                      <SelectedProject project={project} key={project.title} index={index}/>
                  )}

                   
                 
                  
                      
                </div>

                             
             

             



            </div>
    </div>
  )
}

export default Projects