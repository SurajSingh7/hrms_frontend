"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import Layout from "../../../layouts/employeeHrms/Layout";
import MonthlyAttendanceCalendars from "./MonthlyAttendanceCalendars";
import "react-calendar/dist/Calendar.css";
import QuickLinksCard from "./QuickLinksCard";
import MyTable from "./MyTable";
import styles from "./style.module.css";
import API_BASE_URL from "../../../../config/config";
import MessagingCard from "./MessagingCard";
import EmployeeCard from "./EmployeeCard";
import CustomSpin from "./CustomSpin";

const Dashboard = ({ accessData }) => {
  const router = useRouter(); // Initialize router for navigation
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false); // State for handling 401 status
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const url = `${API_BASE_URL}/hrms/authdata`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // Include cookies with the request
        });

        console.log("Dashboard API response status:", response.status);

        if (response.status === 401) {
          setUnauthorized(true); // Mark unauthorized state
          return;
        }

        if (response.ok) {
          const result = await response.json();
          const employeeData = result.data[0];

          const { email, department, basicemployees, role } = employeeData;


          setUserData({
            email,
            department: department?.name,
            role: department?.roles?.name,
            firstName: basicemployees?.firstName,
            lastName: basicemployees?.lastName,
            employeeCode: basicemployees?.employeeCode,
            uploadFileInfo: basicemployees?.uploadFileInfo?.[0]?.path,
            profileImage: basicemployees?.profileImage,
          });

          setSelectedEmployee(basicemployees?.employeeCode);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Something went wrong");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // No dependency on router here to prevent unnecessary re-fetch

  // Redirect to home if unauthorized, without reloading the page
  useEffect(() => {
    if (unauthorized) {
      console.log("Redirecting to home due to 401 Unauthorized");
      router.replace("/"); // Ensure no page reload happens
    }
  }, [unauthorized, router]);

  if (unauthorized) return null; 

  if (loading) return <CustomSpin />;

  return (
    <Layout>
      <div className="container" style={{ backgroundColor: "#F2F2F7", padding: "20px" }}>
        <div className={styles.cardContainer}>
          <EmployeeCard userData={userData} />
          <MessagingCard />
          <QuickLinksCard className={styles.quickLinksCard} employeeName={userData} />
        </div>

        <br />
        <MyTable selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
        <br />

        <div style={{ paddingBottom: "40px" }}>
          <MonthlyAttendanceCalendars selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;









// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter for redirection
// import Layout from "../../../layouts/employeeHrms/Layout";
// import MonthlyAttendanceCalendars from "./MonthlyAttendanceCalendars";
// import "react-calendar/dist/Calendar.css";
// import QuickLinksCard from "./QuickLinksCard";
// import MyTable from "./MyTable";
// import styles from "./style.module.css";
// import API_BASE_URL from "../../../../config/config";
// import MessagingCard from "./MessagingCard";
// import EmployeeCard from "./EmployeeCard";
// import CustomSpin from "./CustomSpin";

// const Dashboard = ({ accessData }) => {
//   const router = useRouter(); // Initialize router for navigation
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [unauthorized, setUnauthorized] = useState(false); // State for handling 401 status
//   const [selectedEmployee, setSelectedEmployee] = useState("");

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const url = `${API_BASE_URL}/hrms/authdata`;
//         const response = await fetch(url, {
//           method: "GET",
//           credentials: "include", // Include cookies with the request
//         });

//         console.log("Dashboard API response status:", response.status);

//         if (response.status === 401) {
//           setUnauthorized(true); // Mark unauthorized state
//           return;
//         }

//         if (response.ok) {
//           const result = await response.json();
//           const employeeData = result.data[0];

//           const { email, department, basicemployees, role } = employeeData;

//           setUserData({
//             email,
//             department: department?.name,
//             role: department?.roles?.name,
//             firstName: basicemployees?.firstName,
//             lastName: basicemployees?.lastName,
//             employeeCode: basicemployees?.employeeCode,
//             uploadFileInfo: basicemployees?.uploadFileInfo?.[0]?.path,
//             profileImage: basicemployees?.profileImage,
//           });

//           setSelectedEmployee(basicemployees?.employeeCode);
//         } else {
//           setError("Failed to fetch data");
//         }
//       } catch (err) {
//         setError("Something went wrong");
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Force redirect to home if unauthorized
//   useEffect(() => {
//     if (unauthorized) {
//       console.log("Redirecting to home due to 401 Unauthorized");
//       router.replace("/"); // Force navigation to home page
//     }
//   }, [unauthorized, router]);

//   if (unauthorized) return null; // Prevent rendering if unauthorized

//   if (loading) return <CustomSpin />;

//   return (
//     <Layout>
//       <div className="container" style={{ backgroundColor: "#F2F2F7", padding: "20px" }}>
//         <div className={styles.cardContainer}>
//           <EmployeeCard userData={userData} />
//           <MessagingCard />
//           <QuickLinksCard className={styles.quickLinksCard} employeeName={userData} />
//         </div>

//         <br />
//         <MyTable selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
//         <br />

//         <div style={{ paddingBottom: "40px" }}>
//           <MonthlyAttendanceCalendars selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;












// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter for redirection
// import Layout from "../../../layouts/employeeHrms/Layout";
// import MonthlyAttendanceCalendars from "./MonthlyAttendanceCalendars";
// import "react-calendar/dist/Calendar.css";
// import QuickLinksCard from "./QuickLinksCard";
// import MyTable from "./MyTable";
// import styles from "./style.module.css";
// import API_BASE_URL from "../../../../config/config";
// import MessagingCard from "./MessagingCard";
// import EmployeeCard from "./EmployeeCard";
// import CustomSpin from "./CustomSpin";

// const Dashboard = ({ accessData }) => {
//   const router = useRouter(); // Initialize router for navigation
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
  
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const url = `${API_BASE_URL}/hrms/authdata`;
//         const response = await fetch(url, {
//           method: "GET",
//           credentials: "include", // Include cookies with the request
//         });

//         console.log("dasboard line 134-> response.status",response.status)

//         if (response.status === 401) {
//           router.push("/"); // Redirect to home if unauthorized
//           return;
//         }

//         if (response.ok) {
//           const result = await response.json();
//           const employeeData = result.data[0];

//           const { email, department, basicemployees, role } = employeeData;

//           setUserData({
//             email,
//             department: department?.name,
//             role: department?.roles?.name,
//             firstName: basicemployees?.firstName,
//             lastName: basicemployees?.lastName,
//             employeeCode: basicemployees?.employeeCode,
//             uploadFileInfo: basicemployees?.uploadFileInfo?.[0]?.path,
//             profileImage: basicemployees?.profileImage,
//           });

//           setSelectedEmployee(basicemployees?.employeeCode);
//         } else {
//           setError("Failed to fetch data");
//         }
//       } catch (err) {
//         setError("Something went wrong");
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [router]);

//   if (loading) return <CustomSpin />;

//   return (
//     <Layout>
//       <div className="container" style={{ backgroundColor: "#F2F2F7", padding: "20px" }}>
//         <div className={styles.cardContainer}>
//           <EmployeeCard userData={userData} />
//           <MessagingCard />
//           <QuickLinksCard className={styles.quickLinksCard} employeeName={userData} />
//         </div>

//         <br />
//         <MyTable selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
//         <br />
        
//         <div style={{ paddingBottom: "40px" }}>
//           <MonthlyAttendanceCalendars selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;

















// "use client";
// import React from "react";
// import { useState, useEffect } from "react";
// // import Layout from "@/layouts/hrms/Layout";
// import Layout from "../../../layouts/employeeHrms/Layout";
// import MonthlyAttendanceCalendars from "./MonthlyAttendanceCalendars";
// import "react-calendar/dist/Calendar.css";
// import QuickLinksCard from "./QuickLinksCard";
// import MyTable from "./MyTable";
// import styles from "./style.module.css";
// import API_BASE_URL from "../../../../config/config";
// import Messages from "./messages";
// import MessagingCard from "./MessagingCard";
// import EmployeeCard from './EmployeeCard';
// import CustomSpin from "./CustomSpin";



// const Dashboard = ({ accessData }) => {
//   console.log("dashboard", accessData);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
 

//   useEffect(() => {




//     const fetchDashboardData = async () => {
//       try {
//         const url = `${API_BASE_URL}/hrms/authdata`;
//         console.log('url', url);
//         const response = await fetch(url, {
//           method: "GET",
//           credentials: "include", // Include cookies with the request
//         });
      
//         console.log('response>>>>>>>>>>>>>>>>>>>>0', response);
//         if (response.ok) {
//           const result = await response.json();
//           const employeeData = result.data[0];
//           console.log('response>>>>>>>>>>>>>>>>>>>>1', result);
//           console.log('response>>>>>>>>>>>>>>>>>>>>2', employeeData);
          
//           const { email, department, basicemployees, role, uploadFileInfo } = employeeData;

//           console.log("line 46",email, department, basicemployees, role, uploadFileInfo);
//           console.log("line 47 dep",email, department, basicemployees, role, uploadFileInfo);
//           console.log("line 48 basi",email, department, basicemployees, role, uploadFileInfo);
//           console.log("line 46",email, department, basicemployees, role, uploadFileInfo);
//           console.log("department role@@@@@@@@@@@@@@@@@@",department)

     
//           setUserData({
//             email,
//             department: department?.name,
//             role: role?.name,
//             firstName: basicemployees?.firstName,
//             lastName: basicemployees?.lastName,
//             employeeCode: basicemployees?.employeeCode,
//             role:department?.roles?.name,
//             uploadFileInfo: basicemployees?.uploadFileInfo[0]?.path,
//             profileImage:basicemployees?.profileImage
//           })
         
//           setSelectedEmployee( basicemployees?.employeeCode)
          
//         } else {
//           setError("Failed to fetch data");
//         }
//       } catch (err) {
//         setError("Something went wrong");

//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);
//   console.log("userData", userData);

//   if (loading) return <CustomSpin />;


//   return (
//     <Layout>
//       <>
//         <div className="container" style={{ backgroundColor: "#F2F2F7", padding: "20px" }} >
//           <div className={styles.cardContainer}>
           
//             <EmployeeCard userData={userData} />
//             {/* <Messages /> */}
//             <MessagingCard/>

//             <QuickLinksCard className={styles.quickLinksCard} employeeName={userData}/>
//           </div>

//           <br />
//           <MyTable selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
//           <br />
        
//           <div style={{ paddingBottom: "40px" }}>
//             <MonthlyAttendanceCalendars selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}/>
//           </div>


//         </div>
//       </>
//     </Layout>
//   );
// };

// export default Dashboard;










