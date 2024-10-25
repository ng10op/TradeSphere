# TradeSphere: Stock Analysis Web Scraping Project

## Overview

TradeSphere is a web-based application designed for stock analysis, utilizing web scraping to collect, analyze, and visualize stock market data. The platform aims to assist investors in making informed decisions by providing real-time data collection, analysis, and visualization tools.

## Features

- **Real-time Stock Data**: Collects and displays up-to-date stock market information.
- **Comprehensive Stock Analysis**: Offers various technical indicators for thorough stock evaluation.
- **User-Friendly Interface**: Built with React and Tailwind CSS for an engaging user experience.
- **Dynamic Charts**: Interactive stock charts powered by AnyChart for visual analysis.
- **User Authentication**: Secure login and registration system using JWT for user management.
- **News Section**: Keeps users updated with the latest stock market news.

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - BootStrap
- **Backend**:

  - Express for the server
  - Selenium for web scraping

- **Database**:
  - MongoDB (for storing stock data and user information)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ng10op/TradeSphere.git
   cd TradeSphere
   ```

2. Navigate to the frontend directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Set up the backend:

   ```bash
   cd backend
   npm install
   ```

### Environment Setup

1. Create a file named .env in your backend folder.

2. Add the following environment variables to your .env file:

   ```bash
   PORT = 8000
   MONGO_DB_URI = <your_mongodb_atlas_connection_string>
   NODE_ENV = development
   JWT_SECRET = <your_jwt_secret>
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application:

   Open your web browser and go to http://localhost:5173 to view the application.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
