import React from "react";
import './style/table.css'

const Table=({item,onDeleteClick,onEditClick})=>{
    // console.log(item);
    return(
        <div  style={{display:'flex',flexDirection:'row',flex:10}}>
            <div style={{display:'flex',flexDirection:'row',padding:10,borderBottom:'1px solid orange',flex:8,width:'100%'}}>
                <p style={{flex:2,marginLeft:10,overflow:'hidden', textOverflow:"ellipsis"}}>{item.name}</p>
                <p style={{flex:2,marginLeft:12,overflow:'hidden', textOverflow:"ellipsis"}}>{item.phone_number}</p>
                <p style={{flex:2,marginLeft:30,overflow:'hidden', textOverflow:"ellipsis"}}>{item.email}</p>
                <p style={{flex:2,marginLeft:20,overflow:'hidden', textOverflow:"ellipsis"}}>{item.district}</p>
                <p style={{flex:2,marginLeft:30,overflow:'hidden', textOverflow:"ellipsis"}}>{item.location}</p>
            <div style={{flex:2}} >
                <button onClick={()=>onDeleteClick(item)} style={{border:'none',background:'none'}}>Delete</button>
                <button onClick={()=>onEditClick(item)} style={{border:'none',background:'none',marginLeft:30,}}>Edit</button>
                <button style={{border:'none',background:'none',marginLeft:30,}}>status</button>
            </div>
        </div>
     
    </div>
    )
}
export default Table;
