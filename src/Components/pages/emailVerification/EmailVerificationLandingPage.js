import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import{spin} from 'antd'
import useToken from '../../../auth/useToken'
import EmailVerificationSucess from './EmailVerificationSucess'
import EmailVerificationFail from './EmailVerificaitonFail'


export default function EmailVerificationLandingPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, SetIsSuccess] = useState(false);
    const {verificationString } = useParams();
    console.log(verificationString)
    const [,setToken ] = useToken();

    useEffect(()=>{
        const loadVerification = async()=>{
            try{
                    const response = await axios.put('https://nepal-groove-backend-hrxj.vercel.app/api/verifyemail',{verificationString})
                    const {token} = response.data;
                    setToken(token);
                    SetIsSuccess(true); 
                    setIsLoading(false);
            }
            catch(e){
                SetIsSuccess(false)
                setIsLoading(false);

            }
        }
        loadVerification();
    },[setToken,verificationString])

    if(isLoading) return <p className='text-center mt-15 text-[40px] bg-blue-700'>Loading.....<spin/></p>;
    if(!isSuccess) return <EmailVerificationFail/>
    return <EmailVerificationSucess/>
}