import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import axios from 'axios'


export default function ActivationEmail() {
    const { activation_token } = useParams()
    const [err , setErr ] = useState('')
    const [success , setSuccess] = useState('')

    useEffect(() => {
      if(activation_token){
          const activationEmail = async () => {
              try {
                    const res = await axios.post('http://localhost:5000/user/activation' , {activation_token})
                    setSuccess(res.data.msg)
              }catch (err) {
                  err.response.data.msg && setErr(err.response.data.msg)
              }
          } 
          activationEmail()
      }
    }, [activation_token])
    

    return (
        <div>
        <div className='active_page'>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <center><h3>Ready to Login ?  <Link to="/login"> Here</Link></h3></center>
        
        </div>

    )
}
