import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

export default function ImageUpload() {
  const [patientId, setPatientId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !patientId) {
      alert("Please enter a patient ID and select an image.");
      return;
    }
    setLoading(true);
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
      setResult(data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
    setLoading(false);
  };

  return (
    <Card className="p-4 max-w-md mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Upload Skin Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Uploading..." : "Analyze Image"}
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-2 border rounded">
            <h3 className="font-medium">Analysis Result:</h3>
            <pre className="text-sm text-gray-600">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
