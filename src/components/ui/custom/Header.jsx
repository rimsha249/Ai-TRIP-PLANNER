import React, { useEffect, useState } from 'react'
import { auth, provider } from '../../../service/firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
  }, [])

  const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
  }

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div className='shadow-sm flex items-center justify-between px-5 py-2'>
      <img src='/trip.png' alt='logo' className='w-32 h-auto cursor-pointer' onClick={() => navigate('/')} />
      <div className='flex items-center gap-4 mr-10'>
        {user ? (
          <div className='flex items-center gap-4'>
            <img src={user.photoURL} alt='profile'
              className='w-10 h-10 rounded-full cursor-pointer'
              title={user.displayName} />
            <button onClick={handleSignOut}
              style={{
                background: 'transparent',
                border: '2px solid #175bae',
                borderRadius: '50px',
                padding: '8px 20px',
                color: '#175bae',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#175bae'
                e.target.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#175bae'
              }}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={handleSignIn}
            style={{
              background: 'transparent',
              border: '2px solid #175bae',
              borderRadius: '50px',
              padding: '10px 28px',
              color: '#175bae',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = '#175bae'
              e.target.style.color = 'white'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 20px rgba(23,91,174,0.4)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.color = '#175bae'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}>
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}

export default Header