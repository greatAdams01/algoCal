import { useState } from 'react'
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline"
import { IEvent } from '../../util/appInterface'
import { useQuery } from '@apollo/client'
import { GET_CREATOR_EVENTS } from '../../apollo/queries/event'

const MyEventList = () => {

  const [events, setEvents] = useState<IEvent[]>()
  const [isAll, setIsAll] = useState(true)
  const [isRecently, setIsRecently] = useState(false)
  const [isFavorites, setIsFavorites] = useState(false)
  const [isUpcoming, setIsUpcoming] = useState(false)
  const [isMonth, setIsMonth] = useState(false)

  const { loading } = useQuery(GET_CREATOR_EVENTS, {
    onCompleted: ({ creatorEvents }) => {
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

    if(e?.id === "recently") {
      setIsAll(false)
      setIsRecently(true)
      setIsFavorites(false)
      setIsMonth(false)
      setIsUpcoming(false)
      return
    }

    if(e?.id === "Favorites") {
      setIsAll(false)
      setIsRecently(false)
      setIsFavorites(true)
      setIsMonth(false)
      setIsUpcoming(false)
      return
    }

    if(e?.id === "Upcoming") {
      setIsAll(false)
      setIsRecently(false)
      setIsFavorites(false)
      setIsMonth(false)
      setIsUpcoming(true)
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
              id='recently'
              className={!isRecently ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              Recently Added
            </li>
            <li 
              id='Favorites'
              className={!isFavorites ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              Favorites
            </li>
            <li 
              id='Upcoming'
              className={!isUpcoming ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              Upcoming
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

        <div className="pt-5 lg:grid grid-cols-2 gap-2 ">
          {/* eventITem */}
          {events?.map((item: IEvent, i: any) => (
             <div key={i} className='border p-4 rounded-xl mt-5'>
              {/* Image */}
              <div className='p-20' style={{ backgroundPosition: 'center', backgroundSize: 'contain', backgroundImage: `url(${(item.image)})`}}  />
             {/* Header */}
             <div className='flex w-full justify-between py-2'>
               <h3 className='text-2xl font-semibold'>{item.title}</h3>
               <h3>{item.date}</h3>
             </div>
             {/* Description */}
             <div>
               <h3 className='py-1 text-xl font-semibold'>Description:</h3>
               <p>
              {item.description}
               </p>
             </div>
 
             {/* Calander */}
 
             <div className='flex justify-between pt-4'>
               <div className='flex space-x-2 pt-4'>
                 <img className='img-rounded' src="/img/03-93.jpg" alt="" />
                 <p className='font-semibold pt-2'>Josh_Id, GoldPilot and 200 others</p>
               </div>
               <div className='flex space-x-2 pt-4'>
                 <ShareIcon className='w-6' />
                 <BookmarkIcon className='w-6' />
               </div>
             </div>
 
           </div>
          ))
          }
          </div>

      </section>
    </>
  )
}

export default MyEventList