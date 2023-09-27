import React from 'react'
import Vigencia from '../components/Vigencia'
import Table from '../components/Table'

const AccessoPage = () => {
  return (
    <div>

      <Table
        titleAttrs={["name", "lastName"]}
        subTitleAtrrs={["phone", "email"]}

        Info={Vigencia}

        infoAttr="timeLeft"

        data={[
          { name: "Juan", lastName: "Perez", phone: "4451156035", email: "juan@gmail.com", timeLeft: 1000000 },
          { name: "Jose", lastName: "Garcia", phone: "4451156035", email: "jose@gmail.com", timeLeft: 36000000 },
        ]}

      />

    </div>
  )
}

export default AccessoPage