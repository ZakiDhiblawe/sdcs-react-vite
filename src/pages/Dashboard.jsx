import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import studentService from '../services/studentService';
import authService from '../services/authService';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      fetchStudents();
    }
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleCreate = () => {
    setCurrentStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      if (currentStudent) {
        await studentService.updateStudent(currentStudent.id, studentData);
      } else {
        await studentService.createStudent(studentData);
      }
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Management</h1>
          <button
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
        </div>
        {showForm ? (
          <div className="mb-6">
            <StudentForm
              student={currentStudent}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        ) : null}
        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;