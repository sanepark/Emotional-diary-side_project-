import "./Editor.css";
import Button from "./Button"
import EmotionItem from "./EmotionItem";
import {useState,useEffect, useCallback} from "react";
import { emotionList , getFormattedDate } from "../util";
import {useNavigate} from "react-router-dom";

const Editor = ({initData, onSubmit}) =>{
  useEffect(()=>{
      if(initData){
        setState({
          ...initData,
          date:getFormattedDate(new Date(parseInt(initData.date)))
        });
    }
  },[initData]);
  const navigate = useNavigate();
  const [state , setState] = useState({
    date:getFormattedDate(new Date()),
    emotionId: 3,
    content : ""
  });
  const handleChangeDate = (e) =>{
    setState({
      ...state,
      date:e.target.value,
    });
  };
  const handleChangeContent = (e) =>{
    setState({
      ...state,
      content:e.target.value,
    });
  };
  const handleSubmit = () => {
    onSubmit(state);
  }
  const handleOnGoBack = () =>{
    navigate(-1);
  };
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) =>({
      ...state,
      emotionId,
    }));
  },[]);
  return(
    <div className="Editor">
      <div className="editor_section">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="editor_section">
       <h4>오늘의 감정</h4>
       <div className="input_wrapper emotion_list_wrapper">
        {emotionList.map((it)=>(
          <EmotionItem 
            key={it.id}
            {...it}
            onClick={handleChangeEmotion}
            isSelected={state.emotionId === it.id} />
        ))}
       </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea 
          placeholder="오늘은 어땠나요?"
          value={state.content}
          onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack}/>
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
      </div>
    </div>
  );
};
export default Editor;
