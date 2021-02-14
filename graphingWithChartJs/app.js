async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById("chart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in Celsius",
          data: data.ys,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });
}
chartIt();

// getting data using async/await functions
async function getData() {
  const xs = [];
  const ys = [];

  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  //console.log(data);

  // parsing data using split and slice functions
  const table = data.split("\n").slice(1);

  // splitting rows and columns
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
  });
  return { xs, ys };
}
