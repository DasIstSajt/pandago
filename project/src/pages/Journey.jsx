import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { FloatingLabel } from 'flowbite-react'
import MainNavBar from '../components/navbar/mainNav'


const Journey = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    const createJourney = async() => {
      formData.ar = Number(formData.ar);
      const response = await fetch('http://localhost:8000/api/addJourney', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json();
      if(data.message.includes("Út")){
        toast.success(data.message, {
          duration: 1000
        });
        navigate('/home');
        return;
      }
      toast.error(data.message);
    }

    let formObj = {
      indulas: "",
      veg: "",
      indulasiHely: "",
      uticel: "",
      jarmu: "Repülőgép",
      ar: 0
    }
    const [formData, setFormData] = useState(formObj);

    // ...-rest operátor --ES6 frissítés
    // 
    const handleChange = (e) => {
      setFormData({
     ...formData,
        [e.target.id]: e.target.value
      })
    }

    const getCountries = async() => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        setCountries(data);
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if(!token){
          toast.error('Nincsen bejelentkezve!', {
            duration: 1000
          });
          navigate('/home');
        }
      })
    useEffect(() => {
        getCountries();
    }, []);
  return (
    <>
    <MainNavBar/>
        <div className='w-screen h-screen'>
            <div className='w-full h-full sm:text-xl text-xs flex pt-28 justify-center items-center bg-slate-900 p-10 flex-col'>
                <div className='h-full sm:w-1/2 w-full bg-slate-200 text-slate-900 rounded-2xl p-5 flex justify-center gap-x-5'>
                  <div className='flex w-full items-center justify-between flex-col'>
                        <FloatingLabel variant="filled" type='datetime-local' onChange={handleChange} label="Indulási idő" id='indulas' className='text-center text-xl max-lg:text-base'/>
                        <FloatingLabel variant='filled' label='Indulás helye' onChange={handleChange} id='indulasiHely' list='orszagok' className='w-full flex text-center text-xl max-lg:text-base'/>
                        <datalist id='orszagok' name="orszagok">
                            {
                                countries?.map(country => (
                                  <option className='hidden' value={country?.capital}>{country?.name.common}</option>  
                                ))
                            }
                        </datalist>
                        <select name="vehicles" id="jarmu" onChange={handleChange} className='text-xl max-lg:text-base text-center h-14'>
                          <option value="Repülőgép">Repülőgép</option>
                          <option value="Busz">Busz</option>
                          <option value="Hajó">Hajó</option>
                          <option value="Vonat">Vonat</option>
                        </select>
                        <FloatingLabel variant="filled" type='datetime-local' onChange={handleChange} label="Tervezett érkezés" id='veg' className='text-center text-xl max-lg:text-base'/>
                        <FloatingLabel variant='filled' label='Úticél' list='orszagok2' onChange={handleChange} id='uticel' className='w-full flex text-center text-xl max-lg:text-base'/>
                        <datalist id='orszagok2' name="orszagok">
                            {
                                countries?.map(country => (
                                  <option className='hidden' value={country?.capital}>{country?.name.common}</option>  
                                ))
                            }
                        </datalist>
                        <FloatingLabel variant='filled' onChange={handleChange} id='ar' type='number' label='Az út ára' helperText='Fortintban megadva' className='text-center text-xl max-lg:text-base [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'/>
                        <input type="button" value="Létrehozás!" onClick={createJourney} id='regButton' className='w-full h-14 bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 text-center rounded hover:cursor-pointer max-lg:text-base transform active:scale-90 transition-transform' />
                      </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Journey
