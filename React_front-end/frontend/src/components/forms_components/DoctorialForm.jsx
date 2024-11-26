import React, { useState } from "react";

const DoctorialForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        board: "",
        marks: "",
        total_marks: "",
        result_date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass data to the parent or API
    };

    return (
       <div className="p-4 border rounded bg-light">
        <h2> Phd Data</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label">Degree title</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
            />
            </div>
            <div className="mb-3">
        <label className="form-label">Board name </label>
            <input
                type="text"
                name="board"
                value={formData.board}
                onChange={handleChange}
                placeholder="Board"
            />
             </div>
            <div className="mb-3">
        <label className="form-label">Marks</label>
            <input
                type="number"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                placeholder="Marks"
            />
             </div>
            <div className="mb-3">
        <label className="form-label">Total marks</label>
            <input
                type="number"
                name="total_marks"
                value={formData.total_marks}
                onChange={handleChange}
                placeholder="Total Marks"
            />
             </div>
            <div className="mb-3">
        <label className="form-label">Result Date</label>
            <input
                type="date"
                name="result_date"
                value={formData.result_date}
                onChange={handleChange}
            />
            </div>
            <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        </form></div>
    );
};

export default DoctorialForm;
