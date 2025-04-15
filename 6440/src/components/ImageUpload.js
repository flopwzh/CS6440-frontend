import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

export default function ImageUpload() {
  const [patientId, setPatientId] = useState("");
  const [file, setFile] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDoB] = useState("");
  const [gender, setGender] = useState("");
  const [creatingPatient, setCreatingPatient] = useState(false);
  const [creatingPatientandImage, setCreatingPatientandImage] = useState(false);
  const [patientAndImageCreationResult, setPatientAndImageCreationResult] = useState(null);
  const [creationResult, setCreationResult] = useState(null);

  const [image, setImage] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [mediaID, setMediaID] = useState("")

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file || !patientId) {
      alert("Please enter a patient ID and select an image.");
      return;
    }
    setAnalysisLoading(true);
    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://flask-backend-100322540002.us-central1.run.app/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data)
      setAnalysisResult(data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
    setAnalysisLoading(false);
  };

  const handlePatientCreation = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      alert("Please enter a valid name for the patient");
      return;
    }
    setCreatingPatient(true)
    const payload = {
      //"id": id,
      "name": [
        {
          "given": [firstName],
          "family": lastName
        }
      ]
    }

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
      console.log(data)
      setCreationResult(data);
    } catch (error) {
      console.error("Error creating patient: ", error);
      alert("Failed to create patient");
    }
    setCreatingPatient(false)
  }

  const handleImageDownload = async (e) => {
    e.preventDefault();
    if (!mediaID) {
      alert("Please enter a valid media ID")
      return;
    }

    setDownloading(true);
    try{
      const response = await fetch(
        `https://flask-backend-100322540002.us-central1.run.app/api/media/${mediaID}/download`,
        {
          method: "GET",
        }
      );
      const data = await response.json()
      const base64String = data.data
      console.log(data.data)
      const imageUrl = `data:image/jpeg;base64,${base64String}`
      setImage(imageUrl)
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image.")
    }
    setDownloading(false)
  }

  // handles patient + image creation
  const handlePatientImageCreation = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !dob || !gender || !file) {
      alert("Please enter a valid name, date of birth, and gender, and image for the patient");
      return;
    }
    setCreatingPatientandImage(true)

    const formData = new FormData();
    formData.append("given_name", firstName);
    formData.append("family_name", lastName);
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
      console.log(data)
      setPatientAndImageCreationResult(data);
    } catch (error) {
      console.error("Error creating patient and uploading image: ", error);
      alert("Failed to create patient and upload image");
    }
    setCreatingPatientandImage(false)
  }

  return (
    <div>
      {/* <Card className="p-4 max-w-md mx-auto mt-10">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Upload Skin Image</h2>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <div>
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Select Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <Button type="submit" disabled={analysisLoading} className="w-full">
              {analysisLoading ? "Uploading..." : "Analyze Image"}
            </Button>
          </form>
          {analysisResult && (
            <div className="mt-4 p-2 border rounded">
              <h3 className="font-medium">Analysis Result:</h3>
              <pre className="text-sm text-gray-600">{JSON.stringify(analysisResult, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* <Card className="p-4 max-w-md mx-auto mt-10">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Create Patient</h2>
          <form onSubmit={handlePatientCreation} className="space-y-4">
            <div>
              <Label htmlFor="firstName">Patient First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Patient Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={creatingPatient} className="w-full">
              {creatingPatient ? "Creating..." : "Create Patient"}
            </Button>
          </form>
          {creationResult && (
            <div className="mt-4 p-2 border rounded">
              <h3 className="font-medium">Analysis Result:</h3>
              <pre className="text-sm text-gray-600">{JSON.stringify(creationResult, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card> */}

      <Card className="p-4 max-w-md mx-auto mt-10">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Upload Skin Image</h2>
          <form onSubmit={handlePatientImageCreation} className="space-y-4">
          <div>
              <Label htmlFor="firstName">Patient First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Patient Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dob">Patient Date of Birth</Label>
              <Input
                id="dob"
                type="text"
                value={dob}
                onChange={(e) => setDoB(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Patient Gender</Label>
              <Input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Select Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <Button type="submit" disabled={creatingPatientandImage} className="w-full">
              {creatingPatientandImage ? "Uploading..." : "Analyze Image"}
            </Button>
          </form>
          {patientAndImageCreationResult && (
            <div className="mt-4 p-2 border rounded">
              <h3 className="font-medium">Analysis Result:</h3>
              <pre className="text-sm text-gray-600">{JSON.stringify(patientAndImageCreationResult, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="p-4 max-w-md mx-auto mt-10">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Download Image</h2>
          <form onSubmit={handleImageDownload} className="space-y-4">
            <div>
              <Label htmlFor="id">Media ID</Label>
              <Input
                id="mediaID"
                type="text"
                value={mediaID}
                onChange={(e) => setMediaID(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={downloading} className="w-full">
              {downloading ? "Downloading..." : "Download Image"}
            </Button>
          </form>
          {image && (
            <div className="mt-4 p-2 border rounded">
              <h3 className="font-medium">Image:</h3>
              <img src={image}/>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}