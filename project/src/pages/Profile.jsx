import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../context/UserContext'
import {Link, useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';
import MainNavBar from '../components/navbar/mainNav';
import CreatedJourney from '../components/CreatedJourney';
import JoinedJourney from '../components/JoinedJourney';

const Profile = () => {
  const {user} = useContext(UserContext);
  const [which, setWhich] = useState(false);
  const [createdJourneys, setCreatedJourneys] = useState([]);
  const [joinedJourneys, setJoinedJourneys] = useState([]);
  const navigate = useNavigate();

 const getCreatedJourneys = async() => {
   const token = localStorage.getItem('userToken')
   const response = await fetch(`http://localhost:8000/ut/journeys`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }
   });
   const data = await response.json();
   setCreatedJourneys(data.journeys);
 }
 const getJoinedJourneys = async() => {
    const token = localStorage.getItem('userToken')
    const response = await fetch('http://localhost:8000/api/myJourneys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    setJoinedJourneys(data)
 }

 useEffect(() => {
    getCreatedJourneys()
  }, [createdJourneys]);
  
  useEffect(() => {
    getJoinedJourneys()
  }, [joinedJourneys]);


  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if(!token){
      toast.error('Nincsen bejelentkezve!', {
        duration: 1000
      });
      navigate('/home');
    }
  })

  return (
  <>
  <MainNavBar/>
    <div className='w-screen h-screen overflow-hidden'>
        <div className='w-full h-full flex bg-slate-900 pt-24 text-2xl text-slate-200'>
          <div className='flex w-1/3 items-center justify-center bg-slate-800 gap-14 flex-col'>
            <div className='flex sm:text-8xl text-5xl justify-center pb-10'><ion-icon name="person-circle-outline"></ion-icon></div>
            <div className='flex w-full rounded items-center justify-center flex-col gap-10'>
              <span className='sm:text-3xl text-pretty text-sm'>{user?.nev}</span>
              <span className='sm:text-xl text-pretty text-xs'>Email: {user?.email}</span>
              <span className='sm:text-xl text-pretty text-sm'>Tel.: {user?.telszam}</span>
            </div>
          </div>
          <div className='flex w-2/3 flex-col'>
            <div className='md:text-lg sm:text-xl text-sm flex w-full h-fit p-2'>
              <div><button onClick={() => setWhich(false)} className='bg-slate-700 focus:bg-slate-800 sm:p-4 p-2 rounded-full justify-center items-center border-slate-200 border-2 focus:border-slate-600 transform active:scale-90 transition-transform' autoFocus>Tervezett utazások</button></div>
              <div><button onClick={() => setWhich(true)} className='bg-slate-700 focus:bg-slate-800 sm:p-4 p-2 rounded-full justify-center items-center border-slate-200 border-2 focus:border-slate-600 transform active:scale-90 transition-transform'>Létrehozott utazások</button></div>
            </div>
            <div className='w-full h-full p-2 flex-col overflow-y-scroll bg-slate-700'>
              {
                which ?
                      createdJourneys.map(journey => (
                        <CreatedJourney key={journey.id} journey={journey}/> 
                      ))
                      :
                      joinedJourneys.map(journey => (
                        <JoinedJourney key={journey.id} journey={journey}/>
                      )) 
              }
            </div>
          </div>
        </div>
    </div>
  </>
  )
}

export default Profile