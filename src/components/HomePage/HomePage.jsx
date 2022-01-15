import React from "react";
import "./homepage.css";

function HomePage() {
  return (
    <div className="col-12">
      <div className="animation-container">
        <h1 class="alt">
          We are driving already, let's make some money.
          <br />
        </h1>
        <p class="fadeIn wait-7s">Join our growing platform.</p>
      </div>
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
