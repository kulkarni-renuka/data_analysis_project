import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadDataset() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [mode, setMode] = useState("file"); // 'file' or 'manual'
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setManualInput(""); // reset manual input if switching
      setUploadMessage("");
    }
  };

  const handleUpload = () => {
    if (mode === "file") {
      if (!selectedFile) {
        setUploadMessage("Please select a dataset file first.");
        return;
      }
      setTimeout(() => {
        setUploadMessage(`"${selectedFile.name}" uploaded successfully!`);
        setSelectedFile(null);
      }, 1500);
    } else {
      if (!manualInput.trim()) {
        setUploadMessage("Please enter dataset data manually.");
        return;
      }
      setTimeout(() => {
        setUploadMessage("Manual data uploaded successfully!");
        setManualInput("");
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-[#E43D12] mb-4">Upload Dataset</h2>
        <p className="text-gray-600 text-center mb-4">Choose and upload your dataset to start analysis.</p>

        {/* Mode Toggle */}
        <div className="mb-6 w-full max-w-md">
          <label className="font-medium mr-2">Upload Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="file">Upload File</option>
            <option value="manual">Enter Manually</option>
          </select>
        </div>

        {/* File Upload */}
        {mode === "file" && (
          <>
            <input
              type="file"
              accept=".csv, .xlsx, .json"
              onChange={handleFileChange}
              className="mb-4 border p-2 rounded-md w-full max-w-md text-gray-700"
            />
            {selectedFile && (
              <p className="text-gray-700 mb-2">
                Selected file: <strong>{selectedFile.name}</strong>
              </p>
            )}
          </>
        )}

        {/* Manual Input */}
        {mode === "manual" && (
          <textarea
            placeholder="Enter CSV data here (e.g., name,age\nJohn,25\nJane,30)"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            rows={6}
            className="mb-4 border p-2 rounded-md w-full max-w-md text-gray-700"
          />
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="bg-[#E43D12] text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 mt-2"
        >
          Upload Dataset
        </button>

        {/* Upload Message */}
        {uploadMessage && (
          <p className="mt-4 text-lg font-medium text-gray-700">{uploadMessage}</p>
        )}

        {/* Back Button */}
        <button
          className="mt-6 bg-[#EBE9E1] text-[#E43D12] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300"
          onClick={() => navigate("/")}
        >
          Back to Home page
        </button>
      </div>
    </div>
  );
}












