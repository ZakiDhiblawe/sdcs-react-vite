import axios from 'axios';

const API_URL = 'http://localhost:8080/api/student';

const getAllStudents = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

const createStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/create`, studentData);
  return response.data;
};

const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, studentData);
  return response.data;
};

const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};

const studentService = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;