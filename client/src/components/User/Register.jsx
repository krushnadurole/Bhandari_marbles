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
import './Register.css'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user)

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: ""
    })

    const { name, email, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("preview.png");

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be at least 8 characters", { variant: "warning" })
            return;
        }
        if (password != cpassword) {
            enqueueSnackbar("Password doesn't Match", { variant: "error" })
            return;
        }
        if (!avatar) {
            enqueueSnackbar("Select Avatar", { variant: "error" })
            return;
        }
        const formData = new FormData();
        formData.set("name", name)
        formData.set("email", email)
        formData.set("gender", gender)
        formData.set("password", password)
        formData.set("avatar", avatar);

        dispatch(registerUser(formData))
    }
    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" })
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <main>
                <div className='whole'>
                    <div className='sidebar'>
                        <FormSidebar
                            title="Looks like you're new here!"
                            tag="Sign up with your mobile number to get started"
                        />
                    </div>
                    {/* Signup columsn */}
                    <div className='flex'>
                        {/* person info container */}
                        <form onSubmit={handleRegister} encType="multipart/form-data" className="p-5 sm:p-10">
                            {/* input container columns */}
                            <div className=''>
                                <TextField
                                    fullWidth
                                    id="full_name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    onChange={handleDataChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleDataChange}
                                    required
                                />

                            </div>
                            {/* gender input */}
                            <div>
                                <h1>Your Gender</h1>
                                <div>
                                    <RadioGroup
                                        row
                                        aria-labeledby="radio-buttons-group-label"
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
                                <TextField 
                                id="password"
                                label="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleDataChange}
                                required
                                />
                                <TextField 
                                id="confirm_password"
                                label="confirm password"
                                type="password"
                                name='password'
                                value={cpassword}

                                />
                            </div>
                            {/* end password container column/ */}

                            {/* <div>
                                <Avatar alt='Avatar Preview' />
                                <label>
                                    <input></input>
                                    Choose File
                                </label>
                            </div> */}
                            <div className='avatar'>
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <br /><br />
                                    &nbsp;
                                    <button type="button" fullWidth class="btn btn-secondary">
                                        <input
                                           fullWidth
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="choose hidden "
                                        />
                                        Choose File
                                    </button>
                                </div>
                            <button>SignUp</button>
                            <Link></Link>
                        </form>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Register