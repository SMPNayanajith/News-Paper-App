import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import CustomField from '../CustomField/CustomField';
import { FaUser } from "react-icons/fa";
import InputPassword from '../InputPassword/InputPassword';
import config from '../../config';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '../Button/Button';


function Registration() {
    const [apiError,setApiError]=useState("");
    const [apiSuccess,setApiSuccess]=useState("");

  const navigate = useNavigate();
  console.log('config.baseUrl',config.baseUrl);
  

const ReaderSchema = Yup.object().shape({
    userID :Yup.string().required("Required"),
    password :Yup.string().min(8,"Minimum 8 characters").required("Required"),
    firstName:Yup.string().required("Required"),
    lastName:Yup.string().required("Required"), 
    email:Yup.string().email().required("Required"), 
   
});



const registerReader= async (values, {resetForm})=>{
    setApiError("");
    setApiSuccess("");
    try{
        const response = await axios.post("http://localhost:3001/auth/add-new-reader" ,values)
        if(response.data.success){
            setApiError("");
            setApiSuccess(response.data.message);
            resetForm();
            console.log('User registered');
        }else if(!response.data.success){
            setApiSuccess("");
            setApiError(response.data.errror);
            console.log(response.data.errror);
        }

    }catch(error) {
        console.log('Error', error)

    }


}

const directLogin =()=>{
    navigate("/user-login")
    
}

  return (
    
    <div className='overflow-hidden w-full flex flex-col justify-center items-center bg-white h-screen'>
      <div className='max-w-[800px] flex flex-col p-5 items-center mx-auto w-full '>
        <div className='app-logo flex flex-col justify-center items-center'>
            <span className='text-[64px] text-[#627BFE] '>News@Live</span>
            <span className='text-[18px] text-[#262626] '>Register before continue</span>
        </div>

        <Formik 
           initialValues={{
            firstName:"",
            lastName:"", 
            password:"", 
            email:"", 
            userID:""
            
           }}
           validationSchema={ReaderSchema}
           onSubmit={registerReader}
        >
            {({errors , touched, handleChange ,values})=>(
                <Form className='flex flex-col mb-[24px] w-full '>
                    <CustomField
                    fieldType={"text"}
                    inputLabel={'firstName'}
                    fieldName={"firstName"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'lastName'}
                    fieldName={"lastName"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"email"}
                    inputLabel={'email'}
                    fieldName={"email"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'userID'}
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

                    <Button type={"submit"} buttonLabel={"Register"} />
                </Form>
            )}

        </Formik>
        <span className='text-[12px] text-blue-800'>{apiSuccess}</span>
        <span className='texxt-[14px] text-gray-800   '>Already have an account? 
          <span className='text-blue-600 cursor-pointer ' onClick={directLogin} >Login now</span> </span>

      </div>
    </div>
  )
}

export default Registration
