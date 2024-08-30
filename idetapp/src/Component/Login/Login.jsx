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


function Login() {
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
      console.log(`Login successfull, Role: ${response?.data?.roleType}`)
      if(response.data.roleType==='reader'){
        navigate('/reader');
      }else if(response.data.roleType === 'reporter'){
        navigate('/reporter')
      }
      
    }else{
      console.error('Invalid user ID or password');
    }

    
  } catch (error) {
    console.error('Login Error')
  }

}
const jj =()=>{
  navigate('/registration')
  
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
        <span className='texxt-[14px] text-gray-800   '>Don't have an account? 
          <span className='text-blue-600 cursor-pointer ' onClick={jj} >Register now</span> </span>

      </div>
    </div>
  )
}

export default Login
