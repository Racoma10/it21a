// ChartCreator Class to handle chart creation
class ChartCreator {
    constructor(chartId, chartType, data, options = {}) {
      this.chartId = chartId;      // ID of the canvas element
      this.chartType = chartType;  // Type of the chart (e.g., bar, pie)
      this.data = data;            // Data for the chart
      this.options = options;      // Optional configuration for the chart
    }
  
    // Method to create the chart
    createChart() {
      const ctx = document.getElementById(this.chartId).getContext('2d');
      new Chart(ctx, {
        type: this.chartType,
        data: this.data,
        options: this.options,
      });
    }
  }
  
  // Fetch data from the JSON file and render charts
  async function fetchChartData() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
  
      // Bar Chart Data
      const barChartData = {
        labels: data.barChart.labels,
        datasets: [{
          label: 'Sales in 2023',
          data: data.barChart.values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };
  
      const barChartOptions = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
  
      // Create Bar Chart instance
      const barChart = new ChartCreator('barChart', 'bar', barChartData, barChartOptions);
      barChart.createChart();
  
      // Pie Chart Data
      const pieChartData = {
        labels: data.pieChart.labels,
        datasets: [{
          data: data.pieChart.values,
          backgroundColor: ['red', 'blue', 'green', 'yellow'],
          hoverOffset: 4
        }]
      };
  
      const pieChartOptions = {};
      
      // Create Pie Chart instance
      const pieChart = new ChartCreator('pieChart', 'pie', pieChartData, pieChartOptions);
      pieChart.createChart();
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Call the fetchChartData function when the page loads
  window.onload = fetchChartData;
  