import React from "react";

const data = [
  {
    img: "images/Testimonial/warren-buffet.jpeg",
    text: "TradeSphere's cutting-edge technology and real-time data are indispensable for navigating the complexities of the stock market.",
    name: "Warren Buffett",
  },
  {
    img: "images/Testimonial/elon-musk.jpeg",
    text: "The comprehensive tools and accurate analysis provided by TradeSphere have significantly enhanced my investment strategy.",
    name: "Elon Musk",
  },
  {
    img: "images/Testimonial/ambani.jpeg",
    text: "TradeSphere's user-friendly platform and reliable data make it a valuable resource for any serious investor.",
    name: "Mukesh Ambani",
  },
  {
    img: "images/Testimonial/rakesh.jpg",
    text: "The insights and detailed analysis from TradeSphere have been crucial in refining my investment approach.",
    name: "Rakesh Jhunjhunwala",
  },
  {
    img: "images/Testimonial/jeff-bezoz.jpeg",
    text: "TradeSphere offers a robust set of tools for tracking and analyzing stock market trends, making it an essential part of my investment toolkit.",
    name: "Jeff Bezos",
  },
  {
    img: "images/Testimonial/mark.jpeg",
    text: "With its advanced features and accurate data, TradeSphere has become a key resource for making informed investment decisions.",
    name: "Mark Zuckerberg",
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="py-24 bg-gray-100">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 relative inline-block text-center">
            What our clients say
            <span className="absolute left-1/2 bottom-[-8px] transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-600 h-1 w-20 rounded-full"></span>
          </h2>
        </div>
        <div className="row flex flex-wrap">
          {data.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center h-64 hover:shadow-xl transition-shadow duration-200">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="italic text-gray-700 mb-2">{`"${d.text}"`}</p>
                  <div className="font-semibold text-gray-600">- {d.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
