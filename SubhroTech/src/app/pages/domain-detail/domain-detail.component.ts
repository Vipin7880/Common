import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternshipService, Domain } from '../../core/services/internship.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-domain-detail',
  templateUrl: './domain-detail.component.html',
  styleUrls: ['./domain-detail.component.scss']
})
export class DomainDetailComponent implements OnInit {
  domain$: Observable<Domain | undefined>;
  activeAccordionIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private internshipService: InternshipService
  ) {
    this.domain$ = this.route.paramMap.pipe(
      switchMap(params => this.internshipService.getDomainById(params.get('id') || ''))
    );
  }

  ngOnInit(): void {
  }

  toggleAccordion(index: number, event: Event) {
    event.stopPropagation(); // Prevent document click from closing it immediately
    if (this.activeAccordionIndex === index) {
      this.activeAccordionIndex = null; // Close if already open
    } else {
      this.activeAccordionIndex = index; // Open new one
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close accordion if clicked outside
    this.activeAccordionIndex = null;
  }
}
