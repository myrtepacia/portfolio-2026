import { Globe } from "lucide-react";
import React from "react";
import Link from "next/link";
type Project = {
  title: string;
  description: string;
  stack: string[];
  link: string;
};

type SelectedProjects = {
  project: Project
  index: number
}

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
]
const strokes = [
  'hover:stroke-red-500',
  'hover:stroke-blue-500',
  'hover:stroke-green-500',
  'hover:stroke-yellow-500',
  'hover:stroke-purple-500',
]


const SelectedProject = ({ project, index }: SelectedProjects) => {

   const circleColor = colors[index % colors.length]
   const strokeColor = strokes[index % strokes.length]

  return (
    <div className="flex gap-4">

        <div   className={`w-2 h-2 rounded-full p-1 mt-1.5 ${circleColor}`}></div>

        <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold">{project.title}</h4>
              <Link href={project.link} target="_blank">
                <Globe color="#71717a" size={15} className={`cursor-pointer ${strokeColor} transition-colors `} />
              </Link>
            </div>

            <p className="text-xs text-zinc-600 pr-4 dark:text-zinc-400">{project.description}</p>

            <div className="flex gap-2 flex-wrap">
              {project.stack.map((item, index) => (
                <span key={index} className="badge-square text-xxs ">
                  {item}
                </span>
              ))}
            </div>
        </div>
    </div>
  );
};

export default SelectedProject;
