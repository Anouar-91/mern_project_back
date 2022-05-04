import React, { useState, useEffect } from 'react'
import Routes from './components/Routes'
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useDispatch } from 'react-redux'
/* import { getUser } from './redux' */
import {getUser} from './actions/user.action'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchToken = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true })
        .then((res) => {
          // handle success
          console.log(res);
          setUid(res.data)
        })
        .catch((error) => {
          // handle error
          console.log(error);
          setUid(null)
        })
    }
    fetchToken();
    dispatch(getUser(uid))
  }, [uid, dispatch]);

console.log(uid)
  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  )
}

export default App