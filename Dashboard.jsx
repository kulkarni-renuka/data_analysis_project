import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 w-full">
      <h1 className="text-5xl font-bold text-[#E43D12] mb-6 w-full text-center">Welcome!</h1>
      <p className="text-center text-lg text-gray-700 mb-8 w-3/4">
        Welcome to Data Visualization & Analytics platform – a powerful platform that helps you analyze datasets using AI-driven insights.
      </p>

      <Link to="/signup" className="mb-10 bg-[#EBE9E1] text-[#E43D12] px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300">
        Sign Up
      </Link>

      <div className="grid grid-cols-1 gap-6 py- w-full max-w-3xl">
        {/* Upload Dataset */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold text-[#E43D12] mb-2">Upload Dataset</h2>
          <p className="text-gray-600 text-center mb-4">Easily upload your dataset and start analyzing it with AI.</p>
          <Link to="/upload" className="bg-[#E43D12] text-[#EBE9E1] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 text-center">
            Get Started
          </Link>
        </div>

        {/* AI Insights */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold text-[#E43D12] mb-2">AI Insights</h2>
          <p className="text-gray-600 text-center mb-4">Gain powerful insights from AI-driven data analysis.</p>
          <Link to="/insights" className="bg-[#E43D12] text-[#EBE9E1] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 text-center">
            Explore Insights
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold text-[#E43D12] mb-2">Real time AI Insights</h2>
          <p className="text-gray-600 text-center mb-4">Gain powerful real time insights from AI-driven data analysis.</p>
          <Link to="/ai-insights2" className="bg-[#E43D12] text-[#EBE9E1] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 text-center">
            Explore Insights 
          </Link>
        </div>

        {/* Admin Panel */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full">
          <h2 className="text-xl font-semibold text-[#E43D12] mb-2">Admin Panel</h2>
          <p className="text-gray-600 text-center mb-4">Manage your data, users, and settings from the admin panel.</p>
          <Link to="/admin" className="bg-[#E43D12] text-[#EBE9E1] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300 text-center">
            Access Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}



