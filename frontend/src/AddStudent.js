import React, { useState } from "react";

const AddStudent = () => {
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        patronymic: "",
        course: "",
        group: "",
        faculty: "",
    });
    const [responseMessage, setResponseMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage("");
        setErrorMessage("");

        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const response = await fetch(`${API_URL}/students/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setResponseMessage("Student added successfully!");
            console.log("Response:", data);
        } catch (error) {
            setErrorMessage(`Failed to add student: ${error.message}`);
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Surname:
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Patronymic:
                        <input
                            type="text"
                            name="patronymic"
                            value={formData.patronymic}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Course:
                        <input
                            type="number" 
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Group:
                        <input
                            type="text" 
                            name="group"
                            value={formData.group}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Faculty:
                        <input
                            type="text" 
                            name="faculty"
                            value={formData.faculty}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Student</button>
            </form>
            {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
};

export default AddStudent;
