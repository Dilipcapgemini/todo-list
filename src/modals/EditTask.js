import React,  {useEffect, useState} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTask = ({modal, toggle, updateTask,taskObj}) => {
    const [taskName, setTaskName] = useState ('');
    // const [taskDate, setTaskDate] = useState ('');
    const [description, setDescription] = useState ('');

    const handleChange =(e) =>{

       const {name, value} = e.target
          
     if (name === "taskName"){
          setTaskName(value)
     } else {
        setDescription(value)
     }
    }

    useEffect(() =>{
       setTaskName(taskObj.Name)
       setDescription(taskObj.Description)
    },[])

    const handleUpdate =(e) => {
       e.preventDefault();
       let tempObj  ={} 
       taskObj["Name"] =taskName
       taskObj["Description"] = description
       updateTask(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
        <ModalBody>
         
            <div className='form-group'>
            <label>Task Name</label>
              <input type="text" className='form-control' value={taskName} onChange={handleChange} name="taskName" />
            </div>

            {/* <div className='form-group'>
            <label className='mt-2'> Task Date</label>
            <input type="date" className='form-control' value={taskDate} onChange={handleChange} name="taskName" />
           </div> */}

           <div className='form-group'>
           <label >Description</label>
            <textarea rows="5" className='form-control mt-2' value = {description} onChange={handleChange} name="description" >  </textarea>
           </div>
       
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate }>
            Update Task
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>   
       
    );
};

export default EditTask;