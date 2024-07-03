import React from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask';
import Button from '../Button/Button';

export default function PackageCard({dataItem}) {
  return (
    <div className='m-2'>
          <div 
           className='  ease-in-out delay-150  package-card-wrapper rounded-lg w-auto  md:w-auto lg:w-full p-2 flex flex-col border-gray-500 border-[2px] border-opacity-25 m-2'>
                        <div className='flex flex-col items-center justify-center'>
                            <h2 className='font-semibold text-lg text-gray-500'>
                                {dataItem.name}
                                </h2>
                            <p className='text-sm font-medium'>
                                {dataItem.price}
                                </p>
                            <p className='text-sm font-medium'>
                                {dataItem.headingNote}
                                </p>
                        </div>
                        <div className=' items-center justify-center flex flex-col w-full space-y-1'>
                            <ul className='text-xs  text-indigo-500 mx-auto'>

                                {dataItem.packageDetailes.map((detailItem,index)=>(
                                     <li key={index}>
                                     <div className='flex flex-row space-x-2 justify-center items-center'>
                                     <span><AddTaskIcon/></span>
                                     <span>{detailItem}</span>
                                     
                                     </div>
                                 </li>
                                ))}
                               
                            </ul>
                        </div>
                       <Button buttonLabel={dataItem.buttonLabel}/>
                    </div>
    </div>
  )
}
