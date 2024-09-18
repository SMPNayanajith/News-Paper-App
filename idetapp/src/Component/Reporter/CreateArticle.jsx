import React, { useState } from 'react'
import { Form, Formik,setFieldValue } from 'formik'
import * as Yup from "yup"
import CustomField from '../CustomField/CustomField';
import { FaUser } from "react-icons/fa";
import config from '../../config';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '../Button/Button';


function CreateArticle() {
    const [apiError,setApiError]=useState("");
    const [apiSuccess,setApiSuccess]=useState("");

  const navigate = useNavigate();
  console.log('config.baseUrl',config.baseUrl);
  

const ArrticleSchema = Yup.object().shape({
    articleType :Yup.string().required("Required"),
    newsHeading:Yup.string().required("Required"),
    newsDescription:Yup.string().required("Required"), 
    newsDescriptionLong:Yup.string().required("Required"),
    city:Yup.string().required("Required"),  
    country:Yup.string().required("Required"),  
    coverImage:Yup.string().required("Required"),  
    publicationType: Yup.number().oneOf([1, 2, 3],"Invalid publication type").required("Required"),  
   
});



const handleCreateArticle= async (values, {resetForm})=>{
   setApiError("");
   setApiSuccess("");
    try{
       // check token
       const token = localStorage.getItem("token");
       

       ///create form data
       const formData = new FormData();
       for (const key in values){
        formData.append(key,values[key])
       }

       const response = await axios.post("http://localhost:3001/auth/create-new-article",formData,
        {
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"multipart/form-data",
            },
        });

        if(response.data.message){
            setApiError("");
            setApiSuccess(response.data.message);
            resetForm();
        }

    }catch(error) {
        console.log('Error creating areticle :', error);
        setApiError(error.response?.data?.error || "Something went wrong");
    }
};


  return (
    
    <div className='md:mt-[95px] w-full flex flex-col justify-center items-center bg-white h-screen'>
      <div className='max-w-[800px] flex flex-col p-5 items-center mx-auto w-full '>
        <div className='app-logo flex flex-col justify-center items-center'>
            <span className='text-[64px] text-[#627BFE] '>News@Live</span>
            <span className='text-[18px] text-[#262626] '>Create new article</span>
        </div>

        <Formik 
           initialValues={{
            articleType:"",
            newsHeading:"",  
            newsDescription:"", 
            newsDescriptionLong:"",
            city:"",
            country:"",
            coverImage:"",
            publicationType:"",
            
           }}
           validationSchema={ArrticleSchema}
           onSubmit={handleCreateArticle}
        >
            {({errors , touched, handleChange ,values,setFieldValue})=>(
                <Form className='flex flex-col mb-[24px] w-full '>

                    <div>   
                        <label htmlFor="articleType" className='text-black text-[12px] uppercase font-semibold'>Article Type</label><br/>
                        <select 
                         name="articleType"
                         id="articleType"
                         value={values.articleType}
                         onChange={handleChange}
                         className='outline-none cursor-pointer w-full rounded-[6px] h-[38px] bg-white border-[#565656] border border-opacity-20 flex flex-row'
                         >
                            <option className='text-semibold'  value="" label='Select article type'/>
                            <option value="General" label='General'/>
                            <option value="Sport" label='Sport'/>
                            <option value="Health" label='Health'/>
                            <option value="Political" label='Political'/>
                            <option value="Education" label='Education'/>
                            <option value="Criminal" label='Criminal'/>
                            <option value="Accident" label='Accident'/>
                         </select>
                    </div>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'News Heading'}
                    fieldName={"newsHeading"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'News Summery'}
                    fieldName={"newsDescription"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'News Description'}
                    fieldName={"newsDescriptionLong"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'City'}
                    fieldName={"city"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"text"}
                    inputLabel={'Country'}
                    fieldName={"country"}
                    fieldValue={values}
                    icon={FaUser}
                    handleChange={handleChange}/>

                    <CustomField
                    fieldType={"file"}
                    inputLabel={'Cover Image'}
                    fieldName={"coverImage"}
                    fieldValue={values.coverImage}
                    icon={FaUser}
                    handleChange={(event)=>{
                        setFieldValue("coverImage", event.currentTarget.files[0]);
                    }}/>

                    <div className='my-3'>   
                        <label htmlFor="publicationType" className='text-black text-[12px] uppercase font-semibold'>Publication Type</label><br/>
                        <select 
                         name="publicationType"
                         id="publicationType"
                         value={values.publicationType}
                         onChange={(e)=>{
                            const slectedValue = Number(e.target.value);
                            setFieldValue("publicationType", slectedValue);
                         }
                         }
                         className='outline-none cursor-pointer w-full rounded-[6px] h-[38px] bg-white border-[#565656] border border-opacity-20 flex flex-row'
                         >
                            <option className='text-semibold' value="" label='Select Publication type'/>
                            <option value={0} label='Public'/>
                            <option value={1} label='Private'/>
                            <option value={2} label='Draft'/>
                         </select>
                    </div>
                    

                    <Button type={"submit"} buttonLabel={"Submit"} />
                </Form>
            )}

        </Formik>
        
      </div>
    </div>
  )
}

export default CreateArticle