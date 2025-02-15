'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyModal from './CompanyModal';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import API_BASE_URL from '../../../../config/config';

const CompanyMaster = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hrms/company/show`);
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

  const handleSubmit = async (values) => {
    try {
      if (editingCompany) {
        await axios.put(`${API_BASE_URL}/hrms/company/edit/${editingCompany._id}`, values);
      } else {
        await axios.post(`${API_BASE_URL}/hrms/company/create`, values);
      }
      setEditingCompany(null);
      setIsModalOpen(false);
      fetchCompanies();
    } catch (error) {
      console.error('Error submitting company:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hrms/company/delete/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
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
    <div className="min-h-screen  p-3 text-sm bg-gray-100 ">
      <div className="max-w-5xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-gray-800">Company Master</h1>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-48 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={() => { setEditingCompany(null); setIsModalOpen(true); }} className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 shadow">
              + Add Company
            </button>
          </div>
        </div>
        {loading ? <div className="flex justify-center">Loading...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCompanies.map((item) => (
              <div key={item._id} className="bg-white p-3 rounded-md shadow border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-700">{item.companyName}</p>
                  <p className="text-xs text-gray-600"><strong>Address:</strong> {item.address}</p>
                  <p className="text-xs text-gray-600"><strong>GST:</strong> {item.gstNumber}</p>
                  <p className="text-xs text-gray-600"><strong>State:</strong> {item.state}</p>
                  <p className="text-xs text-gray-600"><strong>Alias:</strong> {item.alias}</p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 flex items-center text-xs">
                    <FaEdit className="text-white mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 flex items-center text-xs">
                    <FaTrashAlt className="text-white mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <CompanyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editingCompany={editingCompany}
        />
      </div>
    </div>
  );
};

export default CompanyMaster;















// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CompanyModal from './CompanyModal';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import the icons

// const CompanyMaster = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCompany, setEditingCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const fetchCompanies = async () => {
//     try {
//       const response = await axios.get('NEXT_PUBLIC_API_BASE_URL/hrms/company/show');
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

//   const handleSubmit = async (values) => {
//     try {
//       if (editingCompany) {
//         await axios.put(`NEXT_PUBLIC_API_BASE_URL/hrms/company/edit/${editingCompany._id}`, values);
//       } else {
//         await axios.post('NEXT_PUBLIC_API_BASE_URL/hrms/company/create', values);
//       }
//       setEditingCompany(null);
//       setIsModalOpen(false);
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error submitting company:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`NEXT_PUBLIC_API_BASE_URL/hrms/company/delete/${id}`);
//       fetchCompanies();
//     } catch (error) {
//       console.error('Error deleting company:', error);
//     }
//   };

//   const handleEdit = (company) => {
//     setEditingCompany(company);
//     setIsModalOpen(true);
//   };

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
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">Company Master</h1>
//           <div className="flex items-center space-x-4 mt-4 md:mt-0">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-72 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button onClick={() => { setEditingCompany(null); setIsModalOpen(true); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
//               + Add Company
//             </button>
//           </div>
//         </div>
//         {loading ? <div className="flex justify-center">Loading...</div> : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCompanies.map((item) => (
//               <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
//                 <div className="space-y-3">
//                   <p className="text-lg font-semibold text-gray-700">{item.companyName}</p>
//                   <p className="text-gray-600"><strong>Address:</strong> {item.address}</p>
//                   <p className="text-gray-600"><strong>GST:</strong> {item.gstNumber}</p>
//                   <p className="text-gray-600"><strong>State:</strong> {item.state}</p>
//                   <p className="text-gray-600"><strong>Alias:</strong> {item.alias}</p>
//                 </div>
//                 <div className="flex space-x-4 mt-4">
//                   <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
//                     <FaEdit className="text-white" />
//                     <span>Edit</span>
//                   </button>
//                   <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
//                     <FaTrashAlt className="text-white" />
//                     <span>Delete</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         <CompanyModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleSubmit}
//           editingCompany={editingCompany}
//         />
//       </div>
//     </div>
//   );
// };

// export default CompanyMaster;







