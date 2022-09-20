import type { NextPage } from 'next'
import Head from 'next/head'
import { CalculatorIcon, ShareIcon, BookmarkIcon } from "@heroicons/react/outline"

const Home: NextPage = () => {
  return (
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
          <div>
            <img className='lg:w-[455px] lg:relative bottom-[60px]' src="/img/hero.png" alt="" />
          </div>
        </div>
      </section>


      <section className='container text-[#4059AD]'>
        <div>
          <h1 className='text-5xl font-[300] pb-10 lg:pb-0'>Popular</h1>
        </div>
        {/* Tabs */}

        <div>
          <ul className='lg:flex space-x-5 text-xl py-8 hidden'>
            <li className='cursor-pointer font-semibold'>All</li>
            <li className='cursor-pointer'>For You</li>
            <li className='cursor-pointer'>Free</li>
            <li className='cursor-pointer'>Today</li>
            <li className='cursor-pointer'>This Weekend</li>
            <li className='cursor-pointer'>This Month</li>
          </ul>
        </div>

        {/* Events */}

        <div>
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
    </div>
  )
}

export default Home
