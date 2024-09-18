import React, { useState } from 'react'
import ChildComp from './ChildComp';
import { numberState } from './recoil/counter';
import { useRecoilState } from 'recoil';

function RecoilTest() {
  const [useStateNumber, setuseStateNumber] = useRecoilState(numberState);

  const increment =()=>{
    setuseStateNumber(useStateNumber+1);
  }

  const decrement =()=>{
    setuseStateNumber(useStateNumber-1);
  }


  return (
    <div className="w-full h-auto flex justify-center items-center"> {/* Full screen width and height, centered content */}
      <div className="w-1/2 flex flex-col space-y-2 items-center"> {/* Center the number and buttons */}
        <h1 className="text-[64px] font-bold text-slate-900">{useStateNumber}</h1>

        <button onClick={increment} className="p-3 bg-green-500 text-white">
          Increment
        </button>
        
        <button onClick={decrement} className="p-3 bg-red-500 text-white">
          Decrement
        </button>
        
      </div>
      
    </div>
  );
}

export default RecoilTest;
