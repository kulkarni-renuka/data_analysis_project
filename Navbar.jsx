import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#E43D12] text-[#EBE9E1] py-4 px-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">Data Visualization & Analytics</h1>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
        {/* <Link to="/admin" className="hover:text-gray-300 transition duration-300">Admin</Link> */}
        <Link to="/signup" className="bg-[#EBE9E1] text-[#E43D12] px-4 py-1.5 rounded-md font-semibold hover:bg-opacity-80 transition duration-300">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}




  