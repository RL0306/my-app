import {BrowserRouter, Routes, Route} from "react-router-dom"
import { UserProvider } from "./components/context/UserContext";
import Header from "./components/helpers/Header";
import AdminLogin from "./components/pages/AdminLogin";
import FacultyLogin from "./components/pages/FacultyLogin";
import StudentLogin from "./components/pages/StudentLogin";
import Home from "./components/pages/Home";
import ManageUser from "./components/pages/ManageUser";
import CreateUser from "./components/pages/CreateUser";
import CreateSubject from "./components/pages/CreateSubject";
import ManageSubject from "./components/pages/ManageSubject";
import CreateQuestion from "./components/pages/CreateQuestion";
import ManageQuestion from "./components/pages/ManageQuestion";
import EvaluationView from "./components/pages/EvaluationView";
import ManageEvaluation from "./components/pages/ManageEvaluation";
import EvaluationForm from "./components/pages/EvaluationForm";
import EvaluationViewFaculty from "./components/pages/EvaluationViewFaculty";
import ManageStudent from "./components/pages/ManageStudent";
import AddSubject from "./components/pages/AddSubject";
import ProtectedRoute from "./components/helpers/ProtectedRoute";
import StudentMoreInfo from "./components/pages/StudentMoreInfo";

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<StudentLogin/>}/>
          <Route path="/admin-login" element={<AdminLogin/>}/>
          <Route path="/faculty-login" element={<FacultyLogin/>}/>
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/manage-user" element={<ManageUser/>}/>
            <Route path="/manage-subject" element={<ManageSubject/>}/>
            <Route path="/manage-question" element={<ManageQuestion/>}/>
            <Route path="/user-create" element={<CreateUser/>}/>  
            <Route path="/subject-create" element={<CreateSubject/>}/>
            <Route path="/create-question" element={<CreateQuestion/>} />
            <Route path="/evaluation" element={<EvaluationView/>}/>
            <Route path="/manage-evaluation/:id" element={<EvaluationViewFaculty/>}/>
            <Route path="/evaluation-view/:id" element={<EvaluationForm/>}/>
            <Route path="/evaluation-view-faculty/:id" element={<EvaluationViewFaculty/>}/>
            <Route path="/manage-student" element={<ManageStudent/>}/>
            <Route path="/add-subject" element={<AddSubject/>}/>
            <Route path="/more-info/:username" element={<StudentMoreInfo/>} />
          </Route>
        
        
        
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;