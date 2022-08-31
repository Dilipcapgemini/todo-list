import React, {useEffect, useState} from 'react';
import CreateTask from './modals/CreateTask';
import Card from './Card';

const Todolist = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState ([])
    const [ search, setSearch ] = useState('');
    const [ tempSearch, setTempSearch ] = useState('');
    const [ dateSearch, setDateSearch ] = useState('');
    const [ tempDateSearch, setTempDateSearch ] = useState('');
    useEffect (()  =>{
        let arr = localStorage.getItem("taskList")
        if (arr){
            let obj = JSON.parse(arr)
            setTaskList (obj)
        }
    }, [])

    const deleteTask =(index) => {
        let tempList = taskList
        tempList.splice (index, 1)
        localStorage.setItem ("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray =(obj, index) =>{
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem ("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    } 

    const saveTask =(taskObj) =>{
      let tempList = taskList 
      tempList.push (taskObj)
      localStorage.setItem ("taskList", JSON.stringify(tempList))
      setModal(false)
      setTaskList(taskList) 
    }

    const handleSearch = (e) => {
        e.preventDefault()
        
        setTempSearch(e.target.value)
    }

    const customFilter = (item) => {
        if(search || dateSearch ){
            const searchDateTimestamp = new Date(dateSearch).setHours(0,0,0,0);
            const createdAtTimeStamp = new Date(item.createdAt).setHours(0,0,0,0);
            if(!item.Name.indexOf(search) && !dateSearch){
                return item
            } else if(!item.Name.indexOf(search) && (searchDateTimestamp === createdAtTimeStamp)){
                return item
            }
        } else {
            return item
        }
    }

    const handleSearchClick = () => {
        setSearch(tempSearch)
        setDateSearch(tempDateSearch)
    }

    const handleReset = () => {
        setTempSearch('')
        setDateSearch('')
        setTempDateSearch('')
        setSearch(null)
    }

    const handleDate = (event) => {
        const { target: { value }} = event;
        console.log('value', value)
        setTempDateSearch(value)
    }

    return (
        <>
        <div class="main text-center">
            <h2>Todo List</h2>
            <button className='btn btn-primary mt-3' onClick = {()=> setModal(true)}>Create Task</button>
        </div>

        <div className="d-flex justify-content-center py-4" >
            <div>
            <input name="search" placeholder="Search" value={tempSearch} onChange={(event) => handleSearch(event)} /> 
            <input className="mx-2" type="date" name="dateFilter" value={tempDateSearch} onChange={(event) => handleDate(event)} />
            <button className="mx-2 " onClick={() => handleSearchClick()}>Search</button> 
            <button onClick={() => handleReset()}>Reset</button>
            </div>
            <div>
                
            </div>
        </div>
        <div className='task-container'>
            {taskList && taskList.filter((item) => customFilter(item)).map((obj , index) => <Card taskObj ={obj} index ={index} deleteTask ={deleteTask} updateListArray ={updateListArray }/>)}
        </div>
     
     <CreateTask toggle={toggle} modal={modal} save ={saveTask}/>
   
        </>
    );
};

export default Todolist;