import React, {useEffect, useState} from 'react';
import CreateTask from './modals/CreateTask';
import Card from './Card';

const Todolist = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState ([])
    const [ search, setSearch ] = useState('');
    const [ tempSearch, setTempSearch ] = useState('');
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
        debugger;
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
        //const { target: { value } } = e
        console.log('e', e.target.value)
        setTempSearch(e.target.value)
    }

    const customFilter = (item) => {

        console.log('iotem', item, 'search', search)

        if(search ){
            if(item.Name.indexOf(search)){
                return item
            }
        } else {
            return item
        }
    }

    const handleSearchClick = () => {
        setSearch(tempSearch)
    }

    const handleReset = () => {
        setTempSearch('')
        setSearch(null)
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
            <button className="mx-2 " onClick={() => handleSearchClick()}>Search</button> 
            <button onClick={() => handleReset()}>Reset</button>
            </div>
        </div>
        <div className='task-container'>
            { taskList.filter((item) => customFilter(item)).map((obj , index) => <Card taskObj ={obj} index ={index} deleteTask ={deleteTask} updateListArray ={updateListArray }/>)}
        </div>
     
     <CreateTask toggle={toggle} modal={modal} save ={saveTask}/>
   
        </>
    );
};

export default Todolist;