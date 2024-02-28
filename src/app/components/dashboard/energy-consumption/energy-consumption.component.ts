import { Component, OnInit } from '@angular/core';
import { ApiService, EnergyConsumption } from '../../../services/api.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-energy-consumption',
  standalone: true,
  imports: [],
  templateUrl: './energy-consumption.component.html',
  styleUrl: './energy-consumption.component.scss'
})

export class EnergyConsumptionComponent implements OnInit {

  energyConsumption : EnergyConsumption[] | undefined;
  constructor(private apiService: ApiService) {}

 
  ngOnInit(): void {
    this.initChart()
  }

  initChart(){
    this.apiService.getEnergyConsumption().subscribe(res=>{
      console.log(res)
      this.energyConsumption = res;
      const groupedData = this.energyConsumption.reduce((acc : EnergyConsumptionAccumulator , { timestamp, cpe, active_energy }) => {
        const month = new Date(timestamp).getMonth();
        if (!acc[month]) acc[month] = {};
        if (!acc[month]['cpe']) acc[month]['cpe'] = 0;
        acc[month]['cpe'] += active_energy;
        return acc;
      }, {});
      this.createMonthlyChart(groupedData)
    })
  }

  createMonthlyChart(data: any) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (canvas && canvas.getContext) { // Check if canvas is not null and getContext is available
      const ctx = canvas.getContext('2d');
      if (!ctx) { // Additional check if getContext('2d') does not return a drawing context
        return;
      }
      const monthlyChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'CPE_1',
              data: this.sumEnergyByMonth(this.energyConsumption || [], 'CPE_1'),
              backgroundColor: '#0075ff',
            },
            {
              label: 'CPE_2',
              data: this.sumEnergyByMonth(this.energyConsumption || [], 'CPE_2'),
              backgroundColor: '#d85556',
            },
            {
              label: 'CPE_3',
              data: this.sumEnergyByMonth(this.energyConsumption || [], 'CPE_3'),
              backgroundColor: '#889ce7',
            },
            {
              label: 'CPE_4',
              data: this.sumEnergyByMonth(this.energyConsumption || [], 'CPE_4'),
              backgroundColor: '#4bd1a0',
            },  
            {
              label: 'CPE_5',
              data: this.sumEnergyByMonth(this.energyConsumption || [], 'CPE_5'),
              backgroundColor: '#ffc423',
            },  
            {
              label: 'CPE_6',
              data: this.sumEnergyByMonth(this.energyConsumption || [], 'CPE_6'),
              backgroundColor: '#ffffff',
            },  
           ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  renderChart(data: EnergyConsumptionAccumulator) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (canvas && canvas.getContext) { // Check if canvas is not null and getContext is available
      const ctx = canvas.getContext('2d');
      if (!ctx) { // Additional check if getContext('2d') does not return a drawing context
        return;
      }
  
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data).map(month => `Month ${month + 1}`),
          datasets: Object.keys(data[0]).map(cpe => ({
            label: `CPE ${cpe}`,
            data: Object.values(data).map(monthData => monthData[cpe] || 0),
            // Ensure randomColor() is defined or use a fallback static color
            backgroundColor: 'randomColor()', // Define this function or replace with a static color
          }))
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found!');
    }
  }
  


// Function to sum active_energy for CPE_1 by month
sumEnergyByMonth(data : EnergyConsumption[], cpe : string) {
  const monthlySum: { [key: number]: number } = {}; // Correctly typed as an object with numeric keys and values

  data.forEach(record => {
    if (record.cpe === cpe) {
      const month = new Date(record.timestamp).getMonth(); // Month as 0-indexed (0 for January, 11 for December)
      monthlySum[month] = (monthlySum[month] || 0) + record.active_energy;
    }
  });

  return Object.values(monthlySum); // Returns an array of summed values for each month
}

 

}

interface EnergyConsumptionAccumulator {
  [key: number]: {
    [cpe: string]: number;
  };
}
