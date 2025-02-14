// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import Dashboard from "./Dashboard";

// const Page = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userSession = Cookies.get("userSession");

//     if (!userSession) {
//       router.replace("/"); // ✅ Use replace() to avoid back navigation issues
//     } else {
//       setIsAuthenticated(true);
//     }
    
//     setLoading(false);
//   }, [router]);

//   if (loading) return null; // ✅ Prevents UI flickering during session check

//   return isAuthenticated ? <Dashboard /> : null;
// };

// export default Page;




import React from 'react'
import Dashboard from './Dashboard';

const page = () => {

  return (
    <>
    <Dashboard />
    
    </>
      
  )
}

export default page;

