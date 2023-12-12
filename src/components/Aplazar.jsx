import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Aplazar = ({ fechaFin }) => {
  const [fechaFinNueva, setFechaFinNueva] = useState(null);

  return (
    <DatePicker
      selected={fechaFinNueva}
      onChange={(date) => setFechaFinNueva(date)}
      minDate={new Date(fechaFin)}
      dateFormat="yyyy/MM/dd"
    />
  );
};

export default Aplazar;
