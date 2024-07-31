import React from 'react'
import { IoMdLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { Field, ErrorMessage } from 'formik'

function InputPassword({
    label,
    values,
    name,
    handleChange
 }) {

   
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

                    type="password"
                    name={name}
                    onChange={handleChange}
                    placeholder={name}
                    value ={values[name]}
                    required
                    className='w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] '
                />
                <div className='h-[38px] w-[38px] rounded-br-[6px] rounded-tr-[6px] justify-center items-center flex '>
                    <span className='text-[16px] text-black '>
                        <FaRegEyeSlash />
                    </span>
                </div>
            </div>
            <ErrorMessage name={name} component="span" className=' text-red-500 text-12px]' />
        </div>
    )
}

export default InputPassword
