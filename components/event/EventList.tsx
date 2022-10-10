import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'; 
import moment from 'moment';
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline"
import { IEvent } from '../../util/appInterface';
import { GET_EVENTS } from '../../apollo/queries/event';

const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>()
  const [isAll, setIsAll] = useState(true)
  const [isToday, setIsToday] = useState(false)
  const [isWeekend, setIsWeekend] = useState(false)
  const [isMonth, setIsMonth] = useState(false)

const { loading, data, error } = useQuery(GET_EVENTS, {
  onCompleted: ({ events }) => {
    setEvents(events)
  }
});

  const switchEvents = (e: any) => {
    const { events: IEvent } = data
    const localState = events
    const dateNow = moment(new Date()).format("MMM Do YY")
    switch (e?.id) {
      case 'all':
        setEvents(data.events)
        setIsAll(true)
        setIsMonth(false)
        setIsToday(false)
        setIsWeekend(false)
        break;

      case 'today':
        const result = events?.filter(item => moment(item.date).format("MMM Do YY") === dateNow)
        setEvents(result)
        setIsAll(false)
        setIsMonth(false)
        setIsToday(true)
        setIsWeekend(false)
        break;
      
      case 'weekend':
        setIsAll(false)
        setIsMonth(false)
        setIsToday(false)
        setIsWeekend(true)
        break;

      case 'month':
        setIsAll(false)
        setIsMonth(true)
        setIsToday(false)
        setIsWeekend(false)
        break;
    
      default:
        console.log(`Sorry, we are out of ${e.id}.`)
        break;
    }


  }

  return (
    <>
      <section className='container text-[#4059AD]'>
        <div>
          <h1 className='text-5xl font-[300] pb-10 lg:pb-0'>Popular</h1>
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
              id='today'
              className={!isToday ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              Today
            </li>
            <li 
              id='weekend'
              className={!isWeekend ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              This Weekend
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
              <div className='p-20' style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${(item.image)})`}}  />
             {/* Header */}
             <div className='flex w-full justify-between py-2'>
               <h3 className='text-2xl font-semibold'>{item.title}</h3>
               <h3>{moment(item.date).format("MMM Do YY")}</h3>
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

export default EventList

