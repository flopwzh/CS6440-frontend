import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

import "./Upload.css"

const Upload = () => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [result, setResult] = useState("");
    const [confidence, setConfidence] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [exists, setExists] = useState("");

    const handleUpload = async(e) => {
        e.preventDefault();
        if (!file) {
            alert("Please choose a file to upload");
            return;
        } else if (!first || !last) {
            alert("Please enter a first and last name");
            return;
        } else if (!dob) {
            alert("Please enter a date of birth");
            return;
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
            alert("please enter a valid date of birth");
            return;
        } else if (!gender) {
            alert("Please enter a gender");
            return;
        } else if (gender !== "male" && gender !== "female") {
            alert("Please enter a valid gender");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("given_name", first);
        formData.append("family_name", last);
        formData.append("gender", gender);
        formData.append("birth_date", dob);
        formData.append("image", file)

        try {
            const response = await fetch(
                "https://flask-backend-100322540002.us-central1.run.app/api/patient-analysis",
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await response.json();
            console.log(data);
            //setResult(data);
            setConfidence(data["diagnosis"]["confidence"]);
            setDiagnosis(data["diagnosis"]["diagnosis"]);
            setExists(data["patient"]["exists"]);
        } catch(error) {
            console.error("Error uploading image:", error);
            alert("Failed to create patient or upload image");
        }
        setLoading(false);
        
    }

    return (
        <div>
            <Card className="upload-container">
                <CardContent>
                    <h2>Upload Skin Image</h2>
                    <form onSubmit={handleUpload} className="upload-form">
                    <div>
                        <Label htmlFor="first">Patient First Name</Label>
                        <Input id="first" type="text" value={first} autocomplete="off" onChange={(e) => setFirst(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="last">Patient Last Name</Label>
                        <Input id="last" type="text" value={last} autocomplete="off" onChange={(e) => setLast(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="dob">Patient Date of Birth</Label>
                        <Input id="dob" type="text" value={dob} autocomplete="off" onChange={(e) => setDob(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="gender">Patient Gender</Label>
                        <Input id="gender" type="text" value={gender} autocomplete="off" onChange={(e) => setGender(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="file">Select Image</Label>
                        <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required/>
                    </div>
                    <div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Uploading..." : "Analyze Image"}
                        </Button>
                    </div>
                    </form>
                    {diagnosis && confidence && (
                        <div>
                            <h3>Analysis Result:</h3>
                            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
                            {exists ? (
                                <p>Matching patient found in database!</p>
                            ) : (
                                <p>No patient found, created new patient!</p>
                            )
                            }
                            <p>Diagnosis: {diagnosis}</p>
                            <p>Confidence: {confidence}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Upload;