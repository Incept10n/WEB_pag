import React, { useEffect, useState } from "react";
import "./StudentTable.css"

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    fetchStudents(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchStudents = async (page, size) => {
    try {
      const response = await fetch(`http://localhost:8000/students?page=${page}&size=${size}`);
      const responseJson = await response.json();

      setStudents(responseJson.data);
      setTotal(responseJson.meta.total_records);
      console.log(responseJson.meta)
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1); 
  };

  
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <h1>Students Table</h1>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>surname</th>
            <th>name</th>
            <th>patronymic</th>
            <th>course</th>
            <th>group</th>
            <th>faculty</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.surname}</td>
              <td>{student.name}</td>
              <td>{student.patronymic}</td>
              <td>{student.course}</td>
              <td>{student.group}</td>
              <td>{student.faculty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <label>
          Page Size:
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsTable;
