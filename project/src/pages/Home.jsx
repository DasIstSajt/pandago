import React, {useContext, useEffect, useState} from 'react'
import MainNavBar from '../components/navbar/mainNav';
import { toast } from "react-hot-toast"
import Journey from '../components/Journey';


const Kezdolap = () => {
  const [journeys, setJourneys] = useState([]);

  const getJourneys = async() => {
    const response = await fetch('http://localhost:8000/api/journeys');
    const data = await response.json();

    setJourneys(data);
  }

  useEffect(() => {
    getJourneys();
  }, [])

  return (
    <div>
    <MainNavBar/>
    <div className="w-full h-full flex flex-col pt-24 bg-slate-700 text-slate-200 font-serif">
      <div className='flex justify-center'>
        <div className='h-full sm:w-3/4 w-full flex flex-col gap-y-10'>
          {
            journeys?.map((item,index)=>{
              return(
                <Journey key={index} journey={item}/>
              )
            })
          }
        </div>
      </div>
    </div>
    </div>
  )
}

export default Kezdolap
