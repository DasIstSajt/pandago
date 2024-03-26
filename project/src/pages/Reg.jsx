import React, { useState, useContext } from 'react'
import { FloatingLabel } from 'flowbite-react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Reg = () => {
  const navigate = useNavigate();
  const [nev, setNev] = useState()
  const [email, setEmail] = useState()
  const [jelszo, setJelszo] = useState()
  const [jelszoMegint, setJelszoMegint] = useState()
  var [telszam, setTelszam] = useState()
  const { register } = useContext(UserContext)

  const Register = async () =>{
      telszam = String(telszam);
      if(jelszoMegint != jelszo){
        toast.error('A jelszavak nem egyeznek!')
        return;
      }
      const regFormData = {
        nev,
        email,
        jelszo,
        telszam
      }

      if(await register(regFormData)) navigate('/home');
  }
  return (
    <div className='flex sm:h-screen h-full w-screen items-center justify-center bg-slate-900'>
        <div className='w-1/2 h-full justify-center flex rounded-xl bg-slate-200 p-5'> 
          <div className="flex flex-col w-full h-full justify-center gap-10 p-5">
            <FloatingLabel variant="filled" type='email' onChange={()=>setEmail(event.target.value)} label="Email" id='email' className='text-lg max-lg:text-base'/>
            <FloatingLabel variant="filled" label="Teljes név" id='nev' onChange={()=>setNev(event.target.value)} className='text-lg max-lg:text-base'/>
            <FloatingLabel variant="filled" type='number' label="Telefonszám" id='telszam' onChange={()=>setTelszam(event.target.value)} className='text-lg max-lg:text-base [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none' helperText='06-os formátumban'/>
            <div className='flex w-full flex-row max-lg:flex-wrap justify-between max-lg:gap-14'>
              <FloatingLabel variant="filled" type='password' label="Jelszó" id='jelszo' onChange={()=>setJelszo(event.target.value)} className='text-lg max-lg:text-base' helperText='Min. 8 karakter, nagybetű és szám'/>
              <FloatingLabel variant="filled" type='password' label="Jelszó újra" id='jelszoMegint' onChange={() => setJelszoMegint(event.target.value)} className='text-lg max-lg:text-base'/>
            </div>
            <span>Már van profilja? <Link to='/login' className='font-bold hover:underline'>Jelentkezzen be!</Link></span>
            <input type="button" value="Regisztráció" onClick={Register} id='regButton' className='bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 text-center rounded hover:cursor-pointer max-lg:text-base' />
            <Link to='/home'><span className='hover:underline font-bold'>Vissza a kezdőlapra</span></Link>
          </div>
        </div>
    </div>
  )
}

export default Reg
