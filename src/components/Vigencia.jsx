import React, { useState } from 'react'

const Vigencia = ( ms ) => {
  
    const [time, setTime] = useState(()=>{
        // if ms is less than a hour I want to show the minutes left
        if(ms < 3600000){
            return Math.floor(ms/60000) + " minutos"
        }
        // if ms is less than a day I want to show the hours left
        else if(ms < 86400000){
            return Math.floor(ms/3600000) + " horas"
        }
        // if ms is less than a month I want to show the days left
        else if(ms < 2592000000){
            return Math.floor(ms/86400000) + " dias"
        }
    })
  
    return (
    <div>{time}</div>
  )
}

export default Vigencia