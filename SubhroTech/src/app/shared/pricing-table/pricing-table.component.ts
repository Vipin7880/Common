import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RazorpayService } from '../../core/services/razorpay.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent implements OnInit {
  selectedPlan: string = 'phase2'; // Default selection
  duration: number = 15; // Default duration
  domainId: string = '';

  // User Details
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';

  showPaymentModal: boolean = false;
  showSuccessModal: boolean = false;
  redirectSeconds: number = 10;
  private redirectInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private razorpayService: RazorpayService,
    private http: HttpClient,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.duration = params['duration'] ? +params['duration'] : 15;
    });
    this.route.paramMap.subscribe(params => {
      this.domainId = params.get('id') || 'Unknown';
    });
  }

  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }

  get actionLink(): string {
    switch (this.selectedPlan) {
      case 'phase1':
        return '/domains'; // Or wherever Phase 1 goes
      default:
        return '#'; // Handled by click
    }
  }

  get isExternal(): boolean {
    return this.selectedPlan !== 'phase1';
  }

  openModal() {
    this.showPaymentModal = true;
  }

  closeModal() {
    this.showPaymentModal = false;
  }

  get phase2Price(): number {
    return this.duration === 60 ? 899 : 499;
  }

  get phase3Price(): number {
    return this.duration === 60 ? 1099 : 899;
  }

  buyPlan() {
    // Validation
    if (!this.customerName || !this.customerEmail || !this.customerPhone) {
      alert('Please fill in your Name, Email, and Phone Number before proceeding.');
      return;
    }

    let amount = 0;
    let planName = '';

    if (this.selectedPlan === 'phase2') {
      amount = this.phase2Price;
      planName = 'Phase 2 (Certifications)';
    } else if (this.selectedPlan === 'phase3') {
      amount = this.phase3Price;
      planName = 'Phase 3 (Academic+)';
    } else {
      return;
    }



    const options = {
      key: environment.razorpayKey, // Securely loaded from environment
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Subhro Tech',
      description: `${planName} - ${this.duration} Days - ${this.domainId}`,
      image: 'assets/logo.png', // Optional
      handler: (response: any) => {
        this.ngZone.run(() => {
          console.log(response);
          this.savePayment(response, 'Success', amount, planName);

          // Close Input Modal and Show Success Modal
          this.showPaymentModal = false;
          this.showSuccessModal = true;

          // Start Redirect Timer
          this.redirectInterval = setInterval(() => {
            this.redirectSeconds--;
            if (this.redirectSeconds <= 0) {
              clearInterval(this.redirectInterval);
              this.router.navigate(['/']);
            }
          }, 1000);
        });
      },
      prefill: {
        name: this.customerName,
        email: this.customerEmail,
        contact: this.customerPhone
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: () => {
          this.ngZone.run(() => {
            this.savePayment({ payment_id: 'Cancelled' }, 'Failed/Cancelled', amount, planName);
          });
        }
      }
    };

    this.razorpayService.initiatePayment(options);
  }

  savePayment(response: any, status: string, amount: number, planName: string) {
    const paymentData = {
      payment_id: response.razorpay_payment_id || response.payment_id || 'N/A',
      status: status,
      amount: amount,
      currency: 'INR',
      plan_name: planName,
      duration: this.duration,
      domain: this.domainId,
      name: this.customerName,
      email: this.customerEmail,
      phone: this.customerPhone,
      notes: response
    };

    // PHP Backend
    this.http.post('assets/api/save_payment.php', paymentData).subscribe({
      next: (res) => console.log('Payment saved to backend', res),
      error: (err) => console.error('Failed to save payment', err)
    });
  }
}
