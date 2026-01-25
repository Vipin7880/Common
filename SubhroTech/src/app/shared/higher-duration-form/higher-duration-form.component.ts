import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-higher-duration-form',
  templateUrl: './higher-duration-form.component.html',
  styleUrls: ['./higher-duration-form.component.scss']
})
export class HigherDurationFormComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  duration: number | null = null;
  message: string = '';

  isSubmitting: boolean = false;

  errors: { [key: string]: string } = {};

  constructor(private http: HttpClient) {}

  validate(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.name.trim()) {
      this.errors['name'] = 'Full Name is required.';
      isValid = false;
    }

    if (!this.email.trim()) {
      this.errors['email'] = 'Email Address is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors['email'] = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!this.phone.trim()) {
      this.errors['phone'] = 'Phone Number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(this.phone.replace(/\D/g, '').slice(-10))) {
      this.errors['phone'] = 'Please enter a valid 10-digit phone number.';
      isValid = false;
    }

    if (!this.duration) {
      this.errors['duration'] = 'Duration is required.';
      isValid = false;
    } else if (this.duration <= 60) {
      this.errors['duration'] = 'Duration must be greater than 60 days.';
      isValid = false;
    }

    return isValid;
  }

  onSubmit() {
    if (!this.validate()) {
      return;
    }

    this.isSubmitting = true;

    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      duration: this.duration,
      message: this.message
    };

    this.http.post('assets/api/save_higher_duration.php', data).subscribe({
      next: (res) => {
        alert('Your enquiry has been sent successfully! We will contact you soon.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to send enquiry. Please try again later.');
        this.isSubmitting = false;
      }
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.duration = null;
    this.message = '';
  }
}
