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
    
    const [id, setId] = useState (0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('task-minder'));
        if (list && list.length > 0) {
            setTaskList(list)
        }

    }, [])

    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('task-minder', JSON.stringify(tasks))
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
        setPriority('');

        saveListToLocalStorage(newTaskList);
    }

    const removeTaskFromList = (id) => {
        // const index = taskList.indexOf(obj);
        let index;
        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray);
    }
    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);

        let currentEditTask;
        taskList.forEach((task)=>{
            if (task.id === id){
                currentEditTask = task;
            }
        })

        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);

        console.log (currentEditTask);
        // console.log(id)
    }
    const UpdateTask = ()=> {
        let indexToUpdate;
        taskList.forEach((task, i) => {
            if(task.id === id){
                indexToUpdate = i;
            }
        })

        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            description: description,
            priority: priority
        }

        setTaskList([...tempArray])

        saveListToLocalStorage(tempArray)

        setId(0);
        setTitle('');
        setDescription('');
        setPriority('');
        setIsEdit(false)

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
                                // obj={taskItem}
                                setTaskEditable={setTaskEditable}
                            />
                        })
                    }
                </div>

                <div>
                    <h2 className='text-center'>
                        {isEdit ? `Update Task ${id}` : 'Add Task'}
                    </h2>
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
                                    setPriority(e.target.value)
                                }}
                                placeholder='Enter Priority'
                                className='task-input' />

                            <div className='btn-container'>
                                {
                                    isEdit ?
                                        <button className='btn-add-task'
                                            type='button'
                                            onClick={UpdateTask}>
                                            Update Task
                                        </button>
                                        :
                                        <button className='btn-add-task'
                                            type='button'
                                            onClick={addTaskToList}>
                                            Add Task
                                        </button>
                                }
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Home;
