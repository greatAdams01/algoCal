import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BaseLayout from '../layout/BaseLayout'
import { IEvent } from '../util/appInterface';
import { GET_EVENTS } from '../apollo/queries/event';
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'; 
import moment from 'moment';
import EventCard from '../components/EventCard';


// const HomePage: NextPage<{ campaigns: ICampaign[] }> = ({ campaigns, }: { campaigns: ICampaign[] }): JSX.Element => {

const Home: NextPage<{ events: IEvent[] }> = ({  }: { events: IEvent[] }): JSX.Element => {
  const router = useRouter()
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
    let result
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
        result = events?.filter(item => moment(item.date).format("MMM Do YY") === dateNow)
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
        const currentMonth = new Date().getMonth()
        result = events?.filter(item => new Date(item.date).getMonth() === currentMonth)
        setEvents(result)
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
    <BaseLayout>
      <div>
        <Head>
          <title>AlgoCal</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        
        <section className='container'>
          <div className='lg:flex pt-5 px-5 justify-between'>
            <div className='text-[#4059AD]'>
              <h1 className='font-semibold text-2xl lg:text-4xl lg:w-[541px] py-5'>
                Planning your  events just got easier...
              </h1>
              <p className='text-[22px] lg:w-[580px]'>
                Transform your events and schedules with the best from Algorand’s ecosystem...
              </p>
              <div className='py-8'>
                <button onClick={() => router.push('/event/create')} className='px-10 py-3 bg-[#4059ADCC] rounded-xl text-white'>
                  Get Started 
                </button>
              </div>
            </div>
            <div className='lg:w-[500px]'>
              <img className='hidden lg:block lg:w-[254px] m-auto pt-2 lg:pt-[91px]' src="/img/hero.png" alt="" />
            </div>
          </div>
        </section>

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
            {/* <li 
              id='weekend'
              className={!isWeekend ? 'event-nav' : 'event-nav border-b-2 border-[#4059AD] font-semibold'}
              onClick={(e) => switchEvents(e.target)}
            >
              This Weekend
            </li> */}
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
            <EventCard key={i} { ...item } />
          ))
          }
        </div>

      </section>
      
        
      </div>
    </BaseLayout>
  )
}


export default Home
