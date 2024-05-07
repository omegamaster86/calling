import React from 'react'
import ApointListAll from "../components/ApointList/ApointList"
import KanbanBoard from "../components/ApointList/KanbanBoard"


const ApointList = () => {
  return (
    <div className='bg-cyan-400 min-h-screen'>
      <ApointListAll/>
      <KanbanBoard/>
    </div>
  )
}

export default ApointList