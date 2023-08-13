import React, { useState,useEffect } from "react";
import Table from "./Table";
import axios from "axios";
import './style/table.css'
import { Button, Modal,Box} from "@mui/material";
import Form from "./Form";

const Home=()=>{
    const [state,setState] = useState({
        datas:[],
        open : false,
        deleteOpen :false,
        selectedUser: null,
        dataResult:[],
        searchItem:"",
        isCheck:false
      });

    useEffect(() => {
        const getUser=()=>{
            axios.get('http://localhost:3001/users')
            .then(res => {
                let data = res.data.user
                console.log(data)
                let old = {...state}
                old.datas=data
                old.dataResult=data
                setState(old)
            })
            .catch(error => {
              console.log(error);
            });
        }
        getUser();
      }, [state.data]);

    const handleClose=()=>{
        const old = {...state}
        old.open=false;
        setState(old)
    }
    const onAddClick=()=>{
        const old = {...state}
        old.open=true
        setState(old)
    }

    const saveUser=user=>{
        axios.post('http://localhost:3001/users',user)
        .then(x=>{
            const old = {...state}
            old.open=false
            old.datas = [x.data, ...old.datas]
            setState(old)
        }).catch(err=>console.log(err))    
    }

    const updateUser=user=>{
        axios.put('http://localhost:3001/users/'+user._id,user)
        .then(x=>{
            let datas = [...state.datas].map(x=>x._id===user._id?user:x)
            setState(old=>({...old,datas:datas,open:false}))
        })
        .catch(err=>console.log(err))
    }

    const onEditClick=(user)=>{
        let old = {...state}
        old.open = true
        old.selectedUser = user
        setState(old) 
    }
       const onDeleteClick=(user)=>{
        let old = {...state}
        old.deleteOpen=true
        old.selectedUser = user
        setState(old)
    }

    const handelDeleteClose=()=>{
        const old = {...state}
        old.deleteOpen = false
        setState(old)
    }

    const deleteUser =()=>{
        axios.delete('http://localhost:3001/users/'+state.selectedUser._id)
        .then(res=>{
            let old = {...state}
            old.datas = old.datas.filter(x=>x._id !== state.selectedUser._id)
            old.deleteOpen = false
            setState(old)
        }).catch(error=>{
            console.log(error);
        })
    }

    const searchText=(e)=>{
        let searchText = e.target.value;
        console.log(searchText)
        let old = {...state}
        if(searchText===""){
            old.datas = [...old.dataResult]
        }else{
            old.datas = [...old.dataResult].filter(search=>{
                return(
                    (search.name && search.name.toLowerCase().includes(searchText.toLowerCase()))||
                    (search.phone_number && String(search.phone_number).toLowerCase().includes(searchText.toLowerCase()))||
                    (search.district && search.district.toLowerCase().includes(searchText.toLowerCase()))||
                    (search.location && search.location.toLowerCase().includes(searchText.toLowerCase()))
                )
            })
        }
        old.searchItem= searchText
        setState(old)
    }

    const countDevice=()=>{
        const old = {...state}
        const user = old.datas
        return user
    }

    const DeleteModal =()=>{
        return <Modal
        keepMounted
        open={state.deleteOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
        <Box className="deleteModal">
        <Box className="modal">
            <p style={{marginLeft:50,marginTop:15}}>Do you want to delete ?</p>
             <h4 style={{marginLeft:50,marginTop:15}}>{state.selectedUser.name} !!!</h4> 
            <button onClick={deleteUser} style={{marginTop:80,marginLeft:50,height:30,width:70,border:'1px solid red',borderRadius:4,padding:5,color:'red',cursor:'pointer'}} >DELETE</button>
            <button  onClick={handelDeleteClose} style={{marginTop:80,marginLeft:15,height:30,width:70,border:'1px solid green',borderRadius:4,padding:5,color:'green',cursor:'pointer'}}>CANCEL</button>
            </Box>
        </Box>
    </Modal>
    }
  
    return(
        <div className="maind">
            <div className="div_1">
                <div style={{height:50,width:100,border:'1px solid white'}}>
                    <h2 style={{marginTop:5,textAlign:'center',color:'white'}}>User :{countDevice().length}</h2>
                </div>
                {/* <div>Rangpur:{Loca().length}</div> */}
            </div>
            <div className="div_2">
                <div className="table">
                    <div style={{height:'20%',width:'100%',backgroundColor:'#698269'}}>
                    <input type="search"
                            name="search"
                            placeholder=" Search..."
                            value={state.searchItem}
                            onChange={searchText}
                             style={{width:250,height:32,padding:5,marginLeft:3,marginTop:15,borderRadius:5}}/>
                        <Button onClick={onAddClick} style={{color:'white',fontWeight:'bolder',height:30,width:100,backgroundColor:'orange',marginLeft:10,marginTop:1}}>Add New</Button>
                        <input 
                        style={{width:20,height:20,marginLeft:15}} 
                        type="checkbox" 
                        name="isCheck"
                        checked={state.isCheck}
                        ></input>
                        <div  style={{height:50,width:'100%',backgroundColor:'#698269',marginTop:20,borderTop:'1px solid white',display:'flex',flexDirection:'row'}}>
                            <div style={{display:'flex',flexDirection:'row',flex:8,width:'100%'}}>
                                <p style={{flex:2,fontWeight:"bolder",padding:10,color:'white'}}>Name</p>
                                <p style={{flex:2,fontWeight:"bolder",padding:10,color:'white'}}>Phone Number</p>
                                <p style={{flex:2,fontWeight:"bolder",padding:10,color:'white'}}>Email</p>
                                <p style={{flex:2,fontWeight:"bolder",padding:10,color:'white'}}>District</p>
                                <p style={{flex:2,fontWeight:"bolder",padding:10,color:'white'}}>Location</p>
                                <h3 style={{flex:2,color:'white',padding:8}}>Action</h3>
                            </div>
                            
                        </div>
                    </div>
                    <div className="tab" style={{height:'80%',width:'100%',backgroundColor:'white',border:'1px solid gray',overflowY:'scroll'}} >
                       
                        {
                            state.datas.map((x,i)=><Table item={x} key={i} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />)
                        }
                    </div>
                </div>
            </div>
            {
                <Form open={state.open} handleClose={handleClose} saveUser={saveUser} selectedUser={state.selectedUser} updateUser={updateUser} setState={setState}/>
            }
            {state.deleteOpen && <DeleteModal/>}
        </div>
    )
}
export default Home;


