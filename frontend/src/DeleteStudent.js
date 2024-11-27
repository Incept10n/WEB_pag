import React, { useState } from 'react';

const DeleteStudent = ({ onChange }) => {
    const [status, setStatus] = useState(null); 
    const [colorStatus, setColor] = useState("");
    const [idToDelete, setIdToDelete] = useState();

    const handleInputChange = (e) => {
        const { value } = e.target;
        setIdToDelete(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const response = await fetch(`${API_URL}/students/delete/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                setStatus('Student deleted successfully!');
                setColor('green');
                onChange(prev => prev - 1);
            } else {
                setStatus('Failed to delete student.');
                setColor('red');
            }
        } catch (error) {
            setStatus('Error occurred while deleting the student.');
            setColor('red');
        }
    };

    return (
        <div>
            <h2>Delete Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Enter the id of Student to delete:
                        <input
                            type="number"
                            name="id"
                            value={idToDelete}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Delete Student</button>
            </form>
            {status && <p style={{color: `${colorStatus}`}}>{status}</p>}
        </div>
    );
};

export default DeleteStudent;
