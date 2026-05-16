import React from 'react'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#175bae]'>Discover Your Next Adventure with AI: </span>Personalised Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget. </p>
          <Link to='/create-trip'>
          <button   style={{
    background: 'linear-gradient(135deg, #175bae, #60efff)',
    border: 'none',
    borderRadius: '50px',
    padding: '14px 35px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.4s ease',
    boxShadow: '0 4px 15px rgba(23,91,174,0.4)'
  }}
  onMouseEnter={e => {
    e.target.style.background = 'linear-gradient(135deg, #60efff, #175bae)'
    e.target.style.transform = 'scale(1.08) translateY(-2px)'
    e.target.style.boxShadow = '0 10px 30px rgba(23,91,174,0.7)'
  }}
  onMouseLeave={e => {
    e.target.style.background = 'linear-gradient(135deg, #175bae, #60efff)'
    e.target.style.transform = 'scale(1) translateY(0)'
    e.target.style.boxShadow = '0 4px 15px rgba(23,91,174,0.4)'
  }} >
            Get Started, It's Free!
          </button>
          </Link>



    </div>
  )
}

export default Hero
