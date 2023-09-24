import React, { useState, useEffect } from "react";
import "./Addproject.scss";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export default function AddProject() {
    const [project, setProject] = useState({
        title: "",
        description: "",
        tech_used: [],
        domain: [],
        contributors_active: 0,
        contributors_needed: 0,
        date_started: "",
        user_id: 0,
    });

    const [submissionMessage, setSubmissionMessage] = useState(null);

    useEffect(() => {
        // When the component mounts, retrieve and decode the access_token
        const access_token = Cookies.get("accesstoken");

        if (access_token) {
            try {
                const decodedToken = jwt_decode(access_token);
                const user_id = decodedToken.user_id;

                // Update the user_id in the project state
                setProject((prevProject) => ({ ...prevProject, user_id }));
            } catch (error) {
                console.error("Error decoding access token:", error);
            }
        } else {
            console.error("Access Token not found.");
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "tech_used" || name === "domain") {
            // Split the input value by commas
            const valueArray = value.split(',').map(item => item.trim());
    
            setProject((prevProject) => ({
                ...prevProject,
                [name]: valueArray,
            }));
        } else {
            setProject((prevProject) => ({
                ...prevProject,
                [name]: value,
            }));
        }
    };
    

    const handleAddProject = () => {
        // Make the POST request with the updated project data
        fetch('http://157.245.129.71:8000/projects', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response or perform any additional actions
                console.log("Project added successfully:", data);
                setProject({
                    title: "",
                    description: "",
                    tech_used: [],
                    domain: [],
                    contributors_active: 0,
                    contributors_needed: 0,
                    date_started: "",
                    user_id: 0,
                });
                setSubmissionMessage("Project added successfully");
            })
            .catch((error) => {
                // Handle any errors
                console.error("Error adding project:", error);
            });
    };

    const handleCancel = () => {
        setProject({
            title: "",
            description: "",
            tech_used: [],
            domain: [],
            contributors_active: 0,
            contributors_needed: 0,
            date_started: "",
            user_id: 0,
        });
    };

    return (
        <div className="main_add_project">
            <h2>Add Project</h2>
            <div className="project_details">
                {/* Input fields for project data */}
                <div className="input_con">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={project.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input_con textarea_con">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={project.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input_con">
                    <label htmlFor="tech_used">Tech Used (comma-separated)</label>
                    <input
                        type="text"
                        id="tech_used"
                        name="tech_used"
                        value={project.tech_used.join(",")}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input_con">
                    <label htmlFor="domain">Domain (comma-separated)</label>
                    <input
                        type="text"
                        id="domain"
                        name="domain"
                        value={project.domain.join(",")}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input_con">
                    <label htmlFor="contributors_active">Contributors Active</label>
                    <input
                        type="number"
                        id="contributors_active"
                        name="contributors_active"
                        value={project.contributors_active}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input_con">
                    <label htmlFor="contributors_needed">Contributors Needed</label>
                    <input
                        type="number"
                        id="contributors_needed"
                        name="contributors_needed"
                        value={project.contributors_needed}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input_con">
                    <label htmlFor="date_started">Date Started</label>
                    <input
                        type="date"
                        id="date_started"
                        name="date_started"
                        value={project.date_started}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Buttons */}
                <div className="input_con button_con">
                    <button onClick={handleAddProject}>Add Project</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
                {/* Submission message */}
                {submissionMessage && (
                    <div className="submission_message success">
                        <span>&#10004;</span>
                        <p>{submissionMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
