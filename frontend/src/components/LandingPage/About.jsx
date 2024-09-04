import React from "react";

const data = {
  paragraph:
    "At TradeSphere, we provide accurate and timely stock market data using advanced web scraping technology. Our goal is to help you make informed investment decisions with real-time insights and comprehensive analysis.",
  Why: [
    "Real-Time Data: Stay updated with the latest market info.",
    "Comprehensive Analysis: Access detailed stock metrics.",
    "User-Friendly Interface: Navigate and find data easily.",
    "Reliable Insights: Trustworthy information for your strategies.",
  ],
  Why2: [
    "Advanced Technology: Cutting-edge web scraping techniques.",
    "Expert Team: Professionals dedicated to market analysis.",
    "Continuous Improvement: Regular updates for accuracy.",
    "Customer Support: Assistance when you need it.",
  ],
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="row">
          <div className="col-12 col-md-6 mb-6">
            <img
              src="images/about_img.jpg"
              className="img-fluid w-full rounded-lg shadow-lg"
              alt="About Us"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="about-text">
              <h2 className="text-3xl font-bold mb-4 relative">
                About Us
                <span className="absolute left-0 bottom-[-4px] bg-gradient-to-r from-blue-400 to-indigo-600 h-1 w-16 transform translate-y-1"></span>
              </h2>

              <p className="text-lg leading-7 mb-8">{data.paragraph}</p>
              <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 mb-4">
                  <ul className="list-disc pl-5">
                    {data.Why.map((d, i) => (
                      <li key={`${d}-${i}`} className="mb-2 flex items-center">
                        <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 mb-4">
                  <ul className="list-disc pl-5">
                    {data.Why2.map((d, i) => (
                      <li key={`${d}-${i}`} className="mb-2 flex items-center">
                        <i className="fa-solid fa-check-circle text-blue-400 mr-2"></i>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
