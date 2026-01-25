import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  email: string = '';
  isSubscribed: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  subscribe() {
    if (!this.email) return;

    // PHP Backend
    const apiUrl = 'assets/api/save_newsletter.php';
    this.http.post(apiUrl, { email: this.email }).subscribe({
      next: (res) => {
        alert('Subscribed successfully!');
        this.email = '';
        this.isSubscribed = true;
      },
      error: (err) => {
        console.error('Subscription failed', err);
        alert('Failed to subscribe. Please try again.');
      }
    });
  }

}
