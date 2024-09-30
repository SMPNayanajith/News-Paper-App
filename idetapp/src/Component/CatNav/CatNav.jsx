import React, { useEffect, useState } from 'react';
import { FaBaseball } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { TbRibbonHealth } from "react-icons/tb";
import { articleState } from '../../recoil/articleState';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { SiGeneralelectric } from "react-icons/si";
import { FaUniversity } from "react-icons/fa";
import { FaCarCrash } from "react-icons/fa";
import { RiCriminalFill } from "react-icons/ri";

function CatNav() {

  const setArticles = useSetRecoilState(articleState);
  const [activeFilter, setActiveFilter] = useState('Sport');

  const fetchArticleByType = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/filter-articles?type=${type}`);
      setArticles(response.data.artical);
    } catch (error) {
      console.error("Error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticleByType(activeFilter);
  }, [activeFilter]);

  const handleFilterClick = (type) => {
    setActiveFilter(type);
  };

  return (
    <div className='w-full max-h-[56px] border-y-[1px] border-[#565656] border-opacity-25'>
      <ul className='w-full flex'>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('Sport')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'Sport' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><FaBaseball /></span>
            <span>Sports</span>
          </div>
        </li>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('Political')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'Political' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><FaUserTie /></span>
            <span>Political</span>
          </div>
        </li>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('General')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'General' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><SiGeneralelectric /></span>
            <span>General </span>
          </div>
        </li>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('Educational')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'Educational' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><FaUniversity  /></span>
            <span>Educational </span>
          </div>
        </li>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('Criminal')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'Criminal' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><RiCriminalFill /></span>
            <span>Criminal </span>
          </div>
        </li>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('Accident')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'Accident' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><FaCarCrash /></span>
            <span>Accident </span>
          </div>
        </li>
        <li className='w-1/3'>
          <div
            onClick={() => handleFilterClick('Health')}
            className={`w-full px-2 flex justify-center items-center flex-row space-x-2 cursor-pointer
              ${activeFilter === 'Health' ? 'bg-sky-800 text-white' : 'bg-transparent text-gray-600'} `}
          >
            <span><TbRibbonHealth /></span>
            <span>Health </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CatNav;
