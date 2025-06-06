import React from "react";

const data = [
  {
    img: "/Naman_pic.jpg",
    name: "Naman Gosain",
    job: "Director",
  },
  {
    img: "/Naman_pic.jpg",
    name: "Naman Gosain",
    job: "Senior Developer",
  },
  {
    img: "/Naman_pic.jpg",
    name: "Naman Gosain",
    job: "Research Analyst",
  },
  {
    img: "/Naman_pic.jpg",
    name: "Naman Gosain",
    job: "Project Manager",
  },
];

const fallbackImg = "/fallBackImg.jpg";

const Team = () => {
  return (
    <div id="team" className="py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 relative inline-block text-center">
            Meet The Team
            <span className="absolute left-1/2 bottom-[-8px] transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-600 h-1 w-20 rounded-full"></span>
          </h2>
          <p className="text-lg text-gray-600">
            Get to know the talented individuals driving our mission forward.
            Our team of experts brings diverse skills and experience to deliver
            exceptional results.
          </p>
        </div>
        <div className="row">
          {data.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 mb-8">
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-64 object-contain"
                  onError={(e) => {
                    e.target.src = fallbackImg;
                  }}
                />
                <div className="p-4 text-center">
                  <h4 className="text-xl font-semibold mb-2">{d.name}</h4>
                  <p className="text-gray-600">{d.job}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
