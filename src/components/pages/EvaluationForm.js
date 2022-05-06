import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/evaluation-form.css";

const EvaluationForm = () => {
  
  const[question, setQuestions] = useState([]);
  const[output, setOutput] = useState("");

  const {id} = useParams();

  const getAllQuestions = async () => {
    const req = await axios.get(`http://localhost:8080/api/v1/question/all`, {withCredentials : true})
    setQuestions(await req.data);
  }

  useEffect(() => {
    getAllQuestions();
  },[])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const evaluationAnswer = {
      question1 : formData.get("4"),
      question2 : formData.get("5"),
      question3 : formData.get("6"),
      question4 : formData.get("7"),
      question5 : formData.get("8"),
    }
    try{
      await axios.post(`http://localhost:8080/api/v1/evaluation/${id}`, evaluationAnswer, {withCredentials : true});
      setOutput("Successfully Submitted")
    } catch(error) {
      setOutput("You already have submitted!")
    }
  }
  
  
  return(
    <section className="evaluation-form">
      <h1 className="evaluation-form__heading">Evaulation Form</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="evaluation-form__form">
        <div className="evaluation-form__scores-info">
          <div className="evaluation-form__score">
            <p className="evalutation-form__rating">Strongly disagree</p>
            <span className="evalutation-form__number">1</span>
          </div>

          <div className="evaluation-form__score">
            <p className="evalutation-form__rating --hidden">hidden</p>
            <span className="evalutation-form__number">2</span>
          </div>

          <div className="evaluation-form__score">
            <p className="evalutation-form__rating">Neutral</p>
            <span className="evalutation-form__number">3</span>
          </div>

          <div className="evaluation-form__score">
            <p className="evalutation-form__rating --hidden">hidden</p>
            <span className="evalutation-form__number">4</span>
          </div>

          <div className="evaluation-form__score">
            <p className="evalutation-form__rating">Strongly Agree</p>
            <span className="evalutation-form__number">5</span>
          </div>
        </div>

        {question.map((question) => 
          <div className="evaluation-form__card">
            <label className="evaluation-form__label">{question.question}</label>
            <div className="evaluation-form__inputs">
              <input type="radio" name={question.id} value="1"/>
              <input type="radio" name={question.id} value="2"/>
              <input type="radio" name={question.id} value="3"/>
              <input type="radio" name={question.id} value="4"/>
              <input type="radio" name={question.id} value="5"/>
            </div>
          </div>
        )}

        <button className="evalutation-form__submit" type="submit">Submit</button>
      </form>

      <p className="evaluation__error">{output}</p>  
    </section>
  )
}

export default EvaluationForm;