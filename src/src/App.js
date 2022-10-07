import axios from "axios";
import { useState, useEffect } from "react";
import CovidData from "./CovidData";
import "./App.css";
import ReactApexChart from "react-apexcharts";

const App = () => {
  const [information, setInformation] = useState([]);
  const [allInfo, setAllInfo] = useState([]); 
  const [chart, setChart] = useState([]);
  const [hide, setHide]= useState(true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios
      .get("https://api.rootnet.in/covid19-in/stats/latest")
      .then((response) => {
        console.log(response.data.data.regional);
        setAllInfo(response.data.data.regional);
        setInformation(response.data.data.regional.map((item) => item.loc));
        setChart(
          response.data.data.regional.map((item) => item.confirmedCasesIndian)
        );
      });
  }, []);

  const chartsHandler = () => {
    setHide(false)
    setShow(true)
  }

  const options = {
    chart: {
       id: "basic-bar",
    },
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
    },
    dynamicAnimation: {
      enabled: true,
      speed: 350
  },
    xaxis: {
      categories: information,
    },
    fill: {
      colors: ["#628E90"],
    },
    colors: ['cadetblue'],
    theme: {
      monochrome: {
        shadeTo: "light",
        shadeIntensity: 0.8,
      },
    },
    markers:{
      style: {
        colors: ['cadetblue']
      }
    }
  };
  const series = [
    {
      name: "Covid19 Data",
      data: chart,
    },
  ];

  return (
    <>
      <div className="main-data">
        <div className="top-bar">
       {hide && <p className="btn-chart" onClick={chartsHandler}>Types of Charts</p>}
       {show && <div className="type-chart">
        <a className="btn-chart" href="#radar-chart">Radar Chart</a>
        <a className="btn-chart" href="#scattar-chart">Scatter Chart</a>
        <a className="btn-chart" href="#Area-chart">Area Chart</a>
        <a className="btn-chart" href="#line-chart">Line Chart</a>
        <a className="btn-chart" href="#bar-chart">Bar Chart</a>
        </div>}
        </div>
       {hide && <CovidData information={information} allInfo={allInfo} />}
       {chart.length > 1 && show && <div className="bar-chart">
        <div id="bar-chart">
       <h1 className="chart">Bar Chart</h1>
        <ReactApexChart
          className="apex"
          options={options}
          series={series}
          chart={chart}
          type="bar"
          width={1600}
          height={750}
        />
        </div>
        <div id="line-chart">
        <h1 className="chart">Line Chart</h1>
        <ReactApexChart
          className="apex"
          options={options}
          series={series}
          chart={chart}
          type="line"
          width={1600}
          height={700}
        />
        </div>
        <div id="Area-chart">
        <h1 className="chart">Area Chart</h1>
        <ReactApexChart
          className="apex"
          options={options}
          series={series}
          chart={chart}
          type="area"
          width={1600}
          height={700}
        />
        </div>
        <div id="scattar-chart">
        <h1 className="chart">Scattar Chart</h1>
        <ReactApexChart
          className="apex"
          options={options}
          series={series}
          chart={chart}
          type="scatter"
          width={1600}
          height={700}
        />
        </div>
        <div id="radar-chart">
        <h1 className="chart">Radar Chart</h1>
        <ReactApexChart
          className="apex"
          options={options}
          series={series}
          chart={chart}
          type="radar"
          width={1600}
          height={700}
        />
        </div>
         </div>}
      </div>  
    </>
  );
};

export default App;
