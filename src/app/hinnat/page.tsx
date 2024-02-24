import { useState, useEffect, useClient } from 'react';
import { NavBar } from '../components/navbar'
import Chart from "chart.js/auto"
import "chartjs-adapter-moment"

export default function Page() {
  useClient(); // Specify that this is a Client Component

  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.porssisahko.net/v1/latest-prices.json')
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await res.json();
      setPriceData(data);
      renderChart(data);
    }

    fetchData();
  }, []);

  function renderChart(data){
    const ctx = document.getElementById("priceChart").getContext("2d")
    new Chart(ctx, {
      type: 'line',
      data: {
          labels: priceData.map(item => moment(item.startDate).format('YYYY-MM-DD')),
          datasets: [{
              label: 'Price',
              data: priceData.map(item => ({ x: new Date(item.startDate), y: item.price })),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              tension: 0.1
          }]
      },
      options: {
          scales: {
              x: {
                  type: 'time',
                  time: {
                      unit: 'hour',
                      displayFormats: {
                          hour: "DD-MM HH:mm"
                      }
                  }
              },
              y: {
                  beginAtZero: true,
                  //Jos ylhäällä map functioon koittaa y-akselille lisätä  + ' snt/kWh' se rikkoo chartin jostain syystä.
                  //joten tehdään callback funktio josta saadaan y-akselin label, johon lisätty snt/kwh
                  ticks: {
                      callback: function(value) {
                          return value + " snt/kWh";
                      }
                  }
              }
          }
      }
  })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar/>
      <span>duck</span>
      <canvas id="priceChart"></canvas>
      {priceData && <span>{JSON.stringify(priceData)}</span>}
      <span>data is above me :)</span>
    </main>
  )
}
