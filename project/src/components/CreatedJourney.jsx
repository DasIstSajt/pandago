import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const CreatedJourney = (journey) => {
  const [view, setView] = useState(false);
  const [passengers, setPassengers] = useState([]);

  const getPassengers = async(id) => {
      const response = await fetch(`http://localhost:8000/ut/utasok/${id}`)
      const data = await response.json();

      setView(!view);
      console.log(data[0].felhasznalo)
      setPassengers(data);
  }

  const removeJourney = async (id) => {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`http://localhost:8000/api/removeJourney/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await response.json();
    if(data.message.includes("sikeresen")){
      toast.success(data.message, {
        duration: 1000
      });
      return;
    }
    toast.error(data.message);
  } 

  return (
    <>
            <div className='w-full mb-5 p-5 sm:h-32 h-fit bg-slate-200 shadow-xl text-slate-950 rounded-2xl flex justify-between items-center sm:flex-row flex-col'>
                  <div className='flex w-fit gap-x-5'>
                  <div className='flex sm:text-lg text-base items-center w-fit gap-x-5'>
                    <span>{journey.journey.indulasiHely}</span>
                    <div className='flex flex-col'>
                      <span className='font-bold'>{journey.journey.indulas.split("T")[0]}</span>
                      <span className='font-bold flex justify-center'>{journey.journey.indulas.split("T")[1].slice(0, -8)}</span>
                    </div>
                  </div>
                  </div>
                  <div className='flex text-5xl w-fit'>
                  <ion-icon name={(journey.journey.jarmu === "Busz") ? 'bus-outline' : (journey.journey.jarmu === "Vonat") ? 'train-outline' : (journey.journey.jarmu === "Hajó") ? 'boat-outline' : 'airplane-outline'}></ion-icon>
                  </div>
                  <div className='flex md:text-lg lg:text-xl items-center text-base w-fit gap-x-5'>
                    <span>{journey.journey.uticel}</span>
                    <div className='flex flex-col'>
                      <span className='font-bold'>{journey.journey.veg.split("T")[0]}</span>
                      <span className='font-bold flex justify-center'>{journey.journey.veg.split("T")[1].slice(0, -8)}</span>
                    </div>
                  </div>
                  <div className='flex sm:flex-col justify-between'>
                    <button onClick={() => getPassengers(journey?.journey.id)} className='p-5 px-2 flex items-center justify-center text-center py-2 bg-blue-500 text-md hover:cursor-pointer hover:bg-blue-700 text-white font-bold rounded-2xl max-lg:text-base transform active:scale-90 transition-transform'><ion-icon name='eye-outline'></ion-icon></button>
                    <button onClick={() => removeJourney(journey?.journey.id)} className='p-5 px-2 flex items-center justify-center text-center py-2 bg-red-500 text-md text-white hover:cursor-pointer hover:bg-red-700 font-bold rounded-2xl max-lg:text-base transform active:scale-90 transition-transform'><ion-icon name="trash-outline"></ion-icon></button>
                  </div>
                </div>
                <div className={`h-screen w-screen ${view ? 'flex' : 'hidden'} bg-black bg-opacity-75 z-50 fixed top-0 left-0 justify-center items-center`}>
        <div className='h-screen sm:rounded-xl bg-slate-200 w-full sm:w-1/2 flex-col'>
          <div className='sm:text-7xl text-5xl text-slate-900 flex justify-end'>
            <button onClick={() => setView(!view)}><ion-icon name="close-outline"></ion-icon></button>
          </div>
          <div className='flex h-full w-full flex-col'>
              <div className='sm:text-2xl text-slate-900 text-xl flex h-fit w-screen'>Utasok: </div>
              <div className='flex grid-cols-3 h-full grid-flow-col text-center text-slate-900 sm:text-xl text-lg w-full'>
               <div className="w-full flex flex-col">
                <span>Név:</span>
                {
                  passengers?.map(passenger => (
                    <span key={passenger.felhasznalo.id}>{passenger.felhasznalo.nev}</span>
                  ))
                }
               </div>
               <div className="w-full flex flex-col">
                <span>Email:</span>
                {
                  passengers?.map(passenger => (
                    <span key={passenger.felhasznalo.id}>{passenger.felhasznalo.email}</span>
                  ))
                }
               </div>
               <div className="w-full flex flex-col">
                <span>Tel.szám:</span>
                {
                  passengers?.map(passenger => (
                    <span key={passenger.felhasznalo.id}>{passenger.felhasznalo.telszam}</span>
                  ))
                }
               </div>
              </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default CreatedJourney
