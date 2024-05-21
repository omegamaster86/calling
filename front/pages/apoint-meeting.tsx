import React from 'react'
import { ApointMeetingRecord } from "../components/ApointList/ApointMeeting/ApointMeetingRecord"
import { Chat } from "../components/ApointList/ApointMeeting/Chat"

export default function ApointMeeting () {
  return (
    <div className='m-10'>
      <ApointMeetingRecord/>
      <Chat />
    </div>
  )
}
