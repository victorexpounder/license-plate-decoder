'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { Descriptions, message } from 'antd'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'

interface Details {
    plate: string,
    lga: string,
    state: string,
    year: number,
    age: number,
    batch : number,
    batchNo: string,
    slogan: string,
    latitude: number,
    longitude: number
}

export const Body = () => {
    const [plate, setPlate] = useState("");
    const [details, setDetails] = useState<Details>();
    const [hue, setHue] = useState(0);
    const [filter, setFilter] = useState("none");
    const [exit, setExit] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const formik = useFormik({
        initialValues: {
          plate: "",
        },
        validationSchema: Yup.object({
          plate: Yup.string()
            .matches(/^[A-Za-z0-9]+-[A-Za-z0-9]+$/, "Plate number must contain a hyphen (-)")
            .required("Plate number is required"),
        }),
        
        onSubmit: async (values) => {
            try {
                const res = await axios.get(`/api/plate/${values.plate.toUpperCase()}`);
                const data = await res.data;
                console.log(data);
                setDetails(data);
                setExit(true);
            } catch (error : any) {
                openError(error.response.data.error);
                console.log(error);
            }
        },
    });

    const changeColor = () => {
        setHue((prev) => (prev + 60) % 360); // Increments by 60° for distinct colors
        setFilter(`hue-rotate(${hue}deg)`);
    };

    const openError = (error: string) => {
        messageApi.open({
          type: 'error',
          content: error,
        });
    };
    

    return (
        <div className='min-h-screen w-full flex max-lg:flex-col items-center max-lg:justify-center max-lg:gap-8 px-9  lg:relative' style={{fontFamily: "Noto Sans, Plus Jakarta Sans"}}>
            {contextHolder}
            <motion.div 
            className='flex flex-col md:w-[600px]  gap-3 max-lg:gap-5 justify-self-end text-left'
            initial={{ y: 100, opacity: 0  }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            >
                <h1 className='font-bold text-[62px] max-md:text-[35px]'>Decode Plate Numbers Instantly</h1>
                <p className='font-medium text-[22px] max-md:text-[18px]'>Enter Any Plate Number to receive detailed Vehicle Information</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className='bg-[#EEEEEE] p-4 w-[80%] max-md:w-full h-16 rounded-xl flex items-center justify-between'>
                        <div className='flex w-full items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                                d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                            ></path>
                            </svg>
                            <input 
                                name="plate"
                                className='border-none outline-none bg-transparent w-full' 
                                type="text" 
                                value={formik.values.plate.toUpperCase()}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='Enter Plate Number Here'
                            />
                        </div>
                        <motion.button 
                        className='bg-[#000] text-base font-bold text-[#fff] px-4 h-12 rounded-lg'
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        >
                                Decode
                        </motion.button>
                    </div>
                    {formik.touched.plate && formik.errors.plate && (
                        <p className="text-red-500">{formik.errors.plate}</p>
                    )}
                </form>
            </motion.div>

            <AnimatePresence>
                {!exit && 
                    <motion.img 
                        className='lg:absolute right-0' 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
                        exit={{ x: -1500,  transition: { duration: .5 } }}
                        src="/carRed.png" alt="car" 
                        style={{ filter }} 
                        width={700} 
                        height={700} 
                        onClick={changeColor}
                    />
                }       
            </AnimatePresence>
            {exit &&
                <div className='flex flex-col gap-5 items-center'>
                        <motion.div 
                        key={details?.plate}
                        className='w-96 h-48 p-3 flex flex-col gap-3  shadow-lg shadow-black border-solid relative bg-[#fcf8f8] rounded-md' 
                        style={{backgroundImage: 'url("/map.png")', backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundBlendMode:'hard-light' }}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
                        >
                            <div className='flex items-center justify-center w-full'>
                                <img src="./flag.png" className='w-[50px] h-[40px] absolute left-3' alt="flag"  />
                                <div className='flex flex-col text-center items-center justify-center'>
                                    <h1 className='font-extrabold text-[20px]'>{details?.state}</h1>  
                                    <p>{details?.slogan}</p>
                                </div>
                            </div>
                            <div className='w-full flex justify-center'>
                                <h1 className='text-[50px] font-bold'>{details?.plate}</h1>
                            </div>
                        </motion.div>
                    
                    <Descriptions bordered column={2} >
                        <Descriptions.Item label="LGA">{details?.lga}</Descriptions.Item>
                        <Descriptions.Item label="STATE">{details?.state}</Descriptions.Item>
                        <Descriptions.Item label="Year Of Reg.">{details?.year}</Descriptions.Item>
                        <Descriptions.Item label="Age(since Reg.)">{details?.age}</Descriptions.Item>
                        <Descriptions.Item label="Batch">{details?.batch}</Descriptions.Item>
                        <Descriptions.Item label="Batch No.">{details?.batchNo}</Descriptions.Item>
                        <Descriptions.Item label="latitude">{details?.latitude}</Descriptions.Item>
                        <Descriptions.Item label="longitude">{details?.longitude}</Descriptions.Item>
                    </Descriptions>
                </div>
            }

            

        </div>
    )
}
