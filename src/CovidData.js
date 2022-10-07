import React from "react";

const CovidData = ({ information,allInfo }) => {
  return (
    <>
      <div className="data-div">
      {allInfo.map((info) => {
          return (
            <>
              <div className="total-data">
                <div className="total-categories location">{info.loc}</div>
                <div className="total-categories"><span className="category-title">Foreign Cases Confirmed:</span> {info.confirmedCasesForeign}</div>
                <div className="total-categories"><span className="category-title">Indian Cases Confirmed:</span>{info.confirmedCasesIndian}</div>
                <div className="total-categories"><span className="category-title">Deaths:</span> {info.deaths}</div>
                <div className="total-categories"><span className="category-title">Discharged:</span> {info.discharged}</div>
                <div className="total-categories"><span className="category-title">Total Confirmed:</span> {info.totalConfirmed}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CovidData;
