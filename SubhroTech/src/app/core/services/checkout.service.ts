import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CheckoutDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  domainId: string;
  domainTitle: string;
  domainCategory: string;
  domainDescription: string;
  domainImage: string;
  domainSyllabus: string[];
  planName: string;
  duration: number;
  originalPrice: number;
  scratchPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutDataSubject = new BehaviorSubject<CheckoutDetails | null>(null);
  checkoutData$ = this.checkoutDataSubject.asObservable();

  constructor() {
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      try {
        this.checkoutDataSubject.next(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse checkout data', e);
        localStorage.removeItem('checkoutData');
      }
    }
  }

  setCheckoutData(data: CheckoutDetails) {
    localStorage.setItem('checkoutData', JSON.stringify(data));
    this.checkoutDataSubject.next(data);
  }

  getCheckoutData(): CheckoutDetails | null {
    return this.checkoutDataSubject.value;
  }
  
  clearCheckoutData() {
    localStorage.removeItem('checkoutData');
    this.checkoutDataSubject.next(null);
  }
}
