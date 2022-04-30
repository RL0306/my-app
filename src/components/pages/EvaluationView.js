import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/evaluation.css";

const EvaluationView = () => {

  const[subjects, setSubjects] = useState([]);

  const navigation = useNavigate()

  const getAllSubjects = async () => {
    const req = await axios.get("http://localhost:8080/api/v1/subject/all", {withCredentials : true});
    setSubjects(await req.data);
  }

  useEffect(() => {
    getAllSubjects();
  },[])

  const handleRedirect = (id) => {
    navigation(`/manage-evaluation/${id}`);
  }





  return (
    <section className="evaluation">
      {subjects.map((subject) => 
        <div key={subject.id} className="evaluation__card">
          <h1 className="evaluation__card__heading --name">{subject.subjectTeacher}</h1>
          <h2 className="evaluation__card__heading --subjectName">{subject.subjectTitle}</h2>
          <h3 className="evaluation__card__heading --subjectId">{subject.subjectCode}</h3>
          <button onClick={() => handleRedirect(subject.id)} className="evaluation__card__link">View Performance</button>
        </div>
      )}
    </section>
  )
}

export default EvaluationView;