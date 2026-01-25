import { Component, OnInit } from '@angular/core';
import { InternshipService, Domain } from '../../core/services/internship.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-domain-directory',
  templateUrl: './domain-directory.component.html',
  styleUrls: ['./domain-directory.component.scss']
})
export class DomainDirectoryComponent implements OnInit {
  domains$: Observable<Domain[]>;

  slickConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 992, // Tablet
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  constructor(private internshipService: InternshipService) {
    this.domains$ = this.internshipService.getDomains();
  }

  ngOnInit(): void {
  }

  scrollToForm() {
    const formElement = document.getElementById('custom-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
