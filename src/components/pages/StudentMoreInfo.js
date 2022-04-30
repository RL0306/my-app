import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentMoreInfo = () => {

  const {username} = useParams();
  const[subjectsInfo, setSubjectsInfo] = useState([]);



  const getSubjectStatus = async () => {
    const req = await axios.get(`http://localhost:8080/api/v1/student/subject/info/${username}`, {withCredentials : true});
    setSubjectsInfo(await req.data);
  }

  useEffect(() => {
    getSubjectStatus();
  },[])

  return (
    <section className="manage-container">

      {subjectsInfo.length > 0 
      ? <table className="manage-container__table">
        <thead className="manage-container__thead">
          <tr className="manage-container__tr">
            <th className="manage-container__th">Employee ID</th>
            <th className="manage-container__th">Subject Code</th>
            <th className="manage-container__th">Subject Status</th>
          </tr>
        </thead>

        <tbody>
          {subjectsInfo.map((subject) =>
            <tr key={subject.subjectCode} className="manage-container__tr">
              <td className="manage-container__td">{subject.username}</td>
              <td className="manage-container__td">{subject.subjectCode}</td>
              {subject.subjectStatus 
              ? <td className="manage-container__td">Done</td>
              :<td className="manage-container__td">Pending</td>
              }
            </tr>
            
          )}
        </tbody>
      </table>
      : <h1 className="question-container__noeval --big">Enrolled In 0 Classes</h1>
      }
    </section>
  )

} 

export default StudentMoreInfo;