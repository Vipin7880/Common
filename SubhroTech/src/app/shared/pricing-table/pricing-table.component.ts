import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RazorpayService } from '../../core/services/razorpay.service';
import { CheckoutService, CheckoutDetails } from '../../core/services/checkout.service';
import { InternshipService } from '../../core/services/internship.service';
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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private razorpayService: RazorpayService,
    private checkoutService: CheckoutService,
    private internshipService: InternshipService,
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

  closeModal() {
    // No longer needed
  }

  get phase2Price(): number {
    return this.duration === 60 ? 899 : 499;
  }

  get phase3Price(): number {
    return this.duration === 60 ? 1099 : 899;
  }

  buyPlan() {
    // Get Domain Details to store in CheckoutService
    this.internshipService.getDomainById(this.domainId).subscribe(domain => {
      if (domain) {
        const checkoutData: CheckoutDetails = {
          customerName: '',   // Will be captured on checkout page
          customerEmail: '',
          customerPhone: '',
          domainId: this.domainId,
          domainTitle: domain.title,
          domainCategory: domain.tags && domain.tags.length > 0 ? domain.tags[0] : 'Internship',
          domainDescription: domain.description,
          domainImage: domain.image || 'assets/domain-images/web-dev.png',
          domainSyllabus: domain.roadmap ? domain.roadmap.map(r => r.title) : [],
          planName: this.selectedPlan === 'phase2' ? 'Phase 2 (Certifications)' : 'Phase 3 (Academic+)',
          duration: this.duration,
          originalPrice: this.selectedPlan === 'phase2' ? this.phase2Price : this.phase3Price,
          scratchPrice: this.selectedPlan === 'phase2' ? (this.duration === 60 ? 1499 : 899) : (this.duration === 60 ? 1899 : 1499)
        };

        this.checkoutService.setCheckoutData(checkoutData);
        this.ngZone.run(() => {
          this.router.navigate(['/checkout']);
        });
      }
    });
  }

  openModal() {
    // Now just calls buyPlan directly as per new requirement
    this.buyPlan();
  }

  // buyPlan and openModal are already handled below in the file
}
