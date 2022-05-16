import React from "react";

const NoFound = () => {
  return (
    <div className="card border-0 w-100">
      <img
        src="https://i.pinimg.com/originals/4e/cf/3a/4ecf3abb847d31947125838e9a6f4fc7.png"
        className="card-img-top"
        alt="No results"
        style={{ width: "400px", height: "400px", margin: "40px auto" }}
      />
      <div class="card-body">
        <h2 className="card-text text-center text-muted">No results found</h2>
      </div>
    </div>
  );
};

export default NoFound;
