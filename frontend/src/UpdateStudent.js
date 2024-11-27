import React, { useState } from 'react';

const UpdateStudent = ({ onChange }) => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState({
    surname: '',
    name: '',
    patronymic: '',
    course: '',
    group: '',
    faculty: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/students/update/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage('Student updated successfully!');
        setErrorMessage('');
        onChange(prev => prev + 1)
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || 'Failed to update the student.');
        setResponseMessage('');
      }
    } catch (error) {
      setResponseMessage('');
      setErrorMessage('An error occurred while updating the student.');
    }
  };

  return (
    <div>
      <h2>Update Student</h2>
      <form onSubmit={handleUpdateStudent}>
        <div>
          <label>Student ID:</label>
          <input
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={studentData.surname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Patronymic:</label>
          <input
            type="text"
            name="patronymic"
            value={studentData.patronymic}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="number"
            name="course"
            value={studentData.course}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Group:</label>
          <input
            type="text"
            name="group"
            value={studentData.group}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Faculty:</label>
          <input
            type="text"
            name="faculty"
            value={studentData.faculty}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Student</button>
      </form>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default UpdateStudent;
