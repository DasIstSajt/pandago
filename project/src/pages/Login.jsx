import React, {useContext, useState} from 'react'
import { FloatingLabel } from 'flowbite-react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom'

const Bejelentkezes = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [jelszo, setJelszo] = useState();
  const { login } = useContext(UserContext)

  const Login = async ()=>{
    const logFormData = {
      email,
      jelszo
    }
    if(await login(logFormData)) navigate('/home');
  }
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-900'>
        <div className='w-1/2 h-full justify-center flex bg-slate-200 rounded-xl p-5'> 
          <div className="flex flex-col w-full h-full justify-center gap-14 p-5">
            <FloatingLabel variant="filled" type='email' onChange={()=>setEmail(event.target.value)} label="Email" id='email' className='text-lg max-sm:text-base'/>
            <FloatingLabel variant="filled" type='password' label="Jelszó" id='jelszo' onChange={()=>setJelszo(event.target.value)} className='text-lg max-sm:text-base'/>
            <span>Nincs profilja? <Link to='/register' className='font-bold hover:underline'>Regisztráljon egyet!</Link></span>
            <input type="button" value="Bejelentkezés" onClick={Login} id='regButton' className='bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-3 rounded hover:cursor-pointer max-sm:text-base text-center' />
            <Link to='/home'><span className='hover:underline font-bold'>Vissza a kezdőlapra</span></Link>
          </div>
        </div>
    </div>
  )
}

export default Bejelentkezes
