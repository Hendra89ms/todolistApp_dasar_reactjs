import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'

export default function App() {

    const [inputValue, setInputValue] = useState('')
    const [data, setData] = useState([])
    const [editData, setEditData] = useState(null)

    useEffect(() => {
        if (editData) {
            setInputValue(editData.title)
        } else {
            setInputValue('')
        }
    }, [setInputValue, editData])

    // SUBMIT FORM
    const handleSubmit = (e) => {
        e.preventDefault()

        if(inputValue.trim() === ""){
            return alert('You must Input Data!')
        }

        const allData = [...data, { id: uuidv4(), title: inputValue, completed: false }];

        if (!editData) {
            setData(allData);
            setInputValue('')
        }
        else {
            // UPDATE DATA
            updateData(inputValue, editData.id, editData.completed, editData.title)
        }

    }

    // DELETE DATA
    const handleDelete = (id) => {
        const deleteData = data.filter((item) => {
            if (item.id === id) {
                if (item.completed) {
                    // Hapus data jika completed true
                    return false; // Item akan dihapus dari array hasil filter
                } else {
                    // Tampilkan peringatan jika completed false
                    alert('You have to cross out the data!');
                }
            }
            return true; // Item tetap dalam array hasil filter
        });

        setData(deleteData);
    }

    // COMPLETED
    const handleComplete = (id) => {

        const completedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, completed: !item.completed }
            }
            return item;
        })

        setData(completedData)

    }

    // EDIT DATA
    const handleEdit = (id) => {
        const findTodo = data.find(item => item.id === id);
        setEditData(findTodo);
    }

    // UPDATE DATA 
    const updateData = (title, id, completed) => {
        const newTodo = data.map((todo) => (
            todo.id === id ? { title, id, completed } : todo
        ))
        setData(newTodo);
        setEditData('');
    }

    return (
        <div className="w-full flex justify-center items-center h-screen bg-[#DAAA7D]">
            <div className="w-[500px] mt-10 bg-[#12333A] h-[500px] p-5 rounded-md">
                <h1 className="text-white text-3xl text-center mb-5 font-semibold">Todo-List</h1>

                <form onSubmit={handleSubmit} className="text-white w-full">
                    <div className="flex gap-5">
                        <input
                            autoFocus
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            type="text"
                            placeholder="Add Todo"
                            className="outline-none border-[1px] rounded-md p-3 text-white bg-[#12333A]"
                        />
                        <button type="submit" className="bg-[#DAAA7D] w-full py-3 rounded-md text-black font-semibold">Add</button>
                    </div>
                </form>


                <div className="h-[350px] overflow-scroll p-3">
                {
                    data.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="w-full border-[1px] border-white rounded-md mt-5 p-4 flex justify-between px-10 ">
                                    <h1 className={`text-white ${item.completed && "line-through"}`}>{item.title}</h1>
                                    <div className="flex gap-3 ">
                                        <AiOutlineCheckCircle
                                            color="black"
                                            onClick={() => handleComplete(item.id)}
                                            size={25} style={{
                                                backgroundColor: "green",
                                                borderRadius: "100%",
                                                cursor: "pointer"
                                            }} />

                                        <MdEdit
                                            onClick={() => handleEdit(item.id)}
                                            color="white"
                                            size={25} style={{
                                                backgroundColor: "blue",
                                                borderRadius: "100%",
                                                padding: '3px',
                                                cursor: "pointer"
                                            }} />

                                        <AiOutlineDelete
                                            color="black"
                                            onClick={() => handleDelete(item.id)}
                                            size={25} style={{
                                                backgroundColor: "#F3696C",
                                                borderRadius: "100%",
                                                cursor: "pointer"
                                            }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>

        </div>


    )
}