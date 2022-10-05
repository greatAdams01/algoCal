import { useState } from 'react';
import Head from 'next/head'
import BaseLayout from '../../layout/BaseLayout'
import { ICreateEvent } from '../../util/appInterface';



function CreateEvent() {
  const [inputs, setInputs] = useState<Partial<ICreateEvent>>();

  const handleChange = async (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

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
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="Title">Title</label> <br />
              <input
                name='title'
                className='event-input'
                type="text"
                placeholder='Title'
                value={inputs?.title || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="Title">Organizer</label> <br />
              <input
                name='organizer'
                className='event-input'
                type="text"
                placeholder='Eg: Cryptosmart.algo'
                value={inputs?.organizer || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="data">Event Date</label> <br />
              <input
                id='date'
                name='title'
                className='event-input'
                type="date"
                placeholder=''
                value={inputs?.date || ""}
                onChange={handleChange}
              />
          </div>

          <div className='event-group'>
            <label className='relative bg-white p-1 left-[61px] top-[10px]' htmlFor="Title">Venue</label> <br />
              <input
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
                name='title'
                className='event-input'
                type="text"
                placeholder=''
                value={inputs?.link || ""}
                onChange={handleChange}
              />
          </div>

          </div>
        </form>
      </section> 

    </div>
    </BaseLayout>
  )
}

export default CreateEvent