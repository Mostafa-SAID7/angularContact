// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  color: string;
  icon?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  // API Configuration
  private apiBaseUrl = 'https://localhost:5001/api'; // Your ASP.NET Core API URL
  
  // State Management
  features: FeatureCard[] = [];
  isLoading = false;
  error: string | null = null;
  
  // User data from API
  userData: any = null;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFeatures();
    this.loadUserData();
  }

  /**
   * Load features from ASP.NET Core API
   */
  loadFeatures(): void {
    this.isLoading = true;
    this.error = null;

    this.http.get<ApiResponse<FeatureCard[]>>(`${this.apiBaseUrl}/features`)
      .pipe(
        catchError(this.handleError.bind(this)),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.features = response.data;
          } else {
            this.features = this.getDefaultFeatures();
          }
        },
        error: () => {
          // Fallback to default features if API fails
          this.features = this.getDefaultFeatures();
        }
      });
  }

  /**
   * Load user data from API
   */
  loadUserData(): void {
    this.http.get<ApiResponse<any>>(`${this.apiBaseUrl}/user/profile`)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.userData = response.data;
          }
        }
      });
  }

  /**
   * Handle card button click - make API call
   */
  onLearnMore(feature: FeatureCard): void {
    this.http.post(`${this.apiBaseUrl}/features/${feature.id}/track`, {
      timestamp: new Date(),
      action: 'learn_more_clicked'
    })
    .pipe(catchError(this.handleError.bind(this)))
    .subscribe({
      next: () => {
        console.log(`Tracked click for feature: ${feature.title}`);
        // Navigate or show modal here
      }
    });
  }

  /**
   * Refresh data from API
   */
  refreshData(): void {
    this.loadFeatures();
    this.loadUserData();
  }

  /**
   * Error handler for HTTP requests
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.error = 'Unable to connect to the server. Please check your connection.';
    } else if (error.status === 401) {
      this.error = 'Unauthorized. Please log in again.';
    } else if (error.status === 404) {
      this.error = 'Resource not found.';
    } else {
      this.error = `Server error: ${error.message}`;
    }
    console.error('API Error:', error);
    return throwError(() => error);
  }

  /**
   * Default features as fallback
   */
  private getDefaultFeatures(): FeatureCard[] {
    return [
      {
        id: 1,
        title: 'Fast Performance',
        description: 'Experience blazing fast load times and smooth interactions across all devices.',
        color: 'indigo'
      },
      {
        id: 2,
        title: 'Responsive Design',
        description: 'Looks perfect on mobile, tablet, and desktop thanks to Tailwind\'s responsive utilities.',
        color: 'green'
      },
      {
        id: 3,
        title: 'Modern UI',
        description: 'Beautiful card designs with shadows, hover effects, and smooth transitions.',
        color: 'yellow'
      },
      {
        id: 4,
        title: 'Customizable',
        description: 'Easily adapt the layout, colors, and content using Tailwind\'s utility classes.',
        color: 'purple'
      },
      {
        id: 5,
        title: 'Scalable',
        description: 'Perfect for projects of any size — from small demos to large-scale applications.',
        color: 'pink'
      },
      {
        id: 6,
        title: 'Developer Friendly',
        description: 'Clean code structure, reusable components, and Tailwind CSS for rapid development.',
        color: 'teal'
      }
    ];
  }

  /**
   * Get button color class based on feature color
   */
  getButtonColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'indigo': 'bg-indigo-600 hover:bg-indigo-500',
      'green': 'bg-green-600 hover:bg-green-500',
      'yellow': 'bg-yellow-500 hover:bg-yellow-400',
      'purple': 'bg-purple-600 hover:bg-purple-500',
      'pink': 'bg-pink-600 hover:bg-pink-500',
      'teal': 'bg-teal-600 hover:bg-teal-500'
    };
    return colorMap[color] || 'bg-gray-600 hover:bg-gray-500';
  }
}


