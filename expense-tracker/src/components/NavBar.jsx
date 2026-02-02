import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { open } from './../store/transactionSlice.jsx';
import { setSelect } from '../store/NavBarSlice.jsx';

const NavBar = () => {

    const dispatch = useDispatch();

    let navbar = useSelector((state) => state.navbar.value);

    return (
        <>
            <div className='flex justify-between items-center p-3 h-[70px]'>
                <h1 className='text-2xl font-bold'>{navbar.name}</h1>
                <div className='flex'>

                    <button style={
                        {
                            display: (navbar.add) ? "flex" : "none"
                        }
                    } onClick={() => dispatch(open())} className='flex items-center font-bold ml-5 p-2 bg-[#7f7f82] w-[150px] rounded-lg flex justify-center cursor-pointer transition-opacity duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                        Transaction
                    </button>
                    <a style={
                        {
                            display: (navbar.download) ? "flex" : "none"
                        }
                    } href="./../../Results/Result.csv" download>
                        <button className='flex items-center font-bold ml-5 p-2 bg-[#7f7f82] w-[150px] rounded-lg flex justify-center cursor-pointer transition-opacity duration-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
                            Downlaod
                        </button>
                    </a>
                    <button
                    style={
                        {
                            display: (navbar.delete) ? "flex" : "none"
                        }
                    }
                    onClick={ () => dispatch(setSelect()) }
                    className='flex items-center font-bold ml-5 p-2 bg-[#ed1414] w-[150px] rounded-lg flex justify-center cursor-pointer transition-opacity duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                        {( navbar.select )? "Cancel": "Delete"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default NavBar