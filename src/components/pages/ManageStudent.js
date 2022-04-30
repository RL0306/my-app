import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ManageStudent = () => {
  
  const[students, setStudents] = useState([]);
  const navigation = useNavigate();

  const getAllPeople = async () => {
    const req = await axios.get("http://localhost:8080/api/v1/admin/all", {withCredentials : true});
    const data = await req.data;
    setStudents(data);
  }

  useEffect(() => {
    getAllPeople();
  },[])

  const handleRedirect = (username) => {
    navigation(`/more-info/${username}`)
  }
  
  return (
    <section className="manage-container">
      <Link to={"/add-subject"}>+</Link>
      <table className="manage-container__table">
        <thead className="manage-container__thead">
          <tr className="manage-container__tr">
            <th className="manage-container__th">Student_Id</th>
            <th className="manage-container__th">Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
            <tr key={student.id} className="manage-container__tr">
              <td onClick={() => handleRedirect(student.username)} className="manage-container__td --color">{student.username}</td>
              <td className="manage-container__td">{student.fullName}</td>
            </tr>
          )}
        </tbody>
      </table>
    </section> 
  )
}

export default ManageStudent;