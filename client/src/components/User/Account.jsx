import { KeyboardDoubleArrowDownRounded, LandslideOutlined } from '@mui/icons-material'
import { kkKZ } from '@mui/material/locale'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Link, useNavigate, json } from 'react-router-dom'
import MetaData from '../Layouts/MetaData'


const Account = () => {
    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector(state => state.user)

    console.log("hello"+isAuthenticated);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        var it = JSON.parse(localStorage.getItem('userInfo'));
        console.log("hello   " +it);
        console.log(user);
    }, [isAuthenticated, navigate])

    const getLastName = () => {
        const nameArray = user.name.split(" ");
        return nameArray[nameArray.length - 1];
    }

    return (
        <>
            <MetaData title="My Profile" />
            
           

        </>
    )
}

export default Account



// /*
//  <main>
//                 <Link to='/'>DashBoard</Link>
                
//                 <div>
//                 <div className="w-12 h-12 rounded-full">
//                     <img  src={user.avatar.url} alt="Avatar" />
//                 </div>        
//                     <div>
//                         <div>
//                             {/* personal info */}
//                             <div className='flex flex-col gap-5'>
//                                 <span className="font-medium text-lg">Personal Information <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>
//                                 <div>
//                                     <div>
//                                         <label>First Name </label>
//                                         <input value={user.name.split(" ", 1)} disabled />
//                                     </div>

//                                     <div>
//                                         <label> Last Name</label>
//                                         <input value={getLastName()} disabled />
//                                     </div>

//                                 </div>
//                                 <div>
//                                     <h2>Your Gender</h2>
//                                     <div>
//                                         <input type="radio" name="gender" cheked={user.gender === "male"} id="male" />
//                                         <label>Male</label>
//                                     </div>
//                                     <div>
//                                         <input type="radio" name="gender" checked={user.gender === "female"} id="female" />
//                                         <label>Female</label>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* personal info end */}

//                             {/* Email info */}
//                             <div>
//                                 <span>
//                                     <Link></Link>
//                                     <Link></Link>
//                                 </span>
//                                 <div>
//                                     <div className='cursor-not-allowed'>
//                                         <label>Edit</label>
//                                         <input type="email" value={user.email} disabled />
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* email info end */}

//                             {/* Mobile Number */}
//                             <div>
//                                 <span>
//                                     <span>Edit</span>
//                                 </span>
//                                 <div>
//                                     <div>
//                                         <label>Mobile Number</label>
//                                         <input type="tel" value="+93123456789" />
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* mobile number  */}
//                             {/* <!-- faqs --> */}
//                             <div className="flex flex-col gap-4 mt-4">
//                                 <span className="font-medium text-lg mb-2">FAQS</span>
//                                 <h4 className="text-sm font-medium">What happens when I update my email address (or mobile number)?</h4>
//                                 <p className="text-sm">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>

//                                 <h4 className="text-sm font-medium">When will my Flipkart account be updated with the new email address (or mobile number)?</h4>
//                                 <p className="text-sm">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>

//                                 <h4 className="text-sm font-medium">What happens to my existing Flipkart account when I update my email address (or mobile number)?</h4>
//                                 <p className="text-sm">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>

//                                 <h4 className="text-sm font-medium">Does my Seller account get affected when I update my email address?</h4>
//                                 <p className="text-sm">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>

//                             </div>
//                             {/* <!-- faqs --> */}
//                         </div>
//                     </div>
//                 </div>
//             </main>
// */
