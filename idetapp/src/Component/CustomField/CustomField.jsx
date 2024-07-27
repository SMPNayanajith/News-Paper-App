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
    
    return (
        <div className='flex flex-col sm:mt-5 mt-2 w-full space-y-2'>
            <div className='sm:flex justify-between w-full hidden'>
                <span className='text-black text-[12px] uppercase font-semibold'>
                 {inputLabel}
                </span>
                <ErrorMessage name={fieldName} component="span" className=' text-red-500 text-12px]' />
               
            </div>
            
        </div>
    )
}

export default CustomField
