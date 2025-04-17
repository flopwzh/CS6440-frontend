import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

import "./Create.css";

const Create = () => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleCreation = async(e) => {
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
        setLoading(true);
        const payload = {
            "name": [
                {
                    "given": [first],
                    "family": last
                }
            ],
            "gender": gender,
            "birthDate": dob
        };

        try {
            const response = await fetch(
                "https://flask-backend-100322540002.us-central1.run.app/api/patients",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );
            const data = await response.json();
            console.log(data);
            setResult(data);
        } catch (error) {
            console.error("Error creating patient: ", error);
            alert("Failed to create patient");
        }
        setLoading(false);
    }

    return (
        <div>
            <Card className="create-container">
                <CardContent>
                    <h2>Create Patient</h2>
                    <form onSubmit={handleCreation} className="create-form">
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
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating Patient..." : "Create Patient"}
                        </Button>
                    </div>
                    </form>
                    {result && (
                        <div>
                            <h3>Created patient:</h3>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Create;