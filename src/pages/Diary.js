import {useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getFormattedDate, setPageTitle } from "../util";
import Header from "../component/Header";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
import { useEffect } from "react";
const Diary = () =>{
  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const goBack = () =>{
    navigate(-1);
  }
  const goEdit = () =>{
    navigate(`/edit/${id}`);
  }
  useEffect(()=>{
    setPageTitle(`${id}번 일기`);
  },[]);
  if(!data){
    return <div>데이터를 불러오고 있습니다.</div>
  }else{
    const {content, emotionId, date} = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`
    return(
      <div>
        <Header 
        title={title}
        leftChild={<Button text={"<뒤로가기"} onClick={goBack}/>}
        rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};
export default Diary;