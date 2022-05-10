import React , {useContext, useEffect} from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import NewPostForm from '../components/Post/NewPostForm'
import Log from "../components/Log/index"
import {UidContext } from "../components/AppContext"
import Trends from '../components/Trends'
import FriendsHint from "../components/Profil/FriendsHint"




const Homes = () => {
  const uid = useContext(UidContext)
  useEffect(() => {

  }, [uid])

  return (
    <div className="home">
      <LeftNav/>
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread/>
      </div>
      <div className="right-side">
          <div className="right-side-container">
            <div className="wrapper">
              <Trends />
              {uid && <FriendsHint/>}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Homes