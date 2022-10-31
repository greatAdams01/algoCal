import { BookmarkIcon } from '@heroicons/react/outline'
import { atcb_action } from 'add-to-calendar-button'
import moment from 'moment'
import React from 'react'
import { TwitterIcon, TwitterShareButton } from 'react-share'
import { shortenAddress } from '../util/constants'
import Details from './Details'

interface EventProps {
  image: string;
  date: string;
  title: string;
  description: string;
  organizer: string;
}

const EventCard = ({ image, date, title, description, organizer }: EventProps) => {

  const addToCal = (name:string, date:string) => {
    atcb_action({
      name,
      startDate: date,
      endDate: date,
      options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
      timeZone: "Africa/Lagos",
      iCalFileName: "Reminder-Event",
    });
  }

  return (
    <div>
      <div  className='border p-4 rounded-xl mt-5'>
              {/* Image */}
              <div className='p-20' style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${(image)})`}}  />
             {/* Header */}
             <div className='flex w-full justify-between py-2'>
               <h3 className='text-2xl font-semibold'>{title}</h3>
               <h3>{moment(date).format("MMM Do YY")}</h3>
             </div>
             {/* Description */}
             <div>
               <h3 className='py-1 text-xl font-semibold'>Description:</h3>
               <p className='h-[76px] overflow-hidden'>
                {description}
               </p>
               <p title={organizer} className='mt-2'>Organiser: { organizer.length < 50 ? organizer : shortenAddress(organizer) }</p>
             </div>
 
             {/* Calander */}
 
             <div className='flex justify-between pt-4'>
               <div className='flex space-x-2 pt-4'>
               <img className='w-[24px] h-[24px] cursor-pointer' onClick={() => addToCal(title, date)} src="/img/dated.png" alt="" />
                 {/* 
                 <p className='font-semibold pt-2'>Josh_Id, GoldPilot and 200 others</p> */}
               </div>
               <div className='flex space-x-2 pt-4'>
                 {/* <ShareIcon className='w-6' /> */}
                 <Details title={title} des={description} />
                  <TwitterShareButton
                    about={description}
                    url={`algo-cal.vercel.app/`}
                    via={'cryptosmartnow'}
                    title={`Here's another event for the Algorand community @AlgoFoundation.  ${title} event coming soon, check it out`}
                    hashtags={['Algorand', 'Web3']}
                    related={['Algorand', 'Web3']}
                   >
                     <TwitterIcon size={32} round={true} />
                   </TwitterShareButton>
                 <BookmarkIcon className='w-6' />
               </div>
             </div>
 
            </div>
    </div>
  )
}

export default EventCard