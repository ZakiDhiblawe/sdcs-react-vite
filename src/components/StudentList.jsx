import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const StudentList = ({ students, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Students List</h2>
      {students.length === 0 ? (
        <p className="text-gray-500">No students found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Age</th>
                  <th className="py-2 px-4 border">School Name</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{student.id}</td>
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border">{student.age}</td>
                    <td className="py-2 px-4 border">{student.schoolName}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onEdit(student)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => onDelete(student.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(students.length / studentsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;