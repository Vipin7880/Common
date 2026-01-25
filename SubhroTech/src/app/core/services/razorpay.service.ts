import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({
    providedIn: 'root'
})
export class RazorpayService {

    constructor() { }

    private loadScript(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = (error: any) => reject(error);
            document.body.appendChild(script);
        });
    }

    async initiatePayment(options: any): Promise<void> {
        await this.loadScript('https://checkout.razorpay.com/v1/checkout.js');
        const rzp = new Razorpay(options);
        rzp.open();
    }
}
