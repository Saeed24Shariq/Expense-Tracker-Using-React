import React, { useState } from 'react';
import logo from './../assets/logo.png';
import { Menu, X, LayoutDashboard, ReceiptText, BarChart3, Settings, Link as LinkIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setNavbar } from './../store/NavBarSlice.jsx'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Navigation data for cleaner code
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={22} /> },
        { name: 'Transactions', icon: <ReceiptText size={22} /> },
        { name: 'Reports', icon: <BarChart3 size={22} /> },
    ];

    const dispatch = useDispatch();

    return (
        <>
            {/* 1. MOBILE HAMBURGER (Visible only when sidebar is closed) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className='md:hidden fixed top-5 left-5 z-50 p-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50'
                >
                    <Menu size={24} />
                </button>
            )}

            {/* 2. SIDEBAR CONTAINER */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-50 bg-white transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
                flex flex-col justify-between h-screen p-5 border-r-2 border-[#6b696821] 
                w-[300px] font-[poppins]
            `}>

                <div>
                    {/* Header: Logo + Close Button */}
                    <div className='flex items-center justify-between mb-10'>
                        <div className='flex items-center'>
                            <img className='h-[45px]' src={logo} alt="GHAZNIX" />
                            <div className='ml-3'>
                                <h1 className='text-lg font-bold leading-tight'>GHAZNIX</h1>
                                <span className='text-[10px] uppercase tracking-[2px] font-bold text-gray-400'>Expense Tracker</span>
                            </div>
                        </div>

                        {/* Close button inside sidebar (Mobile only) */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className='md:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors'
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className='space-y-2'>
                        {navItems.map((item, index) => (
                            <Link key={index} to={(item.name === "Dashboard")? "/" : `/${item.name}`}>
                                <div onClick={() => dispatch(setNavbar(item.name))}
                                    className='flex items-center p-3 text-gray-600 hover:text-black hover:bg-[#6b696810] rounded-xl cursor-pointer transition-all group'
                                >
                                    <span className='group-hover:scale-110 transition-transform'>
                                        {item.icon}
                                    </span>
                                    <h1 className='ml-3 font-bold'>{item.name}</h1>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer: User Profile */}
                <div className='pt-5 border-t border-gray-100'>
                    <div className='flex items-center p-2 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all'>
                        <div className='w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg>
                        </div>
                        <div className='ml-3'>
                            <h1 className='font-bold text-sm'>Giglooo</h1>
                            <p className='text-[11px] text-gray-500 font-medium'>Premium User</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. MOBILE OVERLAY (Darkens the screen when menu is open) */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden"
                />
            )}
        </>
    );
};

export default SideBar;