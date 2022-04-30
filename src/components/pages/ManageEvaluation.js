import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/manage-evaluation.css";

const ManageEvaluation = () => {
  
  const {id} = useParams();
  const[subject, setSubject] = useState({
    questionDTOList:[]
  });
  
  const getSubject = async () => {
    const req = await axios.get(`http://localhost:8080/api/v1/subject/${id}`, {withCredentials : true})
    setSubject(await req.data);
  }

  useEffect(() => {
    getSubject();
  },[])

  return(
    <section className="manageEvaluation">
     <div className="manageEvaluation__card">
        <h1 className="manageEvaluation__subjectName">{subject.subjectName}</h1>
        <h2 className="manageEvaluation__subjectCode">{subject.subjectCode}</h2>

        <div className="question-container">
          {subject.questionDTOList.map((question) =>
          <div  key={question.id} className="question-item">
            <p className="question-container__question">{question.question}</p>
            <span className="question-container__score">{question.score}</span>
          </div>
          )}
        </div>


     </div>
    </section>
  )
}

export default ManageEvaluation;