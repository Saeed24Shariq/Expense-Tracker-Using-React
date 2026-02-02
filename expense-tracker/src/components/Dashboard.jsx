import React from 'react'
import Report from './Report.jsx'
import Transactions from './Transactions.jsx'


const Dashboard = () => {
    return (
        <>
            <div className='overflow-y-scroll h-[calc(100vh-80px)]'>
                <Report scroll={false} />
                <div className='h-[50vh] overflow-y-scroll'>
                    <h1 className='text-2xl text-center font-bold p-2'>Transactions</h1>
                    <Transactions overflow={false} />
                </div>
            </div>
        </>
    )
}

export default Dashboard