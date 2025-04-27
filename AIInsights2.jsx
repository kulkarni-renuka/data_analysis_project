import React, { useEffect, useState } from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Tailwind-style palette (anchored by your red accent)
const COLORS = [
  '#E43D12', // red-600
  '#06B6D4', // sky-500
  '#FACC15', // yellow-400
  '#4ADE80', // green-400
  '#60A5FA', // blue-400
  '#818CF8', // indigo-400
  '#A78BFA', // purple-400
  '#F472B6', // pink-400
  '#FB7185', // rose-400
  '#9CA3AF', // gray-400
  '#FBBF24', // amber-400
  '#A3E635', // lime-400
];

function AIInsights2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    ws.onmessage = (e) => setData(JSON.parse(e.data));
    return () => ws.close();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl flex flex-col items-center space-y-12">
        
        {/* Header */}
        <h2 className="text-3xl font-semibold text-[#E43D12]">
          Instagram Usage Insights
        </h2>
        <p className="text-gray-600 text-center">
          Real-time graphical insights based on Instagram users’ monthly usage data.
        </p>

        {/* Line Chart */}
        <div className="w-full h-80">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Monthly Usage – Line Chart
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="usageHours"
                stroke="#F97316"      // orange-500 line color
                strokeWidth={2}
                dot={({ cx, cy, index }) => (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={COLORS[index % COLORS.length]}
                  />
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-80 mt-8">  {/* added mt-8 for extra space above */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Monthly Usage – Bar Chart
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usageHours" fill="#F97316" barSize={30}>
                {data.map((entry, idx) => (
                  <Cell
                    key={`bar-cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full h-80 mt-8">  
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Usage Share – Pie Chart
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="usageHours"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={`pie-cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default AIInsights2;




