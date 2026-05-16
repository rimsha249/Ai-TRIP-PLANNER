import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../service/firebase'

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY

const getImage = async (query) => {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
    headers: { Authorization: PEXELS_KEY }
  })
  const data = await res.json()
  return data.photos?.[0]?.src?.medium || 'https://placehold.co/400x200?text=No+Image'
}

function ViewTrip() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [hotelImages, setHotelImages] = useState({})
  const [placeImages, setPlaceImages] = useState({})

  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, 'trips', tripId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) setTrip(docSnap.data())
    }
    fetchTrip()
  }, [tripId])

  useEffect(() => {
    if (!trip) return

    const loadImages = async () => {
      // Hotel images
      const hImgs = {}
      for (const hotel of trip.tripData?.hotels || []) {
        hImgs[hotel.hotelName] = await getImage(hotel.hotelName + ' hotel')
      }
      setHotelImages(hImgs)

      // Place images
      const pImgs = {}
      for (const [day, places] of Object.entries(trip.tripData?.itinerary || {})) {
        for (const place of places) {
          pImgs[place.placeName] = await getImage(place.placeName)
        }
      }
      setPlaceImages(pImgs)
    }

    loadImages()
  }, [trip])

  if (!trip) return <div className='text-center mt-20 text-xl'>Loading trip...</div>

  const { formData, tripData } = trip

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>

      {/* Trip Info */}
      <div className='mb-8'>
        <h2 className='font-bold text-3xl'>📍 {formData.location}</h2>
        <div className='flex gap-4 mt-3 flex-wrap'>
          <span className='bg-gray-100 px-4 py-2 rounded-full text-sm'>🗓️ {formData.days} Days</span>
          <span className='bg-gray-100 px-4 py-2 rounded-full text-sm'>💰 {formData.budget}</span>
          <span className='bg-gray-100 px-4 py-2 rounded-full text-sm'>👥 {formData.travelers} Travelers</span>
        </div>
      </div>

      {/* Hotels */}
      <div className='mb-10'>
        <h2 className='font-bold text-2xl mb-4'>🏨 Hotel Recommendations</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {tripData?.hotels?.map((hotel, i) => (
            <div key={i} className='border rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden'>
              <img
                src={hotelImages[hotel.hotelName] || 'https://placehold.co/400x200?text=Loading...'}
                alt={hotel.hotelName}
                className='w-full h-40 object-cover'
              />
              <div className='p-4'>
                <h3 className='font-bold text-lg'>{hotel.hotelName}</h3>
                <p className='text-gray-500 text-sm mt-1'>📍 {hotel.address}</p>
                <p className='text-blue-600 font-medium mt-1'>💰 {hotel.price}</p>
                <p className='text-yellow-500 mt-1'>⭐ {hotel.rating}</p>
                <p className='text-gray-600 text-sm mt-2'>{hotel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className='mb-10'>
        <h2 className='font-bold text-2xl mb-4'>🗺️ Day-wise Itinerary</h2>
        {tripData?.itinerary && Object.entries(tripData.itinerary).map(([day, places]) => (
          <div key={day} className='mb-6'>
            <h3 className='font-bold text-xl capitalize mb-3 text-blue-700'>
              {day.replace('day', 'Day ')}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {places?.map((place, i) => (
                <div key={i} className='border rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden'>
                  <img
                    src={placeImages[place.placeName] || 'https://placehold.co/400x200?text=Loading...'}
                    alt={place.placeName}
                    className='w-full h-36 object-cover'
                  />
                  <div className='p-4'>
                    <h4 className='font-bold text-lg'>{place.placeName}</h4>
                    <p className='text-gray-600 text-sm mt-1'>{place.details}</p>
                    <p className='text-green-600 mt-1 text-sm'>🎟️ {place.ticketPrice}</p>
                    <p className='text-gray-500 text-sm'>⏰ {place.timeToVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ViewTrip