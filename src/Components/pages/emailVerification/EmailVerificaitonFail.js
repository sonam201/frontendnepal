import { useNavigate } from "react-router-dom";

export default function EmailVerificationFail (){
    const navigate = useNavigate();
    return(
        <div>
            <h1 className="text-red-600 text-[40px] text-center font-semibold ">Uh oh.... </h1>
            <p className="text-center text-[30px]">
                Something went wrong while trying to verify your email.
            </p>
            <button className="text-center border-2 border-black px-2 py-2 mt-4 shadow-lg rounded-lg hover:shadow-2xl hover:bg-emerald-800 " onClick={()=> navigate('/signup')}>Back To signUp</button>
        </div>
    )
}