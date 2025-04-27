Data Analysis Platform using AI
Welcome to the Data Analysis Platform – a dynamic and intuitive web application designed to help users visualize complex data effortlessly! The platform supports role-based access (User/Admin) and a seamless authentication system powered by JWT (JSON Web Tokens).
________________________________________
Features
•	User Authentication (Signup /Login)
o	Role-based Access (User & Admin)
o	Secure sessions using JWT
•	Interactive Dashboard
o	Personalized for each role
o	Real-time data updates
•	Data Visualization
o	Graphs, Charts, and Tables
o	Visualize performance and metrics easily
•	Admin Controls
o	Manage users and data
o	Access extended visualization tools
•	Responsive Design
o	Optimized for Desktop, Tablet, and Mobile devices
________________________________________
Tech Stack
•	Frontend: ReactJS, Tailwind CSS, Recharts
•	Backend: Node.js, Express.js
•	Authentication: JWT (JSON Web Tokens)
•	Database: MongoDB
•	Visualization Libraries: Recharts, Chart.js
________________________________________
Project Structure
/frontend/
 /src/
  /public/
  /package.json

backend/
 /routes/
 /server.js
 /.env 
________________________________________
Installation & Setup Instructions
1.	Clone the repository:
git clone https://github.com/kulkarni-renuka/data_analysis_project.git
cd data_analysis_project 
Install dependencies for client and server:
cd frontend
npm install

cd server
npm install

2.	Create .env file in /server and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

4.	Run the server and client:
# In /server
npm run dev

# In /frontend
npm start
________________________________________
Pages Overview
Page	Description
/login	Login page for Users and Admins
/signup	Registration page for new users
/dashboard	Personalized dashboard based on user role
/admin	Admin dashboard with additional controls
/visualize	View and interact with different datasets
________________________________________
Future Enhancements
•	Integration with external APIs (for live datasets)
•	Export visualizations as PDF or PNG
•	Dark Mode Support
•	Advanced Analytics (AI Insights)
________________________________________
Contact
Made by Renuka Kulkarni
Email: renukulkarni4545@gmail.com


