import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export  default function  RegisterScreen(){
    const [name,  setName] = useState('');
    const [email,  setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const [confirmPassword, setConfirmPassword]  = useState('');
    
    const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/';
    // const redirect = props.location.search? props.location.search.split('=')[1]: '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match!');
        } else{
            dispatch(register(name, email, password));
        }
        
    }
    let navigate = useNavigate();
    useEffect(()=>{
            if(userInfo){
                navigate(redirect);
                // props.history.push(redirect);
            }
        }
    , [navigate, redirect, userInfo]); //[props.history, redirect, userInfo]
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name"> Name </label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter Name" 
                        required 
                        onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email"> Email address </label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter Email" 
                        required 
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password"> Password </label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        required 
                        onChange={e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword"> Confirm Password </label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm Password" 
                        required 
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label></label>
                    <div>
                        Already have an account {' '} 
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}