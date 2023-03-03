// import { Avatar, FormControlLabel, RadioGroup, TextField } from '@mui/material'
// import React from 'react'
// import { Link } from 'react-router-dom'

// const Create = () => {
//     const updateprofilehandler = () => {

//     }
//     return (
//         <>
//             <main>
//                 <div>
//                     <div>
//                         <h1>Looks like you are new to the platform.</h1>
//                         <p>Sign up with your mobile number to get started</p>
//                     </div>


//                     <div>
//                         <h2>Update Profile</h2>
//                         <form
//                             onSubmit={updateprofilehandler}
//                             encType="multipart/form-data"
//                         >
//                             <div>
//                             <TextField
//                                         fullWidth
//                                         label="Full Name"
//                                         name="name"
//                                         value={5}
//                                         onChange={(e) => setName(e.target.value)}
//                                         required
//                                     />
//  <TextField
//                                         fullWidth
//                                         label="Full Name"
//                                         name="name"
//                                         value={10}
//                                         onChange={(e) => setName(e.target.value)}
//                                         required
//                                     />                            </div>

//                             <div>
//                                 <h2></h2>
//                                 <div>
//                                 <RadioGroup
//                                             row
//                                             aria-labelledby="radio-buttons-group-label"
//                                             name="radio-buttons-group"
//                                         >
//                                             <FormControlLabel name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Male" />
//                                             <FormControlLabel name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Female" />
//                                         </RadioGroup>
//                                 </div>
//                             </div>

//                             <div>
//                                 <Avatar />
//                                 <label />
//                                 Choose File
//                             </div>
//                             <button>Update</button>
//                             <Link to='/account'>Cancel</Link>
//                         </form>
//                     </div>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Create


import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    }

    const handleUpdateDataChange = (e) => {
        const reader = new FileReader();
        setAvatar("");
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Update Profile | Bhandari Marbles" />

            {loading && <BackdropLoader />}
            <main >

                {/* <!-- row --> */}
                <div className='flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg'>
                    {/* <!-- sidebar column  --> */}
                    <div >
                        <h1 >Looks like you're new here!</h1>
                        <p >Sign up with your mobile number to get started</p>
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- signup column --> */}
                    <div >

                        <h2 >Update Profile</h2>
                        {/* <!-- personal info procedure container --> */}
                        <form
                            onSubmit={updateProfileHandler}
                            encType="multipart/form-data"
                        >
                            <div >

                                {/* <!-- input container column --> */}
                                <div>
                                    <TextField
                                        // fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        // fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- gender input --> */}
                                <div >
                                    <h2 >Your Gender :</h2>
                                    <div  id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                <div >
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <label >
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleUpdateDataChange}
                                            className="hidden"
                                        />
                                        Choose File
                                    </label>
                                </div>
                                <button type="submit" >Update</button> <br/>
                                <Link  to="/account">Cancel</Link>
                            </div>

                        </form>
                        {/* <!-- personal info procedure container --> */}
                    </div>
                    {/* <!-- signup column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default UpdateProfile;