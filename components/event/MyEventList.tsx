import { useState } from 'react'
import moment from 'moment';
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline"
import { IEvent } from '../../util/appInterface'
import { useQuery } from '@apollo/client'
import { GET_CREATOR_EVENTS } from '../../apollo/queries/event'
import EventComp from './EventComp';

const MyEventList = () => {

  const [events, setEvents] = useState<IEvent[]>()
  const [isAll, setIsAll] = useState(true)
  const [isRecently, setIsRecently] = useState(false)
  const [isFavorites, setIsFavorites] = useState(false)
  const [isUpcoming, setIsUpcoming] = useState(false)
  const [isMonth, setIsMonth] = useState(false)

  const { loading } = useQuery(GET_CREATOR_EVENTS, {
    onCompleted: ({ creatorEvents }) => {
      console.log(creatorEvents)
      setEvents(creatorEvents)
    }
  })

  const switchEvents = (e: any) => {
    // console.log(e?.id)
    if(e?.id === "all") {
      setIsAll(true)
      setIsRecently(false)
      setIsFavorites(false)
      setIsMonth(false)
      setIsUpcoming(false)
      return
    }

    if(e?.id === "month") {
      setIsAll(false)
      setIsRecently(false)
      setIsFavorites(false)
      setIsMonth(true)
      setIsUpcoming(false)
      return
    }

  }

  return (
    <>
      <section className='container text-[#4059AD]'>
        <div>
          <h1 className='text-5xl font-[300] pb-10 lg:pb-0'>My Events</h1>
        </div>
        {/* Tabs */}

        <div className="py-4 overflow-scroll">
          <ul className='flex w-[580px] lg:w-full space-x-10 text-center text-sm lg:space-x-16 lg:text-xl'>
            <li 
              id='all'
              className={!isAll ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              All
            </li>
            <li 
              id='month'
              className={!isMonth ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              This Month
            </li>
          </ul>
        </div>

        {/* Events */}

        <EventComp eventsList={events} />

      </section>
    </>
  )
}

export default MyEventList