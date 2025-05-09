import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements AfterViewInit {
  title = 'Room Kiosk';
  cards = [
    { title: 'Room 1', description: 'Available for booking' },
    { title: 'Room 2', description: 'Currently occupied' },
    { title: 'Room 3', description: 'Under maintenance' },
    { title: 'Room 4', description: 'Available for booking' },
    { title: 'Room 5', description: 'Currently occupied' },
    { title: 'Room 6', description: 'Available for booking' },
    { title: 'Room 7', description: 'Currently occupied' },
    { title: 'Room 8', description: 'Under maintenance' },
    { title: 'Room 9', description: 'Available for booking' },
    { title: 'Room 10', description: 'Under maintenance' },
    { title: 'Room 11', description: 'Available for booking' },
  ];

  filteredCards = [...this.cards]; // Initialize with all cards
  isSearching = false; // Flag to track if the user is searching
  private chartInstance: Chart | null = null; // Reference to the Chart instance

  ngAfterViewInit(): void {
    console.log('Cards:', this.cards);
    this.initializeBarChart();
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.isSearching = searchTerm.length > 0; // Set the flag based on input

    if (this.isSearching) {
      // Filter cards based on the search term
      this.filteredCards = this.cards.filter((card) =>
        card.description.toLowerCase().includes(searchTerm)
      );
    } else {
      // Reset to show all cards and re-initialize the bar chart
      this.filteredCards = [...this.cards];
      this.initializeBarChart(); // Re-initialize the bar chart
    }

    console.log('Filtered Cards:', this.filteredCards);
  }

  initializeBarChart(): void {
    Chart.register(...registerables);

    // Destroy the existing chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (ctx) {
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6', 'Room 7', 'Room 8', 'Room 9', 'Room 10', 'Room 11'],
          datasets: [
            {
              label: 'Usage Hours',
              data: [12, 19, 3, 5, 2, 3, 8, 7, 6, 4, 9, 11], // Example data for usage hours
              backgroundColor: [
                'rgba(46, 111, 64, 0.8)', // Matching green for Room 1
                'rgba(92, 237, 115, 0.8)', // Light green for Room 2
                'rgba(46, 111, 64, 0.8)', // Matching green for Room 3
                'rgba(92, 237, 115, 0.8)', // Light green for Room 4
                'rgba(46, 111, 64, 0.8)', // Matching green for Room 5
              ],
              borderColor: [
                'rgba(46, 111, 64, 1)', // Dark green border for Room 1
                'rgba(92, 237, 115, 1)', // Light green border for Room 2
                'rgba(46, 111, 64, 1)', // Dark green border for Room 3
                'rgba(92, 237, 115, 1)', // Light green border for Room 4
                'rgba(46, 111, 64, 1)', // Dark green border for Room 5
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Canvas element for bar chart not found.');
    }
  }
}