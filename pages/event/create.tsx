import { useState } from 'react';
import Head from 'next/head'
import BaseLayout from '../../layout/BaseLayout'
import { ICreateEvent } from '../../util/appInterface';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EVENT } from '../../apollo/queries/event';



function CreateEvent() {
  const [inputs, setInputs] = useState<Partial<ICreateEvent>>();
  const [createEvent] = useMutation(CREATE_EVENT)

  const handleChange = async (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const createEventFun = (e: any) => {
    e.preventDefault()
    console.log(inputs)
    const toastId = toast.loading('Loading...');
    if (!inputs?.category || !inputs?.time || !inputs.title || !inputs.venue || !inputs.organizer || !inputs.description || !inputs.link) {
      toast.error('Fill in the fields', {
        id: toastId,
      });
      return
    }

    try {
      createEvent({
        variables: { ...inputs },
        onCompleted: ({ createEvent }) => {
          console.log(createEvent)
          toast.success( `${createEvent?.title} created successful`, {
            id: toastId,
          })
        },
        onError: error => {
          toast.error(error.message, {
            id: toastId,
          });
        }
      })
    } catch (error) {
      
    }

  }


  return (
    <BaseLayout>
    
    <div>
      <Head>
        <title>Create Event</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <section className='container'>


        <form>
          <div className='w-3/4 m-auto'>
          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="title">Name</label> <br />
              <input
                id='title'
                name='title'
                className='event-input'
                type="text"
                placeholder='Title'
                value={inputs?.title || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="organizer">Organizer</label> <br />
              <input
                id='organizer'
                name='organizer'
                className='event-input'
                type="text"
                placeholder='Eg: Cryptosmart.algo'
                value={inputs?.organizer || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="date">Event Date</label> <br />
              <input
                id='date'
                name='date'
                className='event-input'
                type="date"
                placeholder=''
                value={inputs?.date || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="time">Event Time</label> <br />
              <input
                id='time'
                name='time'
                className='event-input'
                type="time"
                placeholder=''
                value={inputs?.time || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="venue">Venue</label> <br />
              <input
                id='venue'
                name='venue'
                className='event-input'
                type="text"
                placeholder=''
                value={inputs?.venue || ""}
                onChange={handleChange}
              />
          </div>


          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="category">Category</label> <br />
            <select
              name="category"
              id="category"
              className='event-input'
              value={inputs?.category || ""}
              onChange={handleChange}
            >
              <option selected value="Spaces">Spaces</option>
              <option value="Devents">Devents</option>
              <option value="Hackaton">Hackaton</option>
            </select>
              {/* <input
                id='category'
                name='title'
                className='event-input'
                type="text"
                placeholder=''
                value={inputs?.category || ""}
                onChange={handleChange}
              /> */}
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="des">Description</label> <br />
              <textarea
                id='des'
                name='description'
                className='event-input h-[100px]'
                placeholder=''
                value={inputs?.description || ""}
                onChange={handleChange}
              ></textarea>
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="link">Event Link</label> <br />
              <input
                id='link'
                name='link'
                className='event-input'
                type="text"
                placeholder=''
                value={inputs?.link || ""}
                onChange={handleChange}
              />
          </div>
              <div className='text-center pt-3'>
                <input className='authBtn bg-[#4059AD] text-white cursor-pointer' onClick={(e) => createEventFun(e)} type="submit" value="Create Event" />
              </div>
          </div>
        </form>
      </section> 

    </div>
    </BaseLayout>
  )
}

export default CreateEvent