import React, { useState } from 'react'
import Task from "./../../components/Task/Task"

import "./Home.css"

export const Home = () => {
    const [taskList, setTaskList] =useState([
        {
            id: 1,
            title: 'Submit assignment',
            description: 'Nahi to gali padegi',
            priority: 'high'
                 
        },
        {
            id: 2,
            title: 'Go To Market',
            description: 'Buy Alu & Gobi',
            priority: 'medium'
                 
        },
        {
            id: 3,
            title: 'Go To Market',
            description: 'Buy Alu & Gobi',
            priority: 'medium'
                 
        },
    ])
    return (
        <div className='container'>
            <h1 className='app-title'> Daily Task Minder 📃</h1>
           
           <div className='todo-flex-container'>
             <div>
                <h2 className='text-center'>Show List</h2>
                {
                    taskList.map((taskItem, index)=>{
                        const{id, title, description, priority} =taskItem;
                        return <Task id={id} title={title} description={description} priority={priority}
                        />
                    })
                }
             </div>

             <div>
                <h2 className='text-center'>Add List</h2>
             </div>

           </div>


        </div>
    )
}

export default Home                     