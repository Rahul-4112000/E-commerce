import './SignIn.css';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addUser } from '../../Redux/Slices/userDataSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        if(localStorage.getItem('user-info'))
            navigate('/');
    },[])

    

    const [displayOn, setdisplayOn] = useState(true);

    const [firstnameError, setfirstnameError] = useState(false);
    const [lastnameError, setlastnameError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    const [retypePasswordError, setretypePasswordError] = useState(false);
    const [loginEmailError, setLoginEmailError] = useState(false);
    const [loginPasswordError, setLoginPasswordError] = useState(false);
    const [accountExistError, setAccountExistError] = useState(false);


    const [signinUserData, setsigninUserData] = useState({
        loginEmail: '',
        loginPassword: ''
    })

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        retypePassword: '',
        myorders:[]
    });

    const { loginEmail, loginPassword } = signinUserData;
    const { firstName, lastName, email, password, retypePassword } = user;

    const booleanvalueHandler = (setBooleanValue, booleanValue) => {
        setBooleanValue(booleanValue)
    }

    const Login = (key) => (event) => {
        setsigninUserData({ ...signinUserData, [key]: event.target.value })
    }

    const signUp = (key) => (event) => {
        setUser({ ...user, [key]: event.target.value });
    }

    const SubmitSigninData = (event) => {
        event.preventDefault();

        let loginemailerr = true, loginpassworderr = true;

        if (loginEmail.includes("@gmail.com") && loginEmail.length > 10)
            loginemailerr = true;
        else
            loginemailerr = false;

        if ((/\d/.test(loginPassword) && loginPassword.match(/[a-zA-Z]/g)))
            loginpassworderr = true;
        else
            loginpassworderr = false;

        if (loginemailerr && loginpassworderr) {
            setLoginEmailError(!loginemailerr);
            setLoginPasswordError(!loginpassworderr);
        }
        else {
            setLoginEmailError(!loginemailerr);
            setLoginPasswordError(!loginpassworderr);
            return null
        }

        const fetchApi = async () => {

            const response = await fetch("http://localhost:3000/user");
            const data = await response.json();

            data.map((signinuser) => {

                console.log("api data",signinuser);
                console.log("signin Userdata",signinUserData);

                if (signinuser.email === loginEmail && signinuser.password === loginPassword){
                    console.log("true");
                    dispatch( addUser(signinuser) );
                    localStorage.setItem("user-info",JSON.stringify(signinuser))
                    navigate('/');
                    window.location.reload(true);
                }
            });


            if(localStorage.getItem("user-info"))
                setAccountExistError(false);
            else 
                setAccountExistError(true);

        }

        fetchApi();

    }

    const submitUserData = (event) => {
        event.preventDefault();

        const errors = {
            firstnameErr: false,
            lastnameErr: false,
            emailErr: false,
            passwordErr: false,
            retypepasswordErr: false,
        }

        let { firstnameErr, lastnameErr, emailErr, passwordErr, retypepasswordErr } = errors;

        if (isNaN(firstName))
            firstnameErr = true;

        else
            firstnameErr = false;


        if (isNaN(lastName))
            lastnameErr = true
        else
            lastnameErr = false


        if ((email.includes("@gmail.com") && email.length > 10))
            emailErr = true
        else
            emailErr = false


        if ((/\d/.test(password) && password.match(/[a-zA-Z]/g)))
            passwordErr = true
        else
            passwordErr = false


        if ((password === retypePassword))
            retypepasswordErr = true
        else
            retypepasswordErr = false


        if ((firstnameErr && lastnameErr && emailErr && passwordErr && retypepasswordErr)) {
            setfirstnameError(!firstnameErr);
            setlastnameError(!lastnameErr);
            setemailError(!emailErr);
            setpasswordError(!passwordErr);
            setretypePasswordError(!retypepasswordErr);
        }
        else {
            setfirstnameError(!firstnameErr);
            setlastnameError(!lastnameErr);
            setemailError(!emailErr);
            setpasswordError(!passwordErr);
            setretypePasswordError(!retypepasswordErr);
            console.log("false");
            return null
        }

        console.log("success");

        try {
            fetch("http://localhost:3000/user", {
                method: 'POST',
                headers: {
                    'Accept': 'application',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        } catch (error) {
            console.log("post api error",error);
        }

        dispatch( addUser(user) );

        localStorage.setItem("user-info", JSON.stringify(user));

        navigate('/');

        window.location.reload();
    }

    return (
        <div className="signin-container">
            <div className='signin-up-wrapper'>

                <div className="first-parent ">

                    <div className='signin-wrapper center-mp' >

                        <form onSubmit={SubmitSigninData} className={`signin ${displayOn ? null : 'd-off'}`}>
                            <h2>Sign in</h2>
                            <div className='email'>
                                <div className="icon"><HiOutlineMail /></div>
                                <input className='signin-input' type="text" placeholder='Email' autoComplete='on' required value={loginEmail} onChange={Login("loginEmail")}></input>
                            </div>
                            <div className={`hidden ${loginEmailError ? 'visible' : null}`}>Enter valid email format</div>

                            <div className='password'>
                                <div className="icon"><RiLockPasswordLine /></div>
                                <input className='signin-input' type="password" placeholder='Password' autoComplete='on' required minLength='5' value={loginPassword} onChange={
                                    Login("loginPassword")
                                }></input>
                            </div>
                            <div className={`hidden ${loginPasswordError ? "visible" : null} ${accountExistError ? "d-off" : null}`}  >Enter valid password format</div>
                            <div className={`small-red-text ${accountExistError ? "display-on" : "d-off"} `} >Account does't exist</div>
                            <div></div>

                            <input className="button" type="submit" value="Sign In"></input>
                        </form>

                        <form onSubmit={submitUserData} className={`signin ${displayOn ? 'd-off' : null}`}>
                            <h2>Sign Up</h2>

                            <div className='first-name'>
                                <div className="icon"><BiUser /></div>
                                <input className='signin-input' type="text" placeholder='First name' required autoComplete='off' value={firstName} maxLength='10' onChange={signUp("firstName")}></input>
                            </div>
                            <div className={`hidden ${firstnameError ? "visible" : null}`}>First name should characters only</div>

                            <div className='last-name'>
                                <div className="icon"><BiUser /></div>
                                <input className='signin-input' type="text" placeholder='Last name' required autoComplete='off' maxLength='15' value={lastName} onChange={signUp("lastName")} ></input>
                            </div>
                            <div className={`hidden ${lastnameError ? 'visible' : null}`}> Last name should characters only </div>

                            <div className='email'>
                                <div className="icon"><HiOutlineMail /></div>
                                <input className='signin-input' type="text" placeholder='Email' required autoComplete='off' value={email} onChange={signUp("email")}></input>
                            </div>
                            <div className={`hidden ${emailError ? 'visible' : null}`}>Enter a valid email format</div>

                            <div className='password'>
                                <div className="icon"><RiLockPasswordLine /></div>
                                <input className='signin-input' type="password" placeholder='Password' required autoComplete='off' minLength='5' value={password} onChange={signUp("password")}></input>
                            </div>
                            <div className={`hidden ${passwordError ? 'visible' : null}`}>Password should contain a-z and 1-0</div>

                            <div className='password'>
                                <div className="icon"><RiLockPasswordLine /></div>
                                <input className='signin-input' type="password" placeholder='Retype password' required autoComplete='off' value={retypePassword} onChange={signUp("retypePassword")}></input>
                            </div>
                            <div className={`hidden ${retypePasswordError ? 'visible' : null}`}>Password does't match</div>
                            <input type="submit" value="Sign Up" className="button" />
                        </form>


                    </div>
                </div>

                <div className='second-parent '>
                    <div className='signout-wrapper center-mp'>
                        <div className='signout-button'>
                            <div className={`signout-text ${displayOn ? null : 'd-off'}`}>
                                <h2>Welcome Friend!</h2>
                                <p>Enter your personal details and start journey with us</p>
                                <div className='button' onClick={() => { booleanvalueHandler(setdisplayOn, !displayOn) }} >Sign Up</div>
                            </div>

                            <div className={`signout-text ${displayOn ? 'd-off' : null}`}>
                                <h2>Welcome Back</h2>
                                <p>To keep connected with us please login with your person info</p>
                                <div className='button' onClick={() => { booleanvalueHandler(setdisplayOn, !displayOn) }} >Sign In</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default SignIn;