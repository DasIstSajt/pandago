import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext';
import {Link} from "react-router-dom";

const MainNavBar = () => {
    const { user, logout } =  useContext(UserContext);
    const token = localStorage.getItem('userToken');
    const [MenuBar, setMenuBar] = useState(false);

    let LinksNoUser=[
        {id: 1, nev: "Bejelentkezés", link:"/login"},
        {id: 2, nev: "Regisztráció", link:"/register"}
    ];
    let LinksUser = [
        {id: 1, nev: "Kezdőlap", link: "/home"},
        {id: 2, nev: "Út létrehozása", link:"/journey"},
        {id: 3, nev: <hr/>},
        {id: 4, nev: <div className='text-5xl'><ion-icon name="person-circle-outline"></ion-icon></div>, link:"/me"},
        {id: 5, nev: <div className='text-5xl' onClick={logout}><ion-icon name="log-out-outline"></ion-icon></div>}

    ]
    return (
        <>
            <div className='w-screen h-full '>
                <div className='w-full flex fixed justify-between z-50 items-center px-5 bg-slate-900 h-24 shadow-black shadow-lg'>
                    <div className='flex h-full items-center w-1/6 text-slate-200'>
                        <img src="logo.png" alt="PandaGO" title='PandaGO' className='w-28'/>
                    </div>
                    <div className='h-full md:flex hidden gap-5 items-center text-slate-200'>
                        {
                            token ? LinksUser.map((link) => {
                                return (
                                    <span key={link.id}>
                                        <Link to={link.link} className='text-xl  hover:text-slate-400 duration-500'>{link.nev}</Link>
                                    </span>
                                )
                            }) : LinksNoUser.map((link) => {
                                return (
                                    <span key={link.id}>
                                        <Link to={link.link} className='text-xl  hover:text-slate-400 duration-500'>{link.nev}</Link>
                                    </span>
                                )
                            })
                        }
                    </div>
                    <div onClick={()=>{setMenuBar(!MenuBar);}} className='text-6xl md:hidden hover:cursor-pointer text-white'>
                        <ion-icon name={MenuBar ? 'close':'menu'}></ion-icon>
                    </div>
                    <ul className={`md:hidden fixed right-0 bg-slate-900 transition-all duration-500 ease-linear backdrop-blur-lg text-slate-200 w-1/2 top-24 flex-col opacity-0 h-screen ${MenuBar ? "opacity-95 right-0" : "right-[-1000px]"}`}>
                        {
                            token ? LinksUser.map((link)=>(
                                <li key={link.id} className='p-2 sm:p1 sm:text-3xl text-xl hover:text-slate-500 duration-500'>
                                    <Link to={link.link}>{link.nev}</Link>
                                </li>
                            )) :
                            LinksNoUser.map((link)=>(
                                <li key={link.id} className='p-2 sm:p1 sm:text-3xl text-xl hover:text-slate-500 duration-500'>
                                    <Link to={link.link}>{link.nev}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MainNavBar
