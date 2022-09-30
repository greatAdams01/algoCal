import Head from 'next/head'
import { PlusIcon, ShareIcon, BookmarkIcon } from "@heroicons/react/outline"
import MyEventList from '../../components/event/MyEventList'
import BaseLayout from '../../layout/BaseLayout'
import { ReactElement } from 'react'

function createEvent() {
  return (
    <div>
      <Head>
        <title>Create Event</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <section className='container'>
        <div className='bg-[#4059AD]  w-[54px] p-[10px] rounded-xl m-auto cursor-pointer'>
          <PlusIcon className='w-8 text-white' />
        </div>

        <p className='text-center text-[#4059AD] text-2xl pt-3'>Create an Event</p>
      </section> 

      <MyEventList />
    </div>
  )
}

createEvent.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      {page}
    </BaseLayout>
  )
}

export default createEvent