import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();
  
  const [datasets, setDatasets] = useState([
    { name: "Sales_Report_2023.csv", uploadedBy: "user1@example.com", date: "2025-04-25" },
    { name: "Customer_Data.json", uploadedBy: "admin@example.com", date: "2025-04-24" },
  ]);

  const [users, setUsers] = useState([
    { email: "user1@example.com", role: "user" },
    { email: "admin@example.com", role: "admin" },
  ]);

  const [search, setSearch] = useState("");
  const [editingDataset, setEditingDataset] = useState(null);
  const [newDatasetName, setNewDatasetName] = useState("");

  // Change role of a user
  const handleRoleChange = (email) => {
    setUsers(users.map(user =>
      user.email === email
        ? { ...user, role: user.role === "user" ? "admin" : "user" }
        : user
    ));
  };

  // Delete dataset
  const handleDeleteDataset = (index) => {
    const updated = [...datasets];
    updated.splice(index, 1);
    setDatasets(updated);
  };

  // Start renaming dataset
  const handleRenameStart = (index) => {
    setEditingDataset(index);
    setNewDatasetName(datasets[index].name);
  };

  // Confirm rename
  const handleRenameConfirm = (index) => {
    const updated = [...datasets];
    updated[index].name = newDatasetName;
    setDatasets(updated);
    setEditingDataset(null);
  };

  // Download Dataset (simulated by creating a text file)
  const handleDownloadDataset = (name) => {
    const element = document.createElement("a");
    const file = new Blob(["Simulated dataset content..."], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Delete user
  const handleDeleteUser = (email) => {
    const updated = users.filter(user => user.email !== email);
    setUsers(updated);
  };

  // Reset Password (simulated)
  const handleResetPassword = (email) => {
    alert(`Password reset link sent to ${email}`);
  };

  const filteredDatasets = datasets.filter(ds =>
    ds.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-[#E43D12] mb-6">Admin Panel</h2>
        <p className="text-gray-600 text-center mb-8">
          Manage datasets and users securely from the admin panel.
        </p>

        {/* Search Bar */}
        <div className="w-full mb-8">
          <input
            type="text"
            placeholder="Search Datasets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-3 rounded-md text-gray-700"
          />
        </div>

        {/* Uploaded Datasets */}
        <div className="w-full mb-10">
          <h3 className="text-2xl font-bold text-[#E43D12] mb-4 text-center">Uploaded Datasets</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">Dataset Name</th>
                  <th className="py-2 px-4 border">Uploaded By</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.map((dataset, index) => (
                    <tr key={index} className="text-center">
                      <td className="py-2 px-4 border">
                        {editingDataset === index ? (
                          <input
                            value={newDatasetName}
                            onChange={(e) => setNewDatasetName(e.target.value)}
                            className="border p-1 rounded-md"
                          />
                        ) : (
                          dataset.name
                        )}
                      </td>
                      <td className="py-2 px-4 border">{dataset.uploadedBy}</td>
                      <td className="py-2 px-4 border">{dataset.date}</td>
                      <td className="py-2 px-4 border space-x-2">
                        {editingDataset === index ? (
                          <button
                            onClick={() => handleRenameConfirm(index)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRenameStart(index)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                          >
                            Rename
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteDataset(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleDownloadDataset(dataset.name)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">No datasets found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manage Users */}
        <div className="w-full mb-10">
          <h3 className="text-2xl font-bold text-[#E43D12] mb-4 text-center">Manage Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border capitalize">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === "admin" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => handleRoleChange(user.email)}
                        className="bg-[#E43D12] text-white px-3 py-1 rounded-md hover:bg-opacity-80 transition"
                      >
                        {user.role === "user" ? "Promote" : "Demote"}
                      </button>
                      <button
                        onClick={() => handleResetPassword(user.email)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-[#E43D12] text-[#EBE9E1] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}





