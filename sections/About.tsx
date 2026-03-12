import { BriefcaseBusiness } from 'lucide-react'
import React from 'react'

const About = () => {
  return (
    <div className='card '>

        <div className='flex flex-nowrap items-center gap-2 '>
          <span><BriefcaseBusiness color='#71717a' size={20}/></span>
          <h2 className='font-bold'>About</h2>
        </div>

        <p className="text leading-relaxed">
          I'm a Computer Science student at <strong className="text-black dark:text-white">Negros Oriental State University</strong>. I'm learning and gaining experience in software development through my school projects. I enjoy exploring new technologies and finding simple ways to solve problems. I also like joining tech events and working with others to learn and grow in the field.
        </p>

        <p className="text leading-relaxed">
          I'm interested in <strong className="text-black dark:text-white">CyberSecurity</strong>, <strong className="text-black dark:text-white">Artificial Intelligence,</strong> and <strong className="text-black dark:text-white">Data Systems</strong>. I enjoy learning new programming languages, tools, and frameworks that help me improve my skills. I like staying updated with new trends in technology and using what I learn to build useful and creative projects.
        </p>

        <p className="text leading-relaxed">
          Outside of my studies, I enjoy teamwork and learning from others. I like working on projects that have a real impact and help people in simple but meaningful ways. My goal is to become a skilled software developer who creates solutions that make life easier and better for others.
        </p>
    </div>
  )
}

export default About