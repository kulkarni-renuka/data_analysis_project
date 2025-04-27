import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

// Sample dataset
const salesData = [
  { month: "Jan", sales: 50, adSpend: 10, customers: 200 },
  { month: "Feb", sales: 55, adSpend: 12, customers: 220 },
  { month: "Mar", sales: 53, adSpend: 11, customers: 215 },
  { month: "Apr", sales: 60, adSpend: 14, customers: 250 },
  { month: "May", sales: 65, adSpend: 16, customers: 270 },
  { month: "Jun", sales: 80, adSpend: 20, customers: 310 },
  { month: "Jul", sales: 90, adSpend: 25, customers: 350 },
  { month: "Aug", sales: 85, adSpend: 22, customers: 340 },
  { month: "Sep", sales: 95, adSpend: 28, customers: 390 },
  { month: "Oct", sales: 105, adSpend: 30, customers: 420 },
  { month: "Nov", sales: 110, adSpend: 35, customers: 450 },
  { month: "Dec", sales: 120, adSpend: 40, customers: 480 },
];

export default function AIInsights() {
  const navigate = useNavigate();
  const [predictedSales, setPredictedSales] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [correlation, setCorrelation] = useState(null);

  useEffect(() => {
    predictSalesTrend();
    detectAnomalies();
    calculateCorrelation();
  }, []);

  // Predicting future sales using linear regression (basic trend estimation)
  const predictSalesTrend = () => {
    let lastSales = salesData[salesData.length - 1].sales;
    let growthRate = (salesData[salesData.length - 1].sales - salesData[0].sales) / salesData.length;
    
    let predictions = [];
    for (let i = 1; i <= 3; i++) {
      predictions.push({ month: `+${i}M`, sales: Math.round(lastSales + i * growthRate) });
    }
    setPredictedSales(predictions);
  };

  // Detecting anomalies using Z-score method
  const detectAnomalies = () => {
    let mean = salesData.reduce((sum, d) => sum + d.sales, 0) / salesData.length;
    let variance = salesData.reduce((sum, d) => sum + Math.pow(d.sales - mean, 2), 0) / salesData.length;
    let stdDev = Math.sqrt(variance);

    let detected = salesData.filter(d => Math.abs((d.sales - mean) / stdDev) > 2);
    setAnomalies(detected);
  };

  // Calculating correlation (Ad Spend vs Sales) using Pearson correlation
  const calculateCorrelation = () => {
    let n = salesData.length;
    let sumX = salesData.reduce((sum, d) => sum + d.adSpend, 0);
    let sumY = salesData.reduce((sum, d) => sum + d.sales, 0);
    let sumXY = salesData.reduce((sum, d) => sum + d.adSpend * d.sales, 0);
    let sumX2 = salesData.reduce((sum, d) => sum + Math.pow(d.adSpend, 2), 0);
    let sumY2 = salesData.reduce((sum, d) => sum + Math.pow(d.sales, 2), 0);

    let numerator = n * sumXY - sumX * sumY;
    let denominator = Math.sqrt((n * sumX2 - Math.pow(sumX, 2)) * (n * sumY2 - Math.pow(sumY, 2)));
    setCorrelation((numerator / denominator).toFixed(2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-[#E43D12] mb-4">AI Insights</h2>
        <p className="text-gray-600 text-center mb-6">Gain powerful insights from AI-driven data analysis.</p>

        {/* Bar Chart - Monthly Sales */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#E43D12" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Sales Growth */}
        <div className="w-full h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[...salesData, ...predictedSales]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#E43D12" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Sales Distribution */}
        <div className="w-full h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={salesData} dataKey="sales" nameKey="month" fill="#E43D12" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Section */}
        <div className="mt-6 text-gray-700 text-center">
          <p><strong>Predicted Next 3 Months Sales:</strong> {JSON.stringify(predictedSales)}</p>
          <p><strong>Anomalies:</strong> {anomalies.length > 0 ? JSON.stringify(anomalies) : "None detected"}</p>
          <p><strong>Correlation (Ad Spend vs Sales):</strong> {correlation}</p>
        </div>

        {/* Back Button */}
        <button 
          className="mt-6 bg-[#E43D12] text-[#EBE9E1] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition duration-300"
          onClick={() => navigate("/")}
        >
          Back to Home page
        </button>
      </div>
    </div>
  );
}






