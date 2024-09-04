import React from "react";

const data = {
  Services: [
    {
      icon: "fa fa-chart-line",
      name: "Real-Time Data",
      text: "Access the latest stock market information to stay on top of market trends.",
    },
    {
      icon: "fa fa-database",
      name: "Comprehensive Analysis",
      text: "Analyze historical and real-time data for in-depth stock performance insights.",
    },
    {
      icon: "fa fa-search",
      name: "Detailed Search",
      text: "Easily search for specific stocks or data points for precise information.",
    },
    {
      icon: "fa fa-chart-bar",
      name: "Market Trends",
      text: "Visualize market trends with clear, standard charts for better understanding.",
    },
    {
      icon: "fa fa-cogs",
      name: "Advanced Tools",
      text: "Utilize advanced tools and algorithms for enhanced data analysis and decision-making.",
    },
    {
      icon: "fa fa-user-shield",
      name: "Secure Access",
      text: "Ensure your data and personal information are protected with secure access controls.",
    },
  ],
};

const Services = () => {
  return (
    <div
      id="services"
      className="py-24 bg-gradient-to-r from-blue-600 to-blue-400 text-white"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold relative inline-block">
            Our Services
            <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-blue-300 h-1 w-16 rounded-full mt-2"></span>
          </h2>

          <p className="mt-4 text-lg text-opacity-75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className="row">
          {data.Services && data.Services.length > 0
            ? data.Services.map((service, i) => (
                <div
                  key={`${service.name}-${i}`}
                  className="col-md-4 mb-12 flex flex-col items-center text-center"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white w-32 h-32 flex items-center justify-center rounded-full mb-4 shadow-md">
                    <i className={`text-3xl ${service.icon}`}></i>
                  </div>
                  <div className="service-desc">
                    <h3 className="text-xl font-medium mb-2">{service.name}</h3>
                    <p className="text-opacity-75">{service.text}</p>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
export default Services;
