import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

const Download = () => {

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    
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
                `https://flask-backend-100322540002.us-central1.run.app/api/patient-media?given_name=${first}&family_name=${last}&gender=${gender}&birth_date=${dob}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);
            setResult([]);
            data.media.forEach(element => {
                const diagnosis = element.note.split(', ')[0].split('\": \"')[1].split('\"')[0];
                const confidence = element.note.split('\", \"')[1].split(': ')[1].split('}')[0];
                // The result contains the image path, diagnosis, and confidence of each image, stored in array format
                setResult(prevResults => [...prevResults, [`data:image/jpeg;base64,${element.data}`, diagnosis, confidence]]);
            });
            console.log(result);
        } catch(error) {
            console.error("Error downloading image(s):", error);
            alert("Failed to download image(s)");
        }
        setLoading(false)
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <h2>Download Patient Images</h2>
                    <form onSubmit={handleDownload}>
                    <div>
                        <Label htmlFor="first">Patient First Name</Label>
                        <Input id="first" type="text" value={first} onChange={(e) => setFirst(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="last">Patient Last Name</Label>
                        <Input id="last" type="text" value={last} onChange={(e) => setLast(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="dob">Patient Date of Birth</Label>
                        <Input id="dob" type="text" value={dob} onChange={(e) => setDob(e.target.value)} required/>
                    </div>
                    <div>
                        <Label htmlFor="gender">Patient Gender</Label>
                        <Input id="gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)} required/>
                    </div>
                    <div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Downloading..." : "Get Patient Images"}
                        </Button>
                    </div>
                    </form>
                    {result && (
                        <div>
                            <h3>Analysis Result:</h3>
                            {result && result.map((item, index) => (
                                <div key={index}>
                                    <p>{index + 1}: {item[2]} confidence of {item[1]}</p>
                                    <img src={item[0]}/>
                                </div>
                            ))};
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Download;