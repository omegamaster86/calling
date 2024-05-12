import React from 'react'
import KanbanBoard from "../components/ApointList/KanbanBoard"
import { ApoList } from "../components/ApointList/ApointList"


const ApointList = () => {
  return (
    <div className='bg-cyan-400 min-h-screen'>
      <ApoList/>
      <KanbanBoard/>
    </div>
  )
}

export default ApointList