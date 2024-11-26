import React, { useState } from "react";
import axios from "axios";

const DocumentPicsForm = () => {
    const [formData, setFormData] = useState({
        picture: null,
        matric: null,
        inter: null,
        bachlor: null,
        master: null,
        mphil: null,
        doctor: null,
        cnic_front: null,
        cnic_back: null,
        upload_cv: null,
        Father_cnic: null,
    });

    const [imagePreviews, setImagePreviews] = useState({
        picture: null,
        matric: null,
        inter: null,
        bachlor: null,
        master: null,
        mphil: null,
        doctor: null,
        cnic_front: null,
        cnic_back: null,
        upload_cv: null,
        Father_cnic: null,
    });

    const handleChange = (e) => {
        const { name, files } = e.target;

        // Update formData for file
        setFormData({
            ...formData,
            [name]: files[0],
        });

        // Update image preview
        if (files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreviews({
                    ...imagePreviews,
                    [name]: reader.result, // Set preview for the file
                });
            };

            if (file) {
                reader.readAsDataURL(file); // Read file as base64 URL
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append files to FormData
        for (const key in formData) {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post("/api/documentpics/", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Document pics submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting document pics:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Document Pictures</h3>
                {["picture", "matric", "inter", "bachlor", "master", "mphil", "doctor", "cnic_front", "cnic_back", "upload_cv", "Father_cnic"].map((field) => (
                    <div key={field}>
                        <div className="mb-3">
                            <label className="form-label">{field.replace("_", " ").toUpperCase()}:</label>
                            <input
                                type="file"
                                name={field}
                                onChange={handleChange}
                                accept="image/*, .pdf"
                            />
                        </div>
                     <div className="image">
                        {/* Display image preview if available */}
                        {imagePreviews[field] && (
                            <div className="image-preview">
                                <p>Preview:</p>
                                <img
                                    src={imagePreviews[field]}
                                    alt={`${field} preview`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            </div>
                        )}
                        </div>
                        <hr />
                    </div>
                ))}

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DocumentPicsForm;
