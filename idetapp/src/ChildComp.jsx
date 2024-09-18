import { numberState } from "./recoil/counter";
import { useRecoilValue } from "recoil";

function ChildComp() {
    const recoilNumberValue = useRecoilValue(numberState);
  return (
    <div className="p-3 bg-yellow-500 text-white text-[16px] justify-center item-center flex ">
     <h1>{ recoilNumberValue}</h1>
    </div>
  );
}

export default ChildComp;
