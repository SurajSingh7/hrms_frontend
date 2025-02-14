'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyMaster = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hrms/company/show');
      setCompanies(response.data.data);
      setFilteredCompanies(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
     
     alert("sumited");
   
  };



  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = companies.filter(company =>
      company.companyName.toLowerCase().includes(query) ||
      company.address.toLowerCase().includes(query) ||
      company.gstNumber.toLowerCase().includes(query) ||
      company.state.toLowerCase().includes(query) ||
      company.alias?.toLowerCase().includes(query)
    );
    setFilteredCompanies(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto transform scale-90"> {/* Apply the 80% zoom here */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Company Master</h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            <button
              onClick={() => {
                setEditingCompany(null);
                setIsModalOpen(true);
              }}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Company
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
        
         <div> list </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 -mb-72">
            <div className="bg-white rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingCompany ? 'Edit Company' : 'Add Company'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['companyName', 'address', 'gstNumber', 'state', 'alias'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        name={field}
                        defaultValue={editingCompany?.[field] || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                    {editingCompany ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyMaster;















// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CompanyMaster = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCompany, setEditingCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch companies from the backend
//   const fetchCompanies = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/hrms/company/show');
//       setCompanies(response.data.data);
//       setFilteredCompanies(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Handle form submission to create or update a company
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const values = Object.fromEntries(formData.entries());

//     try {
//       if (editingCompany) {
//         await axios.put(`http://localhost:5000/hrms/company/edit/${editingCompany._id}`, values);
//       } else {
//         await axios.post('http://localhost:5000/hrms/company/create', values);
//       }
//       setEditingCompany(null);
//       setIsModalOpen(false); // Close the modal after submission
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error submitting company:', error);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/hrms/company/delete/${id}`);
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error deleting company:', error);
//     }
//   };

//   // Handle edit
//   const handleEdit = (company) => {
//     setEditingCompany(company);
//     setIsModalOpen(true); // Open the modal for editing
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = companies.filter(company =>
//       company.companyName.toLowerCase().includes(query) ||
//       company.address.toLowerCase().includes(query) ||
//       company.gstNumber.toLowerCase().includes(query) ||
//       company.state.toLowerCase().includes(query) ||
//       company.alias?.toLowerCase().includes(query)
//     );

//     setFilteredCompanies(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Company Master</h1>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingCompany(null);
//                 setIsModalOpen(true);
//               }}
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Add Company
//             </button>
//           </div>
//         </div>

//         {/* Company List */}
//         {loading ? (
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
            
//             <div className="space-y-6 p-4">
//             {filteredCompanies.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="flex justify-between items-start space-x-4">
//                   <div className="space-y-3">
//                     <div className="text-lg font-semibold text-gray-800">
//                       <strong>Company Name:</strong> {item.companyName}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       <strong>Address:</strong> {item.address}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       <strong>GST Number:</strong> {item.gstNumber}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       <strong>State:</strong> {item.state}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       <strong>Alias:</strong> {item.alias}
//                     </div>
//                   </div>
//                   <div className="flex flex-col justify-between space-y-4">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-600 text-white hover:bg-red-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//         )}

//         {/* Modal for Add/Edit Company */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editingCompany ? 'Edit Company' : 'Add Company'}
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {['companyName', 'address', 'gstNumber', 'state', 'alias'].map((field) => (
//                     <div key={field}>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         {field.replace(/([A-Z])/g, ' $1').trim()}
//                       </label>
//                       <input
//                         type="text"
//                         name={field}
//                         defaultValue={editingCompany?.[field] || ''}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg">
//                     Cancel
//                   </button>
//                   <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
//                     {editingCompany ? 'Update' : 'Add'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyMaster;








// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CompanyMaster = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCompany, setEditingCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch companies from the backend
//   const fetchCompanies = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/hrms/company/show');
//       setCompanies(response.data.data);
//       setFilteredCompanies(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Handle form submission to create or update a company
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const values = Object.fromEntries(formData.entries());

//     try {
//       if (editingCompany) {
//         await axios.put(`http://localhost:5000/hrms/company/edit/${editingCompany._id}`, values);
//       } else {
//         await axios.post('http://localhost:5000/hrms/company/create', values);
//       }
//       setEditingCompany(null);
//       setIsModalOpen(false); // Close the modal after submission
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error submitting company:', error);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/hrms/company/delete/${id}`);
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error deleting company:', error);
//     }
//   };

//   // Handle edit
//   const handleEdit = (company) => {
//     setEditingCompany(company);
//     setIsModalOpen(true); // Open the modal for editing
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = companies.filter(company =>
//       company.companyName.toLowerCase().includes(query) ||
//       company.address.toLowerCase().includes(query) ||
//       company.gstNumber.toLowerCase().includes(query) ||
//       company.state.toLowerCase().includes(query) ||
//       company.alias?.toLowerCase().includes(query)
//     );

//     setFilteredCompanies(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Company Master</h1>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingCompany(null);
//                 setIsModalOpen(true);
//               }}
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Add Company
//             </button>
//           </div>
//         </div>

//         {/* Company List */}
//         {loading ? (
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCompanies.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="space-y-3">
//                   <div><strong className="text-gray-700">Company Name:</strong> {item.companyName}</div>
//                   <div><strong className="text-gray-700">Address:</strong> {item.address}</div>
//                   <div><strong className="text-gray-700">GST Number:</strong> {item.gstNumber}</div>
//                   <div><strong className="text-gray-700">State:</strong> {item.state}</div>
//                   <div><strong className="text-gray-700">Alias:</strong> {item.alias}</div>
//                 </div>
//                 <div className="mt-4 flex space-x-4">
//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="text-blue-600 hover:text-blue-700 font-semibold"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="text-red-600 hover:text-red-700 font-semibold"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Modal for Add/Edit Company */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg w-full max-w-2xl p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editingCompany ? 'Edit Company' : 'Add Company'}
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//                     <input
//                       type="text"
//                       name="companyName"
//                       defaultValue={editingCompany?.companyName || ''}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       defaultValue={editingCompany?.address || ''}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
//                     <input
//                       type="text"
//                       name="gstNumber"
//                       defaultValue={editingCompany?.gstNumber || ''}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                     <input
//                       type="text"
//                       name="state"
//                       defaultValue={editingCompany?.state || ''}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Alias</label>
//                     <input
//                       type="text"
//                       name="alias"
//                       defaultValue={editingCompany?.alias || ''}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {editingCompany ? 'Update Company' : 'Add Company'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyMaster;














// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CompanyMaster = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCompany, setEditingCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch companies from the backend
//   const fetchCompanies = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/hrms/company/show');
//       setCompanies(response.data.data);
//       setFilteredCompanies(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Handle form submission to create or update a company
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const values = Object.fromEntries(formData.entries());

//     try {
//       if (editingCompany) {
//         await axios.put(`http://localhost:5000/hrms/company/edit/${editingCompany._id}`, values);
//       } else {
//         await axios.post('http://localhost:5000/hrms/company/create', values);
//       }
//       setEditingCompany(null);
//       event.target.reset();
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error submitting company:', error);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/hrms/company/delete/${id}`);
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error deleting company:', error);
//     }
//   };

//   // Handle edit
//   const handleEdit = (company) => {
//     setEditingCompany(company);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = companies.filter(company =>
//       company.companyName.toLowerCase().includes(query) ||
//       company.address.toLowerCase().includes(query) ||
//       company.gstNumber.toLowerCase().includes(query) ||
//       company.state.toLowerCase().includes(query) ||
//       company.alias?.toLowerCase().includes(query)
//     );

//     setFilteredCompanies(filtered);
//   };

//   return (
//     <div className="p-6 pb-10">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold mb-0">Company Master</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </span>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Company Name</label>
//             <input
//               type="text"
//               name="companyName"
//               defaultValue={editingCompany?.companyName || ''}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               name="address"
//               defaultValue={editingCompany?.address || ''}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">GST Number</label>
//             <input
//               type="text"
//               name="gstNumber"
//               defaultValue={editingCompany?.gstNumber || ''}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">State</label>
//             <input
//               type="text"
//               name="state"
//               defaultValue={editingCompany?.state || ''}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Alias</label>
//             <input
//               type="text"
//               name="alias"
//               defaultValue={editingCompany?.alias || ''}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {editingCompany ? 'Update Company' : 'Add Company'}
//           </button>
//           {editingCompany && (
//             <button
//               type="button"
//               onClick={() => setEditingCompany(null)}
//               className="ml-2 inline-flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {loading ? (
//         <div className="flex justify-center items-center h-32">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredCompanies.map((item) => (
//             <div key={item._id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
//               <div className="space-y-2">
//                 <div><strong>Company Name:</strong> {item.companyName}</div>
//                 <div><strong>Address:</strong> {item.address}</div>
//                 <div><strong>GST Number:</strong> {item.gstNumber}</div>
//                 <div><strong>State:</strong> {item.state}</div>
//                 <div><strong>Alias:</strong> {item.alias}</div>
//               </div>
//               <div className="mt-4 space-x-2">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="text-blue-500 hover:text-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyMaster;















// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Form, Input, Button, List, Spin, Typography, Space, Row, Col } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';

// const { Title } = Typography;

// const CompanyMaster = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCompany, setEditingCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [form] = Form.useForm();

//   // Fetch companies from the backend
//   const fetchCompanies = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/hrms/company/show');
//       console.log(response.data.data)
//       setCompanies(response.data.data);
//       setFilteredCompanies(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Handle form submission to create or update a company
//   const handleSubmit = async (values) => {
//     console.log(values)
//     try {
//       if (editingCompany) {
//         await axios.put(`http://localhost:5000/hrms/company/edit/${editingCompany._id}`, values);
//       } else {
//         await axios.post('http://localhost:5000/hrms/company/create', values);
//       }
//       setEditingCompany(null);
//       form.resetFields();
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error submitting company:', error);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/hrms/company/delete/${id}`);
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error deleting company:', error);
//     }
//   };

//   // Handle edit
//   const handleEdit = (company) => {
//     setEditingCompany(company);
//     form.setFieldsValue(company);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = companies.filter(company =>
//       company.companyName.toLowerCase().includes(query) ||
//       company.address.toLowerCase().includes(query) ||
//       company.gstNumber.toLowerCase().includes(query) ||
//       company.state.toLowerCase().includes(query) ||
//       company.alias?.toLowerCase().includes(query)
//     );

//     setFilteredCompanies(filtered);
//   };

//   return (
//       <div style={{ padding: '24px', paddingBottom: '40px' }}>
//         <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
//           <Col>
//             <Title level={2} style={{ marginBottom: 0 }}>Company Master</Title>
//           </Col>
//           <Col>
//             <Input
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{ width: '300px' }}
//               prefix={<SearchOutlined />}
//             />
//           </Col>
//         </Row>

//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           style={{ marginBottom: '24px' }}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="companyName"
//                 label="Company Name"
//                 rules={[{ required: true, message: 'Please input the company name!' }]}
//               >
//                 <Input placeholder="Company Name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="address"
//                 label="Address"
//                 rules={[{ required: true, message: 'Please input the address!' }]}
//               >
//                 <Input placeholder="Address" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="gstNumber"
//                 label="GST Number"
//                 rules={[{ required: true, message: 'Please input the GST number!' }]}
//               >
//                 <Input placeholder="GST Number" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="state"
//                 label="State"
//                 rules={[{ required: true, message: 'Please input the state!' }]}
//               >
//                 <Input placeholder="State" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="alias"
//                 label="Alias"
//                 rules={[{ required: true, message: 'Please input the alias!' }]}
//               >
//                 <Input placeholder="Alias" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item style={{paddingTop:"29px"}}>
//                 <Button type="primary" htmlType="submit">
//                   {editingCompany ? 'Update Company' : 'Add Company'}
//                 </Button>
//                 {editingCompany && (
//                   <Button
//                     type="default"
//                     onClick={() => {
//                       setEditingCompany(null);
//                       form.resetFields();
//                     }}
//                     style={{ marginLeft: '10px' }}
//                   >
//                     Cancel
//                   </Button>
//                 )}
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>

//         {loading ? (
//           <Spin size="large" />
//         ) : (
//           <List
//   bordered
//   dataSource={filteredCompanies}
//   renderItem={item => (
//     <List.Item
//       key={item._id} // Add the key here using a unique field like _id
//       actions={[
//         <Button key={`edit-${item._id}`} onClick={() => handleEdit(item)} type="link">Edit</Button>,
//         <Button key={`delete-${item._id}`} onClick={() => handleDelete(item._id)} type="link" danger>
//           Delete
//         </Button>,
//       ]}
//       style={{ marginBottom: '8px' }}
//     >
//       <Space direction="vertical" size="small">
//         <div><strong>Company Name:</strong> {item.companyName}</div>
//         <div><strong>Address:</strong> {item.address}</div>
//         <div><strong>GST Number:</strong> {item.gstNumber}</div>
//         <div><strong>State:</strong> {item.state}</div>
//         <div><strong>Alias:</strong> {item.alias}</div>
//       </Space>
//     </List.Item>
//   )}
// />
//         )}
//       </div>
//   );
// };

// export default CompanyMaster;










//   <div className="space-y-6 p-4">
        //     {filteredCompanies.map((item) => (
        //       <div
        //         key={item._id}
        //         className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        //       >
        //         <div className="flex justify-between items-start space-x-4">
        //           <div className="space-y-3">
        //             <div className="text-lg font-semibold text-gray-800">
        //               <strong>Company Name:</strong> {item.companyName}
        //             </div>
        //             <div className="text-sm text-gray-600">
        //               <strong>Address:</strong> {item.address}
        //             </div>
        //             <div className="text-sm text-gray-600">
        //               <strong>GST Number:</strong> {item.gstNumber}
        //             </div>
        //             <div className="text-sm text-gray-600">
        //               <strong>State:</strong> {item.state}
        //             </div>
        //             <div className="text-sm text-gray-600">
        //               <strong>Alias:</strong> {item.alias}
        //             </div>
        //           </div>
        //           <div className="flex flex-col justify-between space-y-4">
        //             <button
        //               onClick={() => handleEdit(item)}
        //               className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
        //             >
        //               Edit
        //             </button>
        //             <button
        //               onClick={() => handleDelete(item._id)}
        //               className="bg-red-600 text-white hover:bg-red-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
        //             >
        //               Delete
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </div>