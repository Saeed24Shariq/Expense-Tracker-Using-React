import React from 'react'
import { useDispatch } from 'react-redux'
import { close } from '../store/transactionSlice';
import { addValue } from '../store/expenseSlice';

const AddTransaction = () => {

    const dispatch = useDispatch();

    const save = async () => {
        let name = document.getElementById('name').value;
        let expense = document.getElementById('expense').value;
        let type = document.getElementById('type').value;
        let date = document.getElementById('date').value;
        let mode = document.getElementById('mode').value;

        if (name === '' || expense === '' || type === '' || date === '' || mode === '') {
            alert("Fill All Required Fields!!!");
            return;
        }

        if(expense < 0){
            alert("Expense Should be positive!!!");
            return;
        }

        let newDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })

        if(mode === 'Outgoing'){
            expense = -Number(expense);
        }

        // console.log(name + "\n" +
        //     expense + "\n" +
        //     type + "\n" +
        //     newDate + "\n" +
        //     mode + "\n"
        // )

        await fetch('http://localhost:8080/add-expense', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Name: name,
                Expense: expense,
                Type: type,
                Date: newDate
            })
        })
        dispatch(addValue({
            Name: name,
            Expense: expense,
            Type: type,
            Date: newDate
        }));
        dispatch(close());
    }

    return (
        <>
            <div className='bg-[#adadad79] flex justify-center items-center fixed top-0 h-full w-[inherit]'>
                <div className='bg-[#ffffff] p-3 rounded-xl w-[500px]'>
                    <div className='my-4 flex items-center'>
                        <label htmlFor="name" className="flex flex-1 font-bold after:content-['*'] after:text-red-700">Expense Name </label>
                        <input id='name' type="text" className='flex flex-2 mx-3 rounded-lg border-2 border-black p-1' />
                    </div>
                    <div className='my-4 flex items-center'>
                        <label htmlFor="expense" className="flex flex-1 font-bold after:content-['*'] after:text-red-700">Expense $ </label>
                        <input id='expense' type="number" className='flex flex-2 mx-3 rounded-lg border-2 border-black p-1' />
                    </div>
                    <div className='my-4 flex items-center'>
                        <label htmlFor="type" className="flex flex-1 font-bold after:content-['*'] after:text-red-700">Type </label>
                        <select name="type" id="type" className='flex flex-2 mx-3 rounded-lg border-2 border-black p-1.5'>
                            <option value="Shopping">Shopping</option>
                            <option value="Income">Income</option>
                            <option value="Housing">Housing</option>
                        </select>
                    </div>
                    <div className='my-4 flex items-center'>
                        <label htmlFor="date" className="flex flex-1 font-bold after:content-['*'] after:text-red-700">Date </label>
                        <input id='date' type="date" className='flex text-center flex-2 mx-3 rounded-lg border-2 border-black p-1' />
                    </div>
                    <div className='my-4 flex items-center'>
                        <label htmlFor="mode" className="flex flex-1 font-bold after:content-['*'] after:text-red-700">Transaction Mode </label>
                        <select name="type" id="mode" className='flex flex-2 mx-3 rounded-lg border-2 border-black p-1.5'>
                            <option value="Shopping">Outgoing</option>
                            <option value="Income">Incoming</option>
                        </select>
                    </div>
                    <div className='my-4 flex items-center justify-center'>
                        <button onClick={save} className="mx-2 bg-[#24a824] p-2 w-[100px] font-bold rounded-lg">
                            Save
                        </button>
                        <button onClick={() => dispatch(close())} className='mx-2 bg-[#cb1010] p-2 w-[100px] font-bold rounded-lg'>
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTransaction