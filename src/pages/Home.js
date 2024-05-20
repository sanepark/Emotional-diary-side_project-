import Button from "../component/Button";
import Header from "../component/Header";
import { useState,useContext,useEffect } from "react";
import {DiaryStateContext} from "../App"
import { getMonthRangeByDate, setPageTitle } from "../util";
import DiaryList from "../component/DiaryList";
const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate]=useState(new Date());
  const [filteredData, setFilterdData]=useState([]);
  const onIncreaseMonth = ()=>{
      setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1));
  };
  const onDecreaseMonth=()=>{
      setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()-1));
  };
  const headerTitle=`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;
  useEffect(()=>{
    setPageTitle("Winterlood의 감정 일기장");
    if(data.length >= 1){
        const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
        setFilterdData(
            data.filter((it)=> 
            beginTimeStamp <= it.date && it.date <= endTimeStamp
            )
        );
    }else{
        setFilterdData([]);
    }
  },[data,pivotDate]);
  return (
      <div>
          <Header
          title={headerTitle}
          leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
          rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
          />
          <DiaryList data={filteredData}></DiaryList>
      </div>
  );
};

export default Home;