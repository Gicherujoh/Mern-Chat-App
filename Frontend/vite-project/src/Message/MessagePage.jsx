import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import {LoginContext} from '../AuthContext/LoginContext'
import SendIcon from '@mui/icons-material/Send';
import './Message.css'

const MessagePage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [clickedUser,setClickedUser] = useState([])
  const { data } = useContext(LoginContext);
  let sender = "65764ba2e2a6b832a214fb2b" //Milly
  let reciever = "6570d9cdb7160137fce7e287" //Kiuna
  useEffect(() => {
    async function GetUsers() {
      try {
        const response = await axios.get('http://localhost:3300/available-users', {})
        if (response) {
          setUsers(response.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    GetUsers();
  }, []);
  const handleClick = async (user) => {
    const { _id } = user;
    //let sender = "65764ba2e2a6b832a214fb2b";
    try {
      const messages = await axios.post('http://localhost:3300/all-messages', {
        sender,
        reciever
      });
      if (messages) {
        setClickedUser(messages.data.message)
      }
    } catch (e) {
      console.log(e);
     }
  }

  console.log(clickedUser);
  const Submit = async() => {
    try {
      const response = await axios.post('http://localhost:3300/message', {
        sender,
        reciever,
        message
      })
      if (response) {
        console.log(response);
      }
    } catch (e) {
      console.log(e)
      
   }
}
 
  return (
    <div>
      <div className='nav'>
        <div className='message-header'>
        <div>
           <h3 className='message-title'>Message</h3>  {/*Supposed to be an icon */}
        </div>
        <div className='user'>
          <div>
             <img src='./assets/test-image.png' alt='user-picture' className='user-image'/>
          </div>
          <div>
            <h4 className='user-title'>John Doe</h4>
          </div>
        </div>
      </div>
      </div>
      <div className='user-container'>
        <div className='user-section'>
        
        <div className='user-online-title'>
          <h2>Available Members</h2>
          </div> 
          {users.length > 0 && users.filter((user)=>user.name!==data?.name).map((user) => (
            <div className='online-user-section'>
           <div className='online-users'>
             <div>
             <img src='./assets/test-image.png' className='online-user-pic'/>
         </div>
          <div>
              <h3 onClick={()=>handleClick(user)}>{user?.name }</h3>
          </div>
        </div>
            </div>
          
        )) }
        </div>
      
    <div className='message-section'>
          {clickedUser.map((user) => (
            <div className='message-container'>
            <div className='sender-det'>
              <div className='sender-image'>
                <img src='./assets/test-image.png' className='sender-img' />
              </div>
              <div>
                <p className='sender'>You:</p>
              </div>
            </div>
            <div className='sender-message'>
                <p className='sender-msg'>{ user}</p> 
            </div>
          
           </div>
          )) }
          <div className='reciever'>
          <div className='message-reciever'>
             <div className='sender-det'>
               <div className='sender-image'>
              <img src='./assets/test-image.png' className='sender-img'/>
            </div>
            <div>
               <p className='sender'>Joh Doe:</p>
              </div>
          </div>
          <div className='sender-message'>
             <p className='sender-msg'>How are you doing today boy:I hope you are doing just fine.Some design testing here and there.Though my designs look pretty ugly.I know am not very good when it comes to frontend shiet</p>
          </div>
          </div>
          </div>
          <form>
          <div className='input-message-section'>
               <div className='input-message'>
                <input type='text' placeholder='Message' className='input' onChange={(e)=>setMessage(e.target.value)}/>
            </div>
            <div>
                <SendIcon className='send-icon' onClick={Submit}/>
            </div> 
          </div>
          </form>
        </div>     
      </div>
    
     </div>
  )
}

export default MessagePage
