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
    } catch(error) {
      setOutput("You already have submitted!")
    }
  }
  
  
  return(
    <section className="evaluation-form">
      <h1 className="evaluation-form__heading">Evaulation Form</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="evaluation-form__form">
        {question.map((question) => 
        <>
        <label className="evaluation-form__label">{question.question}</label>
        <select name={question.id} required key={question.id} className="evaluation-form__select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        </>
        )}

        <button className="evalutation-form__submit" type="submit">Submit</button>
      </form>

      <p className="evaluation__error">{output}</p>  
    </section>
  )
}

export default EvaluationForm;