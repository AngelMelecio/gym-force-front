import React, { useState } from 'react'
const Vigencia = (ms) => {
    console.log(ms);

    switch (Number(ms)) {
        case (ms < 3600000):
            return (
                <div>{

                    Math.floor(ms / 60000) + " minutos"
                }</div>
            )
        case (ms < 86400000):
            return (
                <div>{

                    Math.floor(ms / 3600000) + " horas"
                }</div>
            )
        case (ms < 2592000000):
            return (
                <div>{

                    Math.floor(ms / 86400000) + " dias"
                }</div>
            )
        case (ms < 31536000000):
            return (
                <div>{

                    Math.floor(ms / 2592000000) + " meses"
                }</div>
            )


    }



}
export default Vigencia