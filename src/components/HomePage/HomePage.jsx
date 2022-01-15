import React from "react";

function HomePage() {
  return (
    <div className="col-12">
      <video
        className="col-12"
        src="/videos/home_video.mp4"
        autoPlay
        loop
        muted
      />
    </div>
  );
}

export default HomePage;
