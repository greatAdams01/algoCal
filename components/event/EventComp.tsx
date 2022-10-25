import React, { FC } from 'react'
import moment from 'moment';
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline"
import { IEvent } from '../../util/appInterface'


const EventComp: FC<IEvent[]> = (eventsList): JSX.Element => {
  return (
    <div className="pt-5 lg:grid grid-cols-2 gap-2 ">
          {/* eventITem */}
          {eventsList?.map((item: IEvent, i: any) => (
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
  )
}

export default EventComp
