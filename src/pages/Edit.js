import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import { DiaryDispatchContext } from "../App";
import { useContext, useEffect } from "react";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";

const Edit = () =>{
  const {id} = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const {onUpdate, onDelete} = useContext(DiaryDispatchContext);
  const goBack = () =>{
    navigate(-1);
  }
  const onClickDelete = () =>{
    if(window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")){
      onDelete(id);
      navigate("/",{replace:true});
    }
  }
  const onClickUpdate = (data) =>{
    if(window.confirm("일기를 정말 수정할까요?")){
      const{date,content,emotionId} = data;
      onUpdate(id,date,content,emotionId);
      navigate("/",{replace:true});
    }
  }
  useEffect(()=>{
    setPageTitle(`${id}번 일기 수정하기`);
  },[]);
  return(
    <div>
      <Header title={"일기 수정하기"}
      leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
      rightChild={ 
      <Button text={"삭제하기"} type={"negative"} 
      onClick={onClickDelete}/>}
      />
      <Editor 
        initData={data}
        onSubmit={onClickUpdate}
      />
    </div>
  );
};
export default Edit;