import { useState, useEffect, useRef, useCallback } from 'react';

function accessSocket(url) {

  const [accessStatus, setAccessStatus] = useState(null);
  const [socketStatus, setSocketStatus] = useState('DISCONNECTED');
  const webSocket = useRef(null);

  const connect = useCallback(() => {
    setSocketStatus('CONNECTING');
    webSocket.current = new WebSocket(url);

    webSocket.current.onopen = () => {
      setSocketStatus('CONNECTED');
    };

    webSocket.current.onmessage = (message) => {
      let { consumerStatus } = JSON.parse(message.data)
      setAccessStatus(consumerStatus)
    };

    webSocket.current.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    webSocket.current.onclose = (event) => {
      setSocketStatus(event.wasClean ? 'DISCONNECTED' : 'DISCONNECTED (unclean)');
      webSocket.current = null;

      // You might want to automatically reconnect here if the disconnection was unclean
      // Beware of infinite reconnection loops, though
    };
  }, [url]);

  useEffect(() => {
    connect();

    // Clean up function on unmount
    return () => {
      if (webSocket.current) {
        webSocket.current.close();
      }
    };
  }, [connect]);

  const sendMessage = (message) => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(message);
    } else {
      console.error('WebSocket is not open. Message was not sent');
    }
  };

  return {
    accessStatus, setAccessStatus,
    socketStatus, sendMessage
  };
}

export default accessSocket;