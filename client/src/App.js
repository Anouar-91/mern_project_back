import React, { useState, useEffect } from 'react'
import Routes from './components/Routes'
import { UidContext } from './components/AppContext'
import axios from 'axios'

const App = () => {
  const [uid, setUid] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, {withCredentials: true})
        .then((res) => {
          // handle success
          console.log(res);
          setUid(res.data)
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }
    fetchToken();
  }, [uid])


  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  )
}

export default App