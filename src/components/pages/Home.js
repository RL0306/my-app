import { UserContext } from "../context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import "../style/home.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {

  const [user, setUser] = useContext(UserContext);
  const[subjects, setSubjects] = useState([]);
  
  


  const navigation = useNavigate();

  const getAllSubjectsForFaculty = async () => {
    const req = await axios.get("http://localhost:8080/api/v1/subject/faculty/all", {withCredentials : true});
    console.log(await req.data)
    setSubjects(await req.data);
  } 

  const getAllSubjectsForStudent = async () => {
    const req = await axios.get("http://localhost:8080/api/v1/student/subject/all", {withCredentials : true});
    setSubjects(await req.data);
  }

  useEffect(() => {
    if(user.role === "ROLE_FACULTY"){
      getAllSubjectsForFaculty();
    }

    if(user.role === "ROLE_STUDENT"){
       getAllSubjectsForStudent();
    }

  },[])

  const handleRedirect = (id) => {
    navigation(`/evaluation-view-faculty/${id}`);
  }

  const handleRedirectStudent = (id) => {
    navigation(`/evaluation-view/${id}`);
  }




  return (
    <section className="container">
      
      {user.role === "ROLE_ADMIN" &&
        <div className="card">
          <h1 className="card__heading">GCOES Manager</h1>
          <Link to={"/manage-question"} className="card__redirect link--redirect">Manage Questionnaire</Link>
          <Link to={"/manage-user"} className="card__redirect link--redirect">Manage Users</Link>
          <Link to={"/evaluation"} className="card__redirect link--redirect">Manage Faculty Evaluation</Link>
          <Link to={"/manage-subject"}className="card__redirect link--redirect">Manage Subjects</Link>
          <Link to={"/manage-student"}className="card__redirect link--redirect">Manage Student</Link>
        </div>
      }

      <section className="subject__container">

        {user.role === "ROLE_STUDENT" && subjects.map((subject) =>
          <div key={subject.id} className="subject">
            <h1 className="subject__title link--redirect">{subject.subjectTitle}</h1>
            <a className="subject__id link--redirect" href="*">{subject.subjectCode}</a>
            <a className="subject__teacher link--redirect" href="*">{subject.subjectTeacher}</a>
            <button onClick={() => handleRedirectStudent(subject.id)} className="card__redirect link--redirect --subect--btn">View Evaluation</button>
          </div>
        )}

      </section>

      {user.role === "ROLE_FACULTY" &&
      <section className="subject__container">
        {subjects.map((subject) =>
        <div key={subject.id} className="subject">
          <h1 className="subject__title link--redirect">{subject.subjectTitle}</h1>
          <a className="subject__id link--redirect" href="*">{subject.subjectCode}</a>
          <button onClick={() => handleRedirect(subject.id)} className="card__redirect link--redirect --subect--btn">View Evaluation</button>
        </div>
        )}
      </section>
      }




    </section> 
  )

}

export default Home;