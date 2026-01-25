import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitted = false;
  isSubmitting = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.isSubmitting = true;

    // PHP Backend
    const apiUrl = 'assets/api/save_contact.php';

    this.http.post(apiUrl, this.formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.formData = { name: '', email: '', subject: '', message: '' }; // Reset form
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
      }
    });
  }
}
