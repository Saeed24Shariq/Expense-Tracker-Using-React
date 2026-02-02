import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTotalIn, setTotalOut, setLabels } from '../store/reportSlice';



const Report = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        let fetchRequest = async () => {
            await fetch('http://localhost:8080/report')
                .then(res => res.json())
                .then(data => {
                    dispatch(setTotalIn(data.totalIn));
                    dispatch(setTotalOut(data.totalOut));
                    dispatch(setLabels(data.labels))
                })
                .catch(error => console.log(error))
        }
        fetchRequest();
    }, []);

    const { dataInValue, labels, dataOutValue } = useSelector((state) => state.report.value);


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Incomming',
                data: dataInValue,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                // fill: true
            },
            {
                label: 'Outgoing',
                data: dataOutValue,
                borderColor: 'rgba(235, 64, 52, 1)',
                backgroundColor: 'rgba(235, 64, 52, 0.2)',
                // fill: true
            }
        ]
    }

    const config = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Overall Report"
            }
        }
    }

    return (
        <>
            <div className={`${props.scroll? 'h-[calc(100vh-80px)]' : ''} ${props.scroll ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                <div className='grid sm:grid-cols-2'>
                    <div className='p-3 bg-white m-3 rounded-2xl shadow-2xl transition ease-in-out delay-150 hover:translate-1 duration-500'>
                        <div className='h-[200px] flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold'>Total In</h1>
                            <h1 className='text-xl font-semibold'>
                                {
                                    dataInValue.reduce((acc, current) => acc + current, 0)
                                }
                            </h1>
                        </div>
                    </div>
                    <div className='p-3 bg-white m-3 rounded-2xl shadow-2xl transition ease-in-out delay-150 hover:translate-1 duration-500'>
                        <div className='h-[200px] flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold'>Total Out</h1>
                            <h1 className='text-xl font-semibold'>
                                {
                                    -dataOutValue.reduce((acc, current) => acc + current, 0)
                                }
                            </h1>
                        </div>
                    </div>
                </div>
                <Line option={config} data={data} />
            </div>
        </>
    )
}

export default Report