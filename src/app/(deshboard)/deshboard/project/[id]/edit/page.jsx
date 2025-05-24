import { notFound } from "next/navigation"
import prisma from "../../../../../../lib/PrismClient"
import ProjectEditBox from "../../../../../../Components/project/ProjectEditBox";

async function ProjectEditpage({params}) {
  const project = await prisma.projects.findUnique({
    where:{
      id:params.id
    }
  })

  if(!project) notFound();
  
  return (
    <div>
      <ProjectEditBox item={project} />
    </div>
  )
}

export default ProjectEditpage
