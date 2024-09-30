import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import CustomField from '../CustomField/CustomField';
import { FaUser } from "react-icons/fa";
import InputPassword from '../InputPassword/InputPassword';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '../Button/Button';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/userState';


function Login() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  console.log('config.baseUrl',config.baseUrl)
  

const loginSchema = Yup.object().shape({
    userID :Yup.string().required("Required"),
    password :Yup.string().min(8,"Minimum 8 characters").required("Required"),

});
const handleLogin = async(values)=>{
  
  try {
    const response = await axios.post("http://localhost:3001/auth/user-login",values);
    if(response.data){
      
      const {token,roleType} = response.data;

      //save token to localstorage
      localStorage.setItem('authToken',token);
      console.log(`Login successfull, Role: ${roleType}`);

      setUser({
        isLoggedIn:true,
        userName:values.userName,
        roleType:roleType,
      })

      if(roleType==='reader'){
        navigate('/');
      }else if(roleType === 'reporter'){
        navigate('/reporter')
      }
      
    }else{
      console.error('Invalid user ID or password');
    }

    
  } catch (error) {
    console.error('Login Error')
  }

}
const registrationHandle =()=>{
  navigate('/registration')
  
}
const registrationHandlReporter = ()=>{
  navigate('/ReporterRegistration');
}
  return (
    
    <div className='overflow-hidden w-full flex flex-col justify-center items-center bg-white h-screen'>
      <div className='max-w-[800px] flex flex-col p-5 items-center mx-auto w-full '>
        <div className='app-logo flex flex-col justify-center items-center'>
            <span className='text-[64px] text-[#627BFE] '>News@Live</span>
            <span className='text-[18px] text-[#262626] '>Please login to continue</span>
        </div>

        <Formik 
           initialValues={{
            userID:"",
            password:"",
            
           }}
           validationSchema={loginSchema}
           onSubmit={handleLogin}
        >
            {({errors , touched, handleChange ,values})=>(
                <Form className='flex flex-col mb-[24px] w-full '>
                    <CustomField
                    fieldType={"text"}
                    inputLabel={'User Name'}
                    fieldName={"userID"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <InputPassword
                    label="Password"
                    name="password"
                    handleChange={handleChange}
                    values={values}
                    />

                    <Button type={"submit"} buttonLabel={"Login"} />
                </Form>
            )}

        </Formik>
        <span className='texxt-[14px] text-gray-800   '>Don't have an account? Register below <br/>
          <span className='text-blue-600 cursor-pointer ' onClick={registrationHandle} >Register now as a reader</span> <br/>
          <span className='text-blue-600 cursor-pointer ' onClick={registrationHandlReporter} >Register now as a reporter</span>
        </span>

      </div>
    </div>
  )
}

export default Login
