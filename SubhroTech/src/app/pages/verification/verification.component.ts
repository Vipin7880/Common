import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Added
import { CertificateService, CertificateDetails } from '../../core/services/certificate.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  certId: string = '';
  searchPerformed: boolean = false;
  isValid: boolean = false;
  certificateDetails: CertificateDetails | null = null;
  isLoading: boolean = false;

  constructor(
    private certificateService: CertificateService,
    private route: ActivatedRoute // Injected
  ) { }

  ngOnInit(): void {
    // Check for ID in URL Path (e.g. /verify/IX-1001) or Query Params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.certId = id;
        this.verifyCertificate();
      }
    });
  }



  verifyCertificate() {
    if (!this.certId.trim()) return;

    this.searchPerformed = true;
    this.isLoading = true;
    this.isValid = false;
    this.certificateDetails = null;

    this.certificateService.verifyCertificate(this.certId).subscribe({
      next: (details) => {
        this.isLoading = false;
        if (details) {
          this.isValid = true;
          this.certificateDetails = details;
          this.triggerConfetti();
        } else {
          this.isValid = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.isValid = false;
      }
    });
  }

  triggerConfetti() {
    const duration = 300;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0ea5e9', '#84cc16', '#f50b51ff', '#6366f1']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0ea5e9', '#84cc16', '#f50b51ff', '#6366f1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}
