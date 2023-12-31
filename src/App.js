
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage.jsx';
import Register from './components/register';
import Companyform from './components/CompnayFrom.jsx';
import DashBoard from "./components/DashBoard.jsx"
import LandingPage from './components/LandingPage';
import ListProjects from './components/ListProjects';
import AddProject from './components/AddProject';
import ProjectDetails from './components/ProjectDetails';
import ContactUs from './components/ContactUs.jsx';
import About from './components/About.jsx';
import Services from './components/Services';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import CookiesPolicy from './components/CookiesPolicy';
import CompanyProfile from './components/CompanyProfile';
import CompanyList from './components/CompanyList';
import EditProject from './components/EditProject';
import EditProjectDetails from './components/EditProjectDetails';
import EditCompanyProfile from './components/EditCompanyProfile';
import EmpProfile from './components/EmpProfile';
import EditEmpProfile from './components/EditEmpProfile';
import ListPatners from './components/ListPatners';
import DeveloperProfile from './components/DeveloperProfile';
import ProjectAdmin from './components/ProjectAdmin';
import AppliedDevs from './components/AppliedDevs';
import ProjectDashboard from './components/ProjectDashboard';
import DeveloperLogin from './components/DeveloperLogin';
import AdminLogin from './components/AdminLogin';
import ChooseOptions from './components/ChooseOptions';
import Contributors from './components/Contributors';
import Admins from './components/Admins';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />}> </Route>
          <Route exact path="/signup" element={<Register />}> </Route>
          <Route exact path="/login" element={<LoginPage />}> </Route>
          <Route exact path='/company-register' element={<Companyform />}> </Route>
          <Route exact path='/company-list' element={<CompanyList />}> </Route>
          <Route exact path='/company-profile' element={<CompanyProfile />}> </Route>
          <Route exact path='/company-profile/edit/:id' element={<EditCompanyProfile />}></Route>
          <Route exact path='/admin-dashBoard' element={<DashBoard />}></Route>
          <Route exact path='/list-projects' element={<ListProjects />}></Route>
          <Route exact path='/post-project' element={<AddProject />}></Route>
          <Route exact path='/admin-dashboard/project-details/:id' element={<ProjectDetails />}></Route>
          <Route exact path='/admin-dashboard/project-details/:num/edit-project/:id' element={<EditProjectDetails />}></Route>
          <Route exact path='/edit-project' element={<EditProject />}></Route>
          <Route exact path='/contact' element={<ContactUs />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/services' element={<Services />}></Route>
          <Route exact path='/privacy-policy' element={<PrivacyPolicy />}></Route>
          <Route exact path='/terms-of-use' element={<TermsOfUse />}></Route>
          <Route exact path='/cookies-policy' element={<CookiesPolicy />}></Route>
          {/* <Route exact path='/emp-list' element={<EmpList />}></Route> */}
          <Route exact path='/emp-profile/:id' element={<EmpProfile />}></Route>
          <Route exact path='/emp-profile/edit/:id' element={<EditEmpProfile />}></Route>
          <Route exact path='/list-patners' element={<ListPatners />}></Route>
          <Route exact path='/developer-profile' element={<DeveloperProfile />}></Route>
          <Route exact path='/project-admin' element={<ProjectAdmin />}></Route>
          <Route exact path='/applied-devs' element={<AppliedDevs />}></Route>
          <Route exact path='/project-dashboard' element={<ProjectDashboard />}></Route>
          <Route exact path='/developer-login' element={<DeveloperLogin />}></Route>
          <Route exact path='/choose-options' element={<ChooseOptions />}></Route>
          <Route exact path='/admin-login' element={<AdminLogin />}></Route>
          <Route exact path='/contributors' element={<Contributors/>}></Route>
          <Route exact path='/projectadmins' element={<Admins/>}></Route>
          {/* <Route exact path='/company_get' element={<CompanyGet />}></Route> */}
          {/* <Route exact path='/company_post' element={<CompanyPost />}></Route> */}
          {/* <Route exact path='/company_single' element={<GetSingleCompany />}></Route> */}
          {/* <Route exact path='/company_project' element={<GetCompanyProject />}></Route> */}
          {/* <Route exact path='/company_projectadd' element={<AddCompanyProject />}></Route> */}
          {/* <Route exact path='/add_emp' element={<AddEmp />}></Route> */}
          {/* <Route exact path='/register' element={<Company />}> </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

