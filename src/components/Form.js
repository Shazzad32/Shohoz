import React, { useEffect, useState } from 'react'
import { Box, TextField,Button, Modal} from '@mui/material'
import axios from "axios";
import './style.css'

const Form=({open,handleClose,saveUser,updateUser,selectedUser})=>{
  const [user,setUser] = useState({
    name :'',
    phone_number :'',
    email:'',
    district:'',
    location:''
  })

  useEffect(()=>{
    setUser({...selectedUser})
  },[selectedUser])

  const handelInput =(e)=>{
    console.log(e.target.value)
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const handleSubmit =(e)=>{
    e.preventDefault();

    if(!user.name){
      alert("Enter The Name")
      return;
    }
    else if(!user.email){
      alert("Enter The Email")
      return;
    }
    else if(!user.location){
      alert("Enter Your Location")
      return
    }
    else if(!user.district){
      alert("Enter Your District")
      return
    }
    else if(!user.phone_number){
      alert("Phone Number Requered")
      return
    }

    if (selectedUser){
      updateUser(user)
    }else{
      saveUser(user)
    }
  }

  // const validateForm=()=>{
  //   const {name,phone_number,district,location} = user;
  //   const Error = {}

  //   if(!name || name === " ") Error.name = "Please Enter Name"
  //   if(!phone_number || phone_number === " ") Error.phone_number = "Please Enter Name"
  //   if(!district || district === " ") Error.district = "Please Enter Name"
  //   if(!location || location === " ") Error.location = "Please Enter Name"

  // return Error
    
  // }

  return (
   <div>
    <Modal
      data-aos="fade-up"
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
    <Box className='hello'>
      
        <Box className='second' onSubmit={handleSubmit}>
        <h1 style={{marginTop:-30}}>Customer Informatin</h1>
          <TextField 
          style={{
            width:'90%',
            marginTop:10
          }}
          value={user.name}
          fullWidth
          type='text'
          name='name'
          label="name"
          onChange={handelInput}
          />
          <TextField 
          style={{
            width:'90%',
            marginTop:10
          }}
          value={user.phone_number}
          fullWidth
          type='number'
          name='phone_number'
          label="phone_number"
          onChange={handelInput}
          />
            <TextField
          style={{width:'90%',marginTop:10}}
          value={user.email}
          fullWidth
          type='text'
          name='email'
          label="email"
          onChange={handelInput}
          />
          <TextField
          style={{
            width:'90%',
            marginTop:10
          }}
          value={user.district}
          fullWidth
          name='district'
          type='text'
          label="district"
          onChange={handelInput}
          />
          <TextField
          style={{
            width:"90%",
            marginTop:10
          }}
          value={user.location}
          type='text'
          name="location"
          label="location"
          onChange={handelInput}
          />
        

        <Box display='flex' flexDirection='row' justifyContent='space-around' style={{marginTop:10,marginLeft:380}}>
          <Button 
            onClick={handleSubmit} 
            type='submit'
            style={{backgroundColor:'lightskyblue',marginRight:20}}
            >
              {selectedUser ? "Update" : "Send"}
              
          </Button>   

         <Button 
          onClick={handleClose} 
          style={{backgroundColor:'lightskyblue',}}
          >CANCEL
         </Button>   
        </Box>
        </Box>        
    </Box>
    </Modal>
   </div>
  )
}

export default Form

