import { Component, OnInit } from '@angular/core';
import { Chart,ArcElement,PieController, ChartOptions, CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, PluginChartOptions, ScaleChartOptions } from 'chart.js';
import { ClaimService } from 'src/app/claim.service';
import { DeepPartial } from 'chart.js/dist/types/utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

Chart.register(PieController);
Chart.register(ArcElement);
@Component({
  selector: 'app-body-admin',
  templateUrl: './body-admin.component.html',
  styleUrls: ['./body-admin.component.css']
})
export class DashboardComponent implements OnInit {
  pieChart: any;
  pieChart1: any;
  data:any =[];
  data2:any =[];
  data3:any =[];
  nbClaims: number | undefined;
  nbusers: number | undefined;
  currentUser: any;
  greeting: string = '';
  constructor(private claimService: ClaimService,private http:HttpClient,public userService: UserService) { }

  ngOnInit(): void {this.userService.getCurrentUser().subscribe(
    (user) => {
      this.currentUser = user;
    },
    (error) => {
      // Handle errors, e.g., user not authenticated or other issues
      console.error('Error:', error);
    }
  );
    const now = new Date();
    const currentHour = now.getHours();

    // Set the greeting based on the time
    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Night';
    }
    this.getPourcentage();
    this.getPourcentage1();
    this.http.get<number>('http://localhost:8085/claim/nbclaim').subscribe(
    data2 => {
      this.nbClaims = data2;
    },
    error => {
      console.log('Error occurred while fetching nbClaims: ', error);
    }
  );
  this.http.get<number>('http://localhost:8085/nbuser').subscribe(
    data3 => {
      this.nbusers = data3;
    },
    error => {
      console.log('Error occurred while fetching nbClaims: ', error);
    }
  );

  }
  getPourcentage(): void {
    this.http.get<{ [key: string]: number }>('http://localhost:8085/claim/nbclaim3').subscribe(data => {
      const labels = Object.keys(data);
      const percentages = Object.values(data);
      const colors = ["lightblue", "orange","plum"];

      this.pieChart = new Chart('pieChart', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: percentages,
            backgroundColor: colors
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Claim Types Distribution'
          },
          tooltips: {
            callbacks: {
              label: function(context: any) {
                const label = context.label;
                const value = context.formattedValue;
                return `${label}: ${value}%`;
              }
            }
          },
          legend: {
            display: true,
            position: 'top'
          }
        } as DeepPartial<CoreChartOptions<'doughnut'> & PluginChartOptions<'doughnut'> & DatasetChartOptions<'doughnut'> & ScaleChartOptions<'doughnut'> & DoughnutControllerChartOptions>
      });
    });
    
    
  }
  private generateColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }
  getPourcentage1(): void {
    this.http.get<{ [key: string]: number }>('http://localhost:8085/claim/nbclaim1').subscribe(data1 => {
      const labels = Object.keys(data1);
      const percentages = Object.values(data1);
      const colors = ["green", "red"];
  
      this.pieChart1 = new Chart('pieChart1', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: percentages,
            backgroundColor: colors
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Claim Types Distribution'
          },
          tooltips: {
            callbacks: {
              label: function(context: any) {
                const label = context.label;
                const value = context.formattedValue;
                return `${label}: ${value}%`;
              },
              title: function(context: any) {
                return null; // Disable the title (category label) at the top of the tooltip.
              },
            },
          },
          legend: {
            display: true,
            position: 'top'
          }
        } as DeepPartial<CoreChartOptions<'pie'> & PluginChartOptions<'pie'> & DatasetChartOptions<'pie'> & ScaleChartOptions<'pie'> & DoughnutControllerChartOptions>
      });
    });
  }
  
  
}
  
  
  
  
  
  







