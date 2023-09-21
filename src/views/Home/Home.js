import React, { useEffect, useState } from 'react';
import Task from "./../../components/Task/Task";

import "./Home.css";

 const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit assignment',
            description: 'Nahi to gali padegi',
            priority: 'high'
        }
    ])

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setpriority] = useState('');

    useEffect(()=>{
        const list = JSON.parse(localStorage.getItem('task-minder'));
        setTaskList(list)
    },{})

    const saveListToLocalStorage = (tasks)=>{
        localStorage.setItem('task-minder',JSON.stringify(tasks))
    }

    const addTaskToList = () => {
        const randomId = Math.floor(Math.random() * 1000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }

        const newTaskList = [...taskList, obj]
        setTaskList(newTaskList)

        setTitle('');
        setDescription('');
        setpriority('');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) => {
        // const index = taskList.indexOf(obj);
        let index;
        taskList.forEach((task,i)=>{
            if(task.id===id){
                index=i
            }
        })
        
        const tempArray = taskList;
        tempArray.splice(index, 1);
    
        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
    }

    return (
        <div className='container'>
            <h1 className='app-title'> Daily Task Minder 📃</h1>

            <div className='todo-flex-container'>
                <div>
                    <h2 className='text-center'>Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;
                            return <Task id={id}
                                title={title}
                                description={description}
                                priority={priority}
                                key={index}
                                removeTaskFromList={removeTaskFromList}
                                obj={taskItem}
                            />
                        })
                    }
                </div>

                <div>
                    <h2 className='text-center'>Add List</h2>
                    <div className='add-task-form-container'>

                        <form>
                            <input type='text'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder='Enter Title'
                                className='task-input' />


                            <input
                                type='text'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder='Enter Description'
                                className='task-input' />

                            <input
                                type='text'
                                value={priority}
                                onChange={(e) => {
                                    setpriority(e.target.value)
                                }}
                                placeholder='Enter Priority'
                                className='task-input' />

                            <button className='btn-add-task' type='button' onClick={addTaskToList}>
                                Add Task to List
                            </button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Home;
