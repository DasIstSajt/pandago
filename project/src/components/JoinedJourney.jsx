import React, { useState } from 'react'
import toast from 'react-hot-toast';

const JoinedJourney = (journey) => {
  const [view, setView] = useState(false);
  
  const leaveJourney = async(id) => {
    const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:8000/ut/leaveJourney/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json();
      if(data.message.includes("Sikeresen")){
        toast.success(data.message, {
          duration: 1000
        });
        setView(!view);
        return;
      }
      toast.error(data.message);
  }

  return (
    <>
        <div className='w-full mb-5 p-5 sm:h-32 h-fit bg-slate-200 shadow-xl text-slate-950 rounded-2xl flex justify-between items-center sm:flex-row flex-col'>
                  <div className='flex w-fit gap-x-5'>
                  <div className='flex sm:text-lg text-base items-center w-fit gap-x-5'>
                    <span>{journey.journey.ut.indulasiHely}</span>
                    <div className='flex flex-col'>
                      <span className='font-bold'>{journey.journey.ut.indulas.split("T")[0]}</span>
                      <span className='font-bold flex justify-center'>{journey.journey.ut.indulas.split("T")[1].slice(0, -8)}</span>
                    </div>
                  </div>
                  </div>
                  <div className='flex text-5xl w-fit'>
                  <ion-icon name={(journey.journey.ut.jarmu === "Busz") ? 'bus-outline' : (journey.journey.ut.jarmu === "Vonat") ? 'train-outline' : (journey.journey.ut.jarmu === "Hajó") ? 'boat-outline' : 'airplane-outline'}></ion-icon>
                  </div>
                  <div className='flex md:text-lg lg:text-xl items-center text-base w-fit gap-x-5'>
                    <span>{journey.journey.ut.uticel}</span>
                    <div className='flex flex-col'>
                      <span className='font-bold'>{journey.journey.ut.veg.split("T")[0]}</span>
                      <span className='font-bold flex justify-center'>{journey.journey.ut.indulas.split("T")[1].slice(0, -8)}</span>
                    </div>
                  </div>
                  <div className='flex sm:flex-col justify-between'>
                    <button onClick={() => setView(!view)} className='p-5 px-2 flex items-center justify-center text-center py-2 bg-red-500 text-md text-white hover:cursor-pointer hover:bg-red-700 font-bold rounded-2xl max-lg:text-base transform active:scale-90 transition-transform'><ion-icon name="exit-outline"></ion-icon></button>
                  </div>
                </div>
                <div className={`h-screen w-screen ${view ? 'flex' : 'hidden'} bg-black bg-opacity-75 z-50 fixed top-0 left-0 justify-center items-center`}>
        <div className='h-48 sm:rounded-xl bg-slate-200 w-fit flex-col flex p-5 justify-between'>
          <div className='sm:text-3xl text-2xl text-slate-900 flex justify-center'>
          <span>Biztosan el szeretné hagyni ezt az utat?</span>
          </div>
          <div className='sm:text-2xl text-xl text-slate-200 flex justify-around'>
              <button onClick={() => leaveJourney(journey.journey.ut.id)} className='p-5 py-3 bg-emerald-500 rounded-full'>Igen</button>
              <button onClick={() => setView(!view)} className='p-5 py-3 bg-red-500 rounded-full'>Nem</button>
          </div>
        </div>
        </div>
    </>
  )
}

export default JoinedJourney