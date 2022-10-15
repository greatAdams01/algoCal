import Head from 'next/head'
import { useRouter } from 'next/router'
import { PlusIcon } from "@heroicons/react/outline"
import { useRecoilState } from 'recoil'
import MyEventList from '../../components/event/MyEventList'
import BaseLayout from '../../layout/BaseLayout'
import { useQuery } from '@apollo/client'
import { USER } from '../../apollo/queries/auth'
import { UserAtom } from '../../atom/creator'


const EventHome = () => {
  const router = useRouter()
  const [user, setUser] = useRecoilState(UserAtom)
  const { data, error } = useQuery(USER, {
    onCompleted: ({ creator }) => {
      setUser(creator)
    }
  })
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

        <MyEventList />
      </div>
    </BaseLayout>
  )
}



export default EventHome