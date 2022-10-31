import React from 'react'

interface DetailProps {
  title: string;
  des: string;
}

function Details({ title, des }: DetailProps) {
  return (
    <>
      <div className="container-model">
        <div className="interior">
          <a className="btn" href={`#${title}`}>See More</a>
        </div>
      </div>

    <a href="#" id={`${title}`} className="modal-window">
  <div>
    <div>{des}</div>
    <br />
  </div>
    </a>
      
    </>
  )
}

export default Details