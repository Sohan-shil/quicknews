import React from 'react'
import loading from './loading_gif.gif'

const Spinner=()=> {
  
    return (
      <div className='text-center mb-4'>
        <img src={loading} alt="loading" style={{width:'2rem'}}/>
      </div>
    )
  
}

export default Spinner