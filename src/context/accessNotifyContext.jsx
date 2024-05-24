import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import StatusModal from '../pages/Acceso/components/StatusModal';
import accessSocket from './accessSocket';
import { sleep } from '../utils/global';
import { useAcceso } from '../pages/Acceso/hooks/useAcceso';

const AccessNotifyContext = createContext();

export const useAccessNotify = () => {
    return useContext(AccessNotifyContext);
};

export const AccessNotifyProvider = ({ children }) => {

    const containerRef = useRef(null)
    const { formatAccessResponse } = useAcceso()
    const [status, setStatus] = useState(null)


    const {
        accessStatus, setAccessStatus,
        socketStatus, sendMessage
    } = accessSocket('ws://localhost:8080/ws/access/all/');

    useEffect(() => {
        if (accessStatus) {
            console.log(accessStatus)
            if (accessStatus.registro) {
                let { image, message, info, background, colorMessage, colorInfo } = formatAccessResponse(accessStatus.registro)
                handleShowModal({
                    image, message, info, background, colorMessage, colorInfo
                })
            } else {
                let { message } = accessStatus
                handleShowModal({
                    message,
                    background: "bg-red-500/[0.92]",
                    colorMessage: "text-red-500"
                })
            }
        }
    }, [accessStatus])


    const handleShowModal = async (status) => {
        setStatus(status)
        containerRef.current.classList.remove('invisible')
        containerRef.current.classList.remove('opacity-0')
        await sleep(5000)
        containerRef.current.classList.add('invisible')
        containerRef.current.classList.add('opacity-0')
        await sleep(150)
        setStatus(null)
    }

    return (
        <AccessNotifyContext.Provider value={{ handleShowModal }}>
            {children}
            <div ref={containerRef} className='absolute top-0 z-50 invisible w-full h-screen duration-300 opacity-0'>{
                status && <StatusModal data={status} />
            }
            </div>
        </AccessNotifyContext.Provider>
    );
};
