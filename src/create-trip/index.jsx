import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import generateAITrip from '../service/AIModal';
import { auth, provider, db } from '../service/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u))
  }, [])

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleInput = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < 3) { setSuggestions([]); return; }
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5`);
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelect = (item) => {
    setQuery(item.display_name);
    handleInputChange('location', item.display_name);
    setSuggestions([]);
  };

  const onGenerateTrip = async () => {
    if (!user) {
      toast.error('Please Sign In first!')
      await signInWithPopup(auth, provider)
      return;
    }

    if (formData?.days > 5 || !formData?.location || !formData?.budget || !formData?.travelers) {
      toast.error('Please fill all fields! Days must be 5 or less.');
      return;
    }

    toast.loading('Generating your trip...')
    const result = await generateAITrip(formData);
    toast.dismiss()
    toast.success('Trip Generated!')

    // Save to Firebase
    const tripId = Date.now().toString();
    await setDoc(doc(db, 'trips', tripId), {
      tripData: result,
      formData: formData,
      userEmail: user.email,
      userName: user.displayName,
      tripId: tripId,
      createdAt: new Date().toISOString()
    });

    navigate(`/view-trip/${tripId}`);
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice❓</h2>
          <input type="text" value={query} onChange={handleInput}
            placeholder="Search destination..."
            className='w-full border rounded-lg p-3 text-lg' />
          {suggestions.length > 0 && (
            <ul className='border rounded-lg mt-1 bg-white shadow-lg'>
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item)}
                  className='p-3 hover:bg-gray-100 cursor-pointer text-sm'>
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip 🏞️?</h2>
          <Input placeholder={'Ex. 3'} type="number"
            onChange={(e) => handleInputChange('days', parseInt(e.target.value))} />
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget❓</h2>
        <div className='grid grid-cols-3 gap-5 mt-3'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData.budget === item.title && 'border-black shadow-lg'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='text-lg font-bold'>{item.title}</h2>
              <h2 className='text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-3'>
          {SelectTravelsList.map((item, index) => (
            <div key={index} onClick={() => handleInputChange('travelers', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData.travelers === item.people && 'border-black shadow-lg'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='text-lg font-bold'>{item.title}</h2>
              <h2 className='text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  )
}

export default CreateTrip