import React, { useState } from "react";
import axios from "axios";

const ExperiencePicsForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        duration: "",
        docscan: null,
    });

    const [imagePreview, setImagePreview] = useState(null); // State for image preview

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Update formData for text and file inputs
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });

        // If it's the docscan file input, create the image preview
        if (name === "docscan" && files) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the preview
            };

            if (file) {
                reader.readAsDataURL(file); // Read file as base64 string
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("duration", formData.duration);
        if (formData.docscan) {
            data.append("docscan", formData.docscan);
        }

        try {
            const response = await axios.post("/api/experiencepics/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Experience pics submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting experience pics:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Experience Pictures</h3>
            <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Duration:</label>
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Document Scan:</label>
                <input
                    type="file"
                    name="docscan"
                    onChange={handleChange}
                    accept="image/*, .pdf"
                />
            </div>

            {/* Display the image preview */}
            {imagePreview && (
                <div className="image-preview">
                    <p>Preview:</p>
                    <img
                        src={imagePreview}
                        alt="Document Preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </div>
            )}

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ExperiencePicsForm;
