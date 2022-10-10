import type { NextPage } from 'next'
import Head from 'next/head'
import EventList from '../components/event/EventList'
import BaseLayout from '../layout/BaseLayout'
import { IEvent } from '../util/appInterface';
import { GET_EVENTS } from '../apollo/queries/event';

// const HomePage: NextPage<{ campaigns: ICampaign[] }> = ({ campaigns, }: { campaigns: ICampaign[] }): JSX.Element => {

const Home: NextPage<{ events: IEvent[] }> = ({  }: { events: IEvent[] }): JSX.Element => {
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
                <button className='px-10 py-3 bg-[#4059ADCC] rounded-xl text-white'>
                  Get Started 
                </button>
              </div>
            </div>
            <div className='lg:w-[500px]'>
              <img className='hidden lg:block lg:w-[254px] m-auto pt-2 lg:pt-[91px]' src="/img/hero.png" alt="" />
            </div>
          </div>
        </section>

      <EventList />
        
      </div>
    </BaseLayout>
  )
}


export default Home
