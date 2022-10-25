import Head from 'next/head'
import { useRouter } from 'next/router'
import { PlusIcon } from "@heroicons/react/outline"
import { useRecoilState } from 'recoil'
import moment from 'moment';
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline"
import BaseLayout from '../../layout/BaseLayout'
import { useQuery } from '@apollo/client'
import { USER } from '../../apollo/queries/auth'
import { UserAtom } from '../../atom/creator'
import { useState } from 'react'
import { IEvent } from '../../util/appInterface'
import { GET_CREATOR_EVENTS } from '../../apollo/queries/event'


const EventHome = () => {
  const router = useRouter()
  const [user, setUser] = useRecoilState(UserAtom)
  const [events, setEvents] = useState<IEvent[]>()
  const [isAll, setIsAll] = useState(true)
  const [isRecently, setIsRecently] = useState(false)
  const [isFavorites, setIsFavorites] = useState(false)
  const [isUpcoming, setIsUpcoming] = useState(false)
  const [isMonth, setIsMonth] = useState(false)
  const { data, error } = useQuery(USER, {
    onCompleted: ({ creator }) => {
      setUser(creator.address)
    }
  })

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
    <BaseLayout>
      <div>
        <Head>
          <title>Profile</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <section className='container'>
          <div onClick={() => router.push('/event/create')} className='bg-[#4059AD]  w-[54px] p-[10px] rounded-xl m-auto cursor-pointer'>
            <PlusIcon className='w-8 text-white' />
          </div>

          <p className='text-center text-[#4059AD] text-2xl pt-3'>Create an Event</p>
        </section> 

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
      </div>
    </BaseLayout>
  )
}



export default EventHome