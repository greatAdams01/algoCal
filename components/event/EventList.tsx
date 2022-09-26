import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'; 
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline"

const EventList = () => {
  const [isAll, setIsAll] = useState(true)
  const [isForYou, setIsForYou] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [isToday, setIsToday] = useState(false)
  const [isWeekend, setIsWeekend] = useState(false)
  const [isMonth, setIsMonth] = useState(false)

  const GET_EVENTS = gql` 
    query GetEvent{
        events {
          _id
          title
          date
          time
          description
          subDescription
          host
          followers
          reactions
          venue
          category
          type
          link
          createdAt
          updatedAt
        }
      }
  `
const { loading, error, data } = useQuery(GET_EVENTS);

  const switchEvents = (e: any) => {
    console.log(data)
    if(e?.id === "all") {
      setIsAll(true)
      setIsForYou(false)
      setIsFree(false)
      setIsMonth(false)
      setIsToday(false)
      setIsWeekend(false)
      return
    }

    if(e?.id === "for-you") {
      setIsAll(false)
      setIsForYou(true)
      setIsFree(false)
      setIsMonth(false)
      setIsToday(false)
      setIsWeekend(false)
      return
    }

    if(e?.id === "free") {
      setIsAll(false)
      setIsForYou(false)
      setIsFree(true)
      setIsMonth(false)
      setIsToday(false)
      setIsWeekend(false)
      return
    }

    if(e?.id === "today") {
      setIsAll(false)
      setIsForYou(false)
      setIsFree(false)
      setIsMonth(false)
      setIsToday(true)
      setIsWeekend(false)
      return
    }

    if(e?.id === "weekend") {
      setIsAll(false)
      setIsForYou(false)
      setIsFree(false)
      setIsMonth(false)
      setIsToday(false)
      setIsWeekend(true)
      return
    }

    if(e?.id === "month") {
      setIsAll(false)
      setIsForYou(false)
      setIsFree(false)
      setIsMonth(true)
      setIsToday(false)
      setIsWeekend(false)
      return
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
              id='for-you'
              className={!isForYou ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              For You
            </li>
            <li 
              id='free'
              className={!isFree ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              Free
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

        <div className="pt-5">
          {/* eventITem */}
          <div className='border p-4 rounded-xl'>
            {/* Header */}
            <div className='flex w-full justify-between pb-2'>
              <h3 className='text-2xl font-semibold'>Karla’s Cafe</h3>
              <h3>Mon, 22nd Aug 2022</h3>
            </div>
            {/* Description */}
            <div>
              <h3 className='py-1 text-xl font-semibold'>Description:</h3>
              <p>
              Buenos dias!  Yo soy Karla. Yo trabajo en una oficina de technologico . Me encanta  aprender la matematica en el mundo. Yo soy simpatica, bonita y muy guapa. Yo hablo ingles, espanol, italiano, japones y potugues. me interesa en crypto y tengo un oficina de crypto.
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
        </div>

      </section>
    </>
  )
}

export default EventList