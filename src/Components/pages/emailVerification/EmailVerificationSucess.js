import { useNavigate } from "react-router-dom";
import { FcApprove } from "react-icons/fc";
export default function EmailVerificationSucess (){
    const navigate = useNavigate();
    return(
        <div className="text-center mt-10">
            <h1 className="text-[50px] font-semibold ">Success!</h1>
           
            <p className="text-[20px]">
                Thanks for verifying your email, now you can use all the app's feature
            </p>
            <button className="border-2 border-black px-2 py-2 mt-4 shadow-lg rounded-lg hover:shadow-2xl hover:bg-emerald-800" onClick={()=> navigate('/login') }>Go To The Login Page</button>
        </div>
    )
}