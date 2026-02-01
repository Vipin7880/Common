import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from '../../core/services/coupon.service';
import { HttpClient } from '@angular/common/http';
import { CheckoutService, CheckoutDetails } from '../../core/services/checkout.service';
import { RazorpayService } from '../../core/services/razorpay.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutData: CheckoutDetails | null = null;
  couponCode: string = '';
  isApplyingCoupon: boolean = false;
  couponApplied: boolean = false;
  discountAmount: number = 0;
  finalPrice: number = 0;
  appliedCouponDetails: any = null;

  // Editable User Details
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private http: HttpClient,
    private razorpayService: RazorpayService,
    private couponService: CouponService
  ) { }

  ngOnInit(): void {
    this.checkoutData = this.checkoutService.getCheckoutData();
    if (!this.checkoutData) {
      this.router.navigate(['/']);
      return;
    }
    this.finalPrice = this.checkoutData.originalPrice;

    // Initialize with data from service if available (though it will likely be empty now)
    this.customerName = this.checkoutData.customerName || '';
    this.customerEmail = this.checkoutData.customerEmail || '';
    this.customerPhone = this.checkoutData.customerPhone || '';
  }

  removeCoupon() {
    this.couponApplied = false;
    this.discountAmount = 0;
    this.finalPrice = this.checkoutData?.originalPrice || 0;
    this.couponCode = ''; // Clear the input as requested
    this.appliedCouponDetails = null;
    Swal.fire({
      title: 'Coupon Removed',
      text: 'The coupon has been removed.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  }

  toggleCoupon() {
    if (this.couponApplied) {
      this.removeCoupon();
    } else {
      this.applyCoupon();
    }
  }

  applyCoupon() {
    if (!this.couponCode) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Coupon',
        text: 'Please enter a coupon code'
      });
      return;
    }

    this.isApplyingCoupon = true;
    this.couponService.validateCoupon(this.couponCode, this.checkoutData?.originalPrice || 0)
    .subscribe({
      next: (res) => {
        this.isApplyingCoupon = false;
        if (res.success) {
          this.couponApplied = true;
          this.discountAmount = res.discount_amount;
          this.finalPrice = res.final_price;
          this.appliedCouponDetails = res.coupon;
          Swal.fire({
            title: 'Coupon Applied!',
            text: `You saved ₹${this.discountAmount}`,
            icon: 'success',
            confirmButtonColor: '#0ea5e9'
          });
        } else {
          Swal.fire('Error', res.message || 'Invalid coupon', 'error');
        }
      },
      error: (err) => {
        this.isApplyingCoupon = false;
        console.error('Coupon validation failed', err);
        Swal.fire('Error', 'Failed to validate coupon', 'error');
      }
    });
  }

  proceedToPay() {
    if (!this.checkoutData) return;

    // Validation
    if (!this.customerName || !this.customerEmail || !this.customerPhone) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Details',
        text: 'Please fill in your Name, Email, and Phone before proceeding.'
      });
      return;
    }

    let description = `${this.checkoutData.planName} - ${this.checkoutData.duration} Days - ${this.checkoutData.domainTitle}`;
    if (this.couponApplied) {
      description += ` (Coupon: ${this.couponCode})`;
    }

    const options = {
      key: environment.razorpayKey,
      amount: this.finalPrice * 100,
      currency: 'INR',
      name: 'Subhro Tech',
      description: description,
      image: 'assets/logo.png',
      handler: (response: any) => {
        this.handlePaymentSuccess(response);
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
          this.savePayment({ payment_id: 'Cancelled' }, 'Cancelled');
        }
      }
    };

    this.razorpayService.initiatePayment(options);
  }

  handlePaymentSuccess(response: any) {
    this.savePayment(response, 'Success');

    if (this.couponApplied) {
      this.recordCouponUsage();
    }

    Swal.fire({
      icon: 'success',
      title: 'Payment Successful',
      text: 'Redirecting to home...',
      timer: 3000,
      showConfirmButton: false
    }).then(() => {
      this.checkoutService.clearCheckoutData();
      this.router.navigate(['/']);
    });
  }

  savePayment(response: any, status: string) {
    if (!this.checkoutData) return;

    const paymentData = {
      payment_id: response.razorpay_payment_id || response.payment_id || 'N/A',
      status: status,
      amount: this.finalPrice,
      currency: 'INR',
      plan_name: this.checkoutData.planName,
      duration: this.checkoutData.duration,
      domain: this.checkoutData.domainId,
      name: this.customerName,
      email: this.customerEmail,
      phone: this.customerPhone,
      notes: {
        ...response,
        coupon_applied: this.couponCode,
        discount_amount: this.discountAmount
      }
    };

    this.http.post(`${environment.apiBaseUrl}/save_payment.php`, paymentData).subscribe({
      next: (res) => console.log('Payment saved', res),
      error: (err) => console.error('Failed to save payment', err)
    });
  }

  recordCouponUsage() {
    if (!this.checkoutData) return;

    const usageData = {
      coupon_code: this.couponCode,
      name: this.customerName,
      email: this.customerEmail,
      number: this.customerPhone,
      amount: this.finalPrice,
      client_name: this.appliedCouponDetails?.client_name || 'ST'
    };

    this.http.post(`${environment.apiBaseUrl}/coupon_usage.php`, usageData).subscribe({
      next: (res) => console.log('Coupon usage recorded', res),
      error: (err) => console.error('Failed to record coupon usage', err)
    });
  }
}
