import React from 'react'
const Details = ({ data }) => {
  return (

    <>
      <div className='details'>
        <p className='title-text'>{data.name}</p>
        <p className='prd-desc'>{data.description}</p>
      </div>
      <div>
      {data.offerPrice? <p className='prd-price'>{data.currency}{data.offerPrice}</p> : <p className='prd-price'>{data.currency}{data.unitPrice}</p>}
      </div>

    </>

  )
}

export default Details
