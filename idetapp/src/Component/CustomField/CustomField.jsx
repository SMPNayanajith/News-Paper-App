import React from 'react'
import { Field, ErrorMessage } from 'formik'

function CustomField({
    fieldType,
    inputLabel,
    icon,
    handleChange,
    fieldValue,
    fieldName
}) {
    const IconComponent = icon;
    return (
        <div className='flex flex-col sm:mt-5 mt-2 w-full space-y-2'>
            <div className='sm:flex justify-between w-full hidden'>
                <span className='text-black text-[12px] uppercase font-semibold'>
                    {inputLabel}
                </span>
                <ErrorMessage name={fieldName} component="span" className=' text-red-500 text-12px]' />
            </div>

            <div className='form-feild-input-container w-full rounded-[6px] h-[38px] bg-white border-[#565656] border border-opacity-20 flex flex-row ' >
                <div className='bg-[#627BEF] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex '>
                    <span className='text-[16px] text-white '>
                        <IconComponent />
                    </span>
                </div>

                    <Field

                        type={fieldType}
                        name={fieldName}
                        onChange={handleChange}
                        placeholder={fieldName}
                        value={fieldValue[fieldName]}
                        required
                        className='w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] '
                    />
            </div>
            <ErrorMessage name={fieldName} component="span" className=' text-red-500 text-12px]' />
        </div>
    )
}

export default CustomField
