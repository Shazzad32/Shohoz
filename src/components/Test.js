import { Button } from '@mui/material';
import React, { useState } from 'react'

const Test=()=>{
    const [count, setCount] =useState(0);
    const handleEncriment=()=>{
        setCount(count+1);
    }
    const handleDeccrement=()=>{
        setCount(count-1);
    }

  return (
    <div>
      <h1>Count : {count}</h1>
      <Button onClick={handleEncriment}>ADD</Button>
      <Button onClick={handleDeccrement}>Decr</Button>
    </div>
  )
}
export default Test
