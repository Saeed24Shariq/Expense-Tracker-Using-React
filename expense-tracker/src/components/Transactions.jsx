import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { addValue, setValue, deleteValue } from '../store/expenseSlice';
import shopping from './../assets/shopping.png';
import income from './../assets/income.png';
import housing from './../assets/housing.png';
import up from './../assets/up.png';
import down from './../assets/down.png';
import AddTransaction from './AddTransaction';


const Transactions = (props) => {

    let [selectedItems, setSelectedItems] = useState([]);

    let data = useSelector(state => state.expense.value);
    const transaction = useSelector((state) => state.transaction.value.isOpen);
    let select = useSelector((state) => state.navbar.value.select);
    const dispatch = useDispatch();
    // let data = useSelector((state) => state.expense.value)
    useEffect(() => {
        console.log(props.overflow)
        fetch('./../../Results/Result.csv')
            .then(res => res.text())
            .then((data) => (
                Papa.parse(data,
                    {
                        header: true,
                        skipEmptyLines: true,
                        complete: (result) => {
                            dispatch(setValue(result.data))
                            console.log(result.data);
                        }
                    }
                )
            ))
            .catch(error => console.log(error));
    }, []);

    const selectItemsManager = (item) => {
        setSelectedItems((prev) => {
            let exist = prev.some((i) => i.Name === item.Name)
            return exist ? prev.filter((i) => i.Name != item.Name) : [...prev, item];
        })
        console.log(selectedItems)
    }

    const deleteItems = async (list) => {
        console.log(list)
        try {
            for (let element of list) {
                await fetch('http://localhost:8080/delete-expense', {
                    method: 'post',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        Name: element.Name
                    })
                }
                );
                dispatch(deleteValue(element))
            }
        } catch (error) {
            console.log("Something went Wrong....\n" +
                error
            )
        }

    }


    return (
        <>
            <div className={`${props.overflow ? 'h-[calc(100vh-80px)]' : '' } box-border px-4 mt-2 ${props.overflow ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                <div className='grid grid-cols-4 gap-4 p-5 bg-[#50505026] w-[inherit] rounded-xl'>
                    <div>
                        <h1 className='font-bold'>Name</h1>
                    </div>
                    <div>
                        <h1 className='font-bold'>Expense</h1>
                    </div>
                    <div>
                        <h1 className='font-bold'>Type</h1>
                    </div>
                    <div>
                        <h1 className='font-bold'>Date</h1>
                    </div>
                </div>
                {
                    data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className='grid grid-cols-4 gap-4 p-5 content-center bg-[#50505026] w-[inherit] rounded-xl mt-2'
                            >
                                <div className='flex items-center'>
                                    <input style={
                                        {
                                            display: (select) ? "flex" : "none"
                                        }
                                    } type="checkbox" value={item} id="item-select" onClick={(e) => selectItemsManager(item)} />
                                    <img src={
                                        (item.Type.trim() === 'Shopping') ?
                                            shopping : (item.Type.trim() === 'Income') ?
                                                income : (item.Type.trim() === 'Housing') ?
                                                    housing : ""

                                    } alt="Type Img" className='h-[40px] mx-4' />
                                    <h1>{item.Name}</h1>
                                </div>
                                <div className='flex items-center'>
                                    <img className='h-6' src={(Number(item.Expense) >= 0) ? up :
                                        down
                                    } alt="expense-img" />
                                    <h1>{(Number(item.Expense) >= 0) ? Number(item.Expense) : -Number(item.Expense)}</h1>
                                </div>
                                <div className='flex items-center'>
                                    <h1>{item.Type}</h1>
                                </div>
                                <div className='flex items-center'>
                                    <h1>{item.Date}</h1>
                                </div>
                            </div>
                        );
                    })
                }
                <div className='fixed right-[100px] bottom-[50px]' style={
                    {
                        display: (select) ? "flex" : "none"
                    }
                }>
                    <button onClick={() => deleteItems(selectedItems)} className='p-3 bg-[#ed1414] rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#00000"><path d="M600-240v-80h160v80H600Zm0-320v-80h280v80H600Zm0 160v-80h240v80H600ZM120-640H80v-80h160v-60h160v60h160v80h-40v360q0 33-23.5 56.5T440-200H200q-33 0-56.5-23.5T120-280v-360Zm80 0v360h240v-360H200Zm0 0v360-360Z" /></svg>
                    </button>
                </div>
            </div>
            {
                (transaction) ? <AddTransaction /> : ""
            }
        </>
    )
}

export default Transactions