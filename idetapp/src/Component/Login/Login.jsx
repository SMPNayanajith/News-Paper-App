import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import CustomField from '../CustomField/CustomField';

function Login() {

const loginSchema = Yup.object().shape({
    userID :Yup.string().required("Required"),
    password :Yup.string().required("Required"),

})
const handleLogin = console.log("login succeeded");




  return (
    
    <div className='w-full flex flex-col justify-center items-center bg-white h-screen'>
      <div className='max-w-[800px] flex flex-col p-5 items-center mx-auto '>
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
                <Form className='flex flex-col mb-[56px] w-full '>
                    <CustomField
                    inputLabel={'User Name'}/>
                    
                </Form>
            )}

        </Formik>
      </div>
    </div>
  )
}

export default Login
