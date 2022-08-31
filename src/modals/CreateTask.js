import React,  {useEffect, useState} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState ('');
    // const [taskDate, setTaskDate] = useState ('');
    const [description, setDescription] = useState ('');

    useEffect(() => {
      if(!modal){
        setTaskName('')
        setDescription('')
      }

    }, [modal])
    
    const handleChange =(e) =>{

    const {name, value} = e.target

     if (name ==="taskName"){
          setTaskName(value)
     } else {
        setDescription(value)
     }
    }

    const handleSave =(e) => {
       e.preventDefault()
       let taskObj  ={} 
       taskObj["Name"] =taskName
       taskObj["Description"] =description
       save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Task</ModalHeader>
        <ModalBody>
         <form>
            <div className='form-group'>
            <label>Task Name</label>
              <input type="text" className='form-control' value={taskName} onChange={handleChange} name="taskName" />
            </div>

            {/* <div className='form-group'>
            <label className='mt-2'> Task Date</label>
            <input type="date" className='form-control' value={taskDate} onChange={handleChange} name="taskName" />
           </div> */}

           <div className='form-group'>
           <label className='mt-2'>Description</label>
            <textarea rows="5" className='form-control mt-2' value = {description} onChange={handleChange} name="description" >  </textarea>
           </div>
         </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave }>
            Add Task
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>   
       
    );
};

export default CreateTask;