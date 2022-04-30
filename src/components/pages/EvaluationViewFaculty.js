import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const EvaluationViewFaculty = () => {
  
  const {id} = useParams();

  const[subject, setSubject] = useState({});
  const[questions, setQuestions] = useState([]);

  const getSubjectInfo = async () => {
    const req = await axios.get(`http://localhost:8080/api/v1/subject/${id}`, {withCredentials : true});
    const data = await req.data;
    console.log(data)
    setSubject(data);
  } 

  const getEvaluationInfoForSubject = async () => {
    const req = await axios.get(`http://localhost:8080/api/v1/evaluation/${id}`, {withCredentials : true})
    const data = await req.data;
    setQuestions(data);
  }

  useEffect(() => {
    getSubjectInfo();
    getEvaluationInfoForSubject();
  },[])
  
  return (
    <section className="manageEvaluation">
     <div className="manageEvaluation__card">
        <h1 className="manageEvaluation__subjectName">{subject.subjectName}</h1>
        <h2 className="manageEvaluation__subjectCode">{subject.subjectCode}</h2>

      {questions.length !== 0  
        ? <div className="question-container">
          {questions.map((question) =>
          <div  key={question.id} className="question-item">
            <p className="question-container__question">{question.questionDTO}</p>
            <span className="question-container__score">{question.score}</span>
          </div>
          )}
        </div>
        : <h1 className="question-container__noeval">No Evaluations done!</h1>
      }

     </div>
    </section>
  )
}

export default EvaluationViewFaculty;