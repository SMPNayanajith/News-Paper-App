import React, { useState } from 'react'
import { IoMdLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { Field, ErrorMessage } from 'formik'
import { IoEyeOutline } from "react-icons/io5";

function InputPassword({
    label,
    values,
    name,
    handleChange
 }) {

   const [passwordVisible, setPasswordVisible] = useState(false);

   const togglePassword=() =>{
    setPasswordVisible(!passwordVisible)

   }

    return (

        <div className='flex flex-col sm:mt-5 mt-2 w-full space-y-2'>
            <div className='sm:flex justify-between w-full hidden'>
                <span className='text-black text-[12px] uppercase font-semibold'>
                    {label}
                </span>
                <ErrorMessage name={name} component="span" className=' text-red-500 text-12px]' />
            </div>

            <div className='form-feild-input-container w-full rounded-[6px] h-[38px] bg-white border-[#565656] border border-opacity-20 flex flex-row ' >
                <div className='bg-[#627BEF] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex '>
                    <span className='text-[16px] text-white '>
                        <IoMdLock />
                    </span>
                </div>

                <Field

                    type={passwordVisible ? "text" : "password"}
                    name={name}
                    onChange={handleChange}
                    placeholder={name}
                    value ={values[name]}
                    required
                    className='w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] '
                />
                <div className='h-[38px] w-[38px] rounded-br-[6px] rounded-tr-[6px] justify-center items-center flex '>
                    {passwordVisible ? (
                        <span className='cursor-pointer text-[16px] text-black ' onClick={togglePassword}>
                            <FaRegEyeSlash />
                        </span>) : (
                        <span className='cursor-pointer text-[16px] text-black ' onClick={togglePassword}>
                             < IoEyeOutline/>
                        </span>    
                        )}
                   
                </div>
            </div>
            <ErrorMessage name={name} component="span" className=' text-red-500 text-12px]' />
        </div>
    )
}

export default InputPassword
