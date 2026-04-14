/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {Spin} from 'antd'

export default function verifyEmail(){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate ('/login');
        },4000);
    },[navigate]);

    return(
        <div className='text-center'>
            <h1 className='text-[40px] text-[#645CBB]'>Thanks For Signing Up!</h1>
            <p className='text-[25px] mt-10'>A Verification email has been sent to the email address you provided<br/>
                please verify your email  to unlock full-site features.
            </p>
            <Spin/>
        </div>
    )
}