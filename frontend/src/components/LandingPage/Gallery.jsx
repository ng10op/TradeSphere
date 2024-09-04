import React from "react";

const galleryData = [
  {
    title: "Stock Data Visualization",
    largeImage: "img/portfolio/01-large.jpg",
    smallImage: "img/portfolio/01-small.jpg",
  },
  {
    title: "Real-Time Stock Tracking",
    largeImage: "img/portfolio/02-large.jpg",
    smallImage: "img/portfolio/02-small.jpg",
  },
  {
    title: "Historical Data Analysis",
    largeImage: "img/portfolio/03-large.jpg",
    smallImage: "img/portfolio/03-small.jpg",
  },
  {
    title: "Market Trends Overview",
    largeImage: "img/portfolio/04-large.jpg",
    smallImage: "img/portfolio/04-small.jpg",
  },
  {
    title: "Investment Insights",
    largeImage: "img/portfolio/05-large.jpg",
    smallImage: "img/portfolio/05-small.jpg",
  },
  {
    title: "Data Aggregation Tools",
    largeImage: "img/portfolio/06-large.jpg",
    smallImage: "img/portfolio/06-small.jpg",
  },
  {
    title: "Performance Metrics",
    largeImage: "img/portfolio/07-large.jpg",
    smallImage: "img/portfolio/07-small.jpg",
  },
  {
    title: "User Dashboard",
    largeImage: "img/portfolio/08-large.jpg",
    smallImage: "img/portfolio/08-small.jpg",
  },
  {
    title: "Advanced Analysis Features",
    largeImage: "img/portfolio/09-large.jpg",
    smallImage: "img/portfolio/09-small.jpg",
  },
];

const Gallery = () => {
  return (
    <div id="portfolio" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block text-center">
            Gallery
            <span className="absolute left-1/2 bottom-[-6px] transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-600 h-1 w-16 rounded-full"></span>
          </h2>

          <p className="text-lg text-gray-600">
            Explore our diverse gallery showcasing various aspects of our stock
            analysis features. From real-time data visualizations to
            comprehensive market insights, see how our platform enhances your
            investment experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((d, i) => (
            <div key={`${d.title}-${i}`} className="relative group">
              <div className="overflow-hidden">
                <img
                  src={d.smallImage}
                  alt={d.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h4 className="text-lg font-semibold">{d.title}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
