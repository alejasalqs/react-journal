import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://pm1.narvii.com/6229/085838414798bfe75124bcc4cb7176b06f2a44d9_hq.jpg)",
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-tittle">Un nuevo dia</p>
        <p className="journal__entry-content">
          Un nuevo dia Un nuevo dia Un nuevo dia Un nuevo dia Un nuevo dia
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
