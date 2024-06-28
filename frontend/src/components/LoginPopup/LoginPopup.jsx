import React , { useContext, useState } from 'react' 
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken}=useContext(StoreContext)
    const [currState , setCurrState] = useState('Sign up')
    const [data , setData] = useState({
        name : '',
        email : '',
        password : ''
    })



    const onChangeHandler = (e) => {
        const {name , value} = e.target
        setData(data=>({...data , [name] : value}))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url
        if (currState === 'Login') {
            newUrl+="/api/user/login"
            }
        else{
            newUrl+="/api/user/register"
        }
        const response = await axios.post(newUrl, data)
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }
    
  return (
    <div className='login-popup'>
        <form  onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==='Login'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name'  required/>}   
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email'  required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password'  required/>
            </div>
            <button type='submit'>{currState==='Sign up' ? 'Create account' : 'Login'}</button>
            <div className='login-popup-condition'>
                <input type="checkbox" required />
                <p>I agree to the <span>Terms of Use</span> and <span>Privacy Policy</span></p>
            </div>
            {currState==='Login'
            ?<p>Create a new account? <span onClick={() => setCurrState('Sign up')}>Click here</span></p>
            :<p>Aready have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup ;