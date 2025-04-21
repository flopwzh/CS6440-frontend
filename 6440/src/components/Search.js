import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

import "./Download.css"

const Download = () => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    
    const handleDownload = async(e) => {
        e.preventDefault();
        if (!first || !last) {
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
        setLoading(true)
        const formData = new FormData();
        formData.append("given_name", first);
        formData.append("family_name", last);
        formData.append("gender", gender);
        formData.append("birth_date", dob);
        
        try{
            const response = await fetch(
                `https://flask-backend-100322540002.us-central1.run.app/api/patient-search?given_name=${first}&family_name=${last}&gender=${gender}&birth_date=${dob}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);
            setResult(data);
        } catch(error) {
            console.error("Error downloading image(s):", error);
            alert("Failed to download image(s)");
        }
        setLoading(false)
    }

    return (
        <div>
            <Card className="download-container">
                <CardContent>
                    <h2>Search for Patient</h2>
                    <form onSubmit={handleDownload} className="download-form">
                    <div>
                        <Label htmlFor="first">Patient First Name</Label>
                        <Input id="first" type="text" value={first} autoComplete="off" onChange={(e) => setFirst(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="last">Patient Last Name</Label>
                        <Input id="last" type="text" value={last} autoComplete="off" onChange={(e) => setLast(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="dob">Patient Date of Birth</Label>
                        <Input id="dob" type="text" value={dob} autoComplete="off" onChange={(e) => setDob(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="gender">Patient Gender</Label>
                        <Input id="gender" type="text" value={gender} autoComplete="off" onChange={(e) => setGender(e.target.value)} required/>
                    </div>
                    <div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Downloading..." : "Get Patient"}
                        </Button>
                    </div>
                    </form>
                    {result && (
                        <div>
                            <h3>Found Patient:</h3>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Download;