import React from "react";

const featuresData = [
  {
    icon: "fa-solid fa-chart-line",
    title: "Real-Time Data",
    text: "Access up-to-the-minute stock market data to stay ahead of market trends and make informed investment decisions.",
  },
  {
    icon: "fa-solid fa-database",
    title: "Comprehensive Analysis",
    text: "Utilize advanced algorithms to analyze historical and real-time data, offering insights into stock performance and trends.",
  },
  {
    icon: "fa-solid fa-chart-bar",
    title: "Stock Performance",
    text: "Visualize stock data with standard charts to track market fluctuations and performance.",
  },
  {
    icon: "fa-solid fa-search",
    title: "Detailed Search",
    text: "Easily search for specific stocks or data points to get targeted information and make precise decisions.",
  },
];

const Features = () => {
  return (
    <div id="features" className="py-16">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4 relative inline-block">
            Features
            <span className="absolute left-1/2 bottom-[-6px] transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-600 h-1 w-16"></span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {featuresData.map((d, i) => (
            <div
              key={`${d.title}-${i}`}
              className="w-full md:w-1/2 lg:w-1/4 p-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white mb-4 shadow-lg">
                  <i className={`${d.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{d.title}</h3>
                <p className="text-gray-600">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
