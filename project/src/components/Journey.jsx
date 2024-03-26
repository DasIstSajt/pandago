import React, {useState, useEffect, useContext } from 'react'
import {toast} from 'react-hot-toast'
import UserContext from '../context/UserContext';

const Journey = (journey) => {
    const [disabled, setDisabled] = useState(false);

    const { user } = useContext(UserContext);

    const joinJourney = async(utID) => {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`http://localhost:8000/ut/joinJourney/${utID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
    
        const data = await response.json();
        if(data.message.includes("Sikeresen")){
          toast.success(data.message, {
            duration: 1000
          });
          setDisabled(true);
          return;
        }
        toast.error(data.message);
      }


      const getPassengers = async (id) => {
        const response = await fetch(`http://localhost:8000/ut/utasok/${id}`)
        const data = await response.json();

        if(data?.some(utas => utas.felhasznalo.id === user.id)) setDisabled(true);
      }

      useEffect(() => {
        getPassengers(journey?.journey.id);
        
      }, [disabled]);

      useEffect(() => {
        getPassengers(journey?.journey.id);
        
      },);
  return (
    <>
          <div key={journey?.id} className='w-full py-2 mb-5 mt-3 p-5 gap-x-5 h-44 bg-slate-200 shadow-xl text-slate-950 rounded-2xl flex justify-between items-center flex-col'>
            <div className='flex items-center'>
              <div className='flex sm:text-lg text-md items-center w-fit gap-x-5'>
                <span>{journey?.journey.indulasiHely}</span>
                <div className='flex flex-col '>
                  <span className='font-bold sm:text-lg text-md'>{journey?.journey.indulas.split("T")[0]}</span>
                  <span className='font-bold flex justify-center sm:text-lg text-md'>{journey?.journey.indulas.split("T")[1].slice(0, -8)}</span>
                </div>
              </div>
              <div className='flex md:text-5xl text-3xl p-5 w-fit'>
              <ion-icon name={(journey.journey.jarmu === "Busz") ? 'bus-outline' : (journey.journey.jarmu === "Vonat") ? 'train-outline' : (journey.journey.jarmu === "Hajó") ? 'boat-outline' : 'airplane-outline'}></ion-icon>
              </div>
              <div className='flex sm:text-lg text-md items-center w-fit gap-x-5'>
                <span>{journey?.journey.uticel}</span>
                <div className='flex flex-col'>
                  <span className='font-bold'>{journey.journey.veg.split("T")[0]}</span>
                  <span className='font-bold flex justify-center'>{journey.journey.veg.split("T")[1].slice(0,-8)}</span>
                </div>
              </div>
            </div>
            <div className='flex w-full sm:text-lg text-md text-center justify-between items-center'>
              {
                disabled ? <input type="button" value="Csatlakozva!" id='joinButton' className='sm:p-5 p-0 text-center py-2 sm:w-60 w-40 h-10 sm:h-14 opacity-50 bg-blue-500 text-md text-white font-bold rounded max-lg:text-base transform' disabled/> : <input type="button" value="Csatlakozom!" onClick={() => joinJourney(journey.journey.id)} id='joinButton' className='sm:p-5 p-0 text-center py-2 sm:w-60 w-40 h-10 sm:h-14 bg-blue-500 hover:bg-blue-700 text-md text-white font-bold rounded hover:cursor-pointer max-lg:text-base transform active:scale-90 transition-transform' />  
              }
              <div className='flex flex-col'>
                <span className='flex justify-end font-bold'>{journey.journey.ar} Ft</span>
                <span>Szervező: {journey.journey.tervezo.nev}</span>
              </div>
            </div>
        </div>
    </>
  )
}

export default Journey
