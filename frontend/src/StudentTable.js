import React, { useEffect, useState } from "react";
import "./StudentTable.css";

const StudentsTable = ({ someChange }) => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchStudents(currentPage, pageSize, sortBy, order);
  }, [currentPage, pageSize, sortBy, order, someChange]);

  const fetchStudents = async (page, size, sort, ord) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(
        `${API_URL}/students/filter?page=${page}&size=${size}&sort_by=${sort || ""}&order=${ord}`
      );
      const responseJson = await response.json();

      setStudents(responseJson.data);
      setTotal(responseJson.meta.total_records);
      console.log(responseJson.meta);
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc"); 
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <h1>Students Table</h1>
      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>id {sortBy === "id" ? (order === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("surname")}>surname {sortBy === "surname" ? (order === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("name")}>name {sortBy === "name" ? (order === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("patronymic")}>patronymic {sortBy === "patronymic" ? (order === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("course")}>course {sortBy === "course" ? (order === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("group")}>group {sortBy === "group" ? (order === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("faculty")}>faculty {sortBy === "faculty" ? (order === "asc" ? "↑" : "↓") : ""}</th>
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
