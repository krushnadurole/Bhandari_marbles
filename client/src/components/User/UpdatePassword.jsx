import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
const UpdatePassword = () => {
    const dispath = usedispatch();
    const navigate = useNavigate();

    const {enqueuesnackbar} = useSnakBar();
    const [oldpassword,setoldpassword] = useState();
    const [newpassword,setnewpassword] = useState();
    const [confirmpassword,setconfirmpassword] = useState();
    const setold = ()=>{
        setoldpassword()
    }
    useEffect(() => {

        if(error){
            enqueuesnackbar(error,{variant:"error"});
            
        }

    }, [])
    
  return (
    <>
    <p>Enter the Old password</p>
    <input onClick={setold}></input>

    </>
  )
}

export default UpdatePassword