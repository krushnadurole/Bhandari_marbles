import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import { AvatarGroup } from '@mui/material';

const Register = () => {
    const handleRegister=()=>{

    }
    const handleDataChange=()=>{
        
    }
    return (
        <>
            <main>
                <div>
                    <FormSidebar
                        title="Looks like you're new here!"
                        tag="Sign up with your mobile number to get started"
                    />
                    {/* Signup columsn */}
                    <div className='flex'>
                        {/* person info container */}
                        <form onSubmit={handleRegister} encType="multipart/form-data" className="p-5 sm:p-10">
                            {/* input container columns */}
                            <div className=''>
                                <TextField
                                
                                />
                                <TextField
                                />

                            </div>
                            {/* gender input */}
                            <div>
                                <h1>Your Gender</h1>
                                <div>
                                <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" onChange={handleDataChange} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                </div>
                            </div>
                            {/* gender input end */}
                            {/* password container columns */}
                            <div>
                                <TextField/>
                                <TextField/>
                            </div>
                            {/* end password container column/ */}

                            <div>
                                <Avatar alt='Avatar Preview' />
                                <label>
                                    <input></input>
                                    Choose File
                                </label>
                            </div>
                            <button></button>
                            <Link></Link>
                        </form>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Register