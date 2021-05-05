"use strict";
const api_url = "https://api.covid19india.org/data.json";
// const test_url = "raw_data26.csv";
const allStateObjets = [
  {
    Statename: "Tamil Nadu",
    latlan: [11.059821, 78.387451],
  },
  {
    Statename: "Telangana",
    latlan: [17.123184, 79.208824],
  },

  {
    Statename: "Chhattisgarh",
    latlan: [21.295132, 81.828232],
  },
  {
    Statename: "Haryana",
    latlan: [29.065773, 76.040497],
  },
  {
    Statename: "Madhya Pradesh",
    latlan: [25.794033, 78.116531],
  },

  {
    Statename: "Tripura",
    latlan: [23.745127, 91.746826],
  },

  {
    Statename: "Karnataka",
    latlan: [15.317277, 75.71389],
  },
  {
    Statename: "Kerala",
    latlan: [10.850516, 76.27108],
  },
  {
    Statename: "Uttar Pradesh",
    latlan: [28.207609, 79.82666],
  },
  {
    Statename: "Assam",
    latlan: [26.244156, 92.537842],
  },
  {
    Statename: "Maharashtra",
    latlan: [19.66328, 75.300293],
  },

  {
    Statename: "West Bengal",
    latlan: [22.978624, 87.747803],
  },
  {
    Statename: "Gujarat",
    latlan: [22.309425, 72.13623],
  },
  {
    Statename: "Odisha",
    latlan: [20.94092, 84.803467],
  },
  {
    Statename: "Rajasthan",
    latlan: [27.391277, 73.432617],
  },
  {
    Statename: "Himachal Pradesh",
    latlan: [32.084206, 77.571167],
  },
];
const map = L.map("map").setView([22.37039758449679, 77.8240771399801], 5);

//adding map tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

async function getCovidData() {
  const response = await fetch(api_url);
  const data = await response.json();
  const statesData = data.statewise.slice(1);
  console.log(statesData);
  document.querySelector("#active").innerText = +data.statewise[0].active;
  document.querySelector("#confirmed").innerText = +data.statewise[0].confirmed;
  document.querySelector("#deaths").innerText = +data.statewise[0].deaths;

  allStateObjets.forEach((state) => {
    const currentState = statesData.find((s) => state.Statename === s.state);

    L.circle(state.latlan, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 150000,
    })
      .addTo(map)
      .bindPopup(
        `${currentState.state}<br>Active cases : ${currentState.active}<br>
    Confirmed cases : ${currentState.confirmed}<br>Deceased cases : ${currentState.deaths}`
      )
      .openPopup();
  });
}
getCovidData();
// setInterval(getCovidData, 5000);
