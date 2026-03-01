import { Component, OnInit, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  activeRoute = '/';
  isMobileMenuOpen = false;

  navItems: any[] = [
    { label: 'Home', route: '/', exact: true },
    {
      label: 'Retail', route: '/retail', exact: false, expanded: false,
      children: [
        { label: 'Private Label', route: '/retail', fragment: 'private-label' },
        { label: 'Our Brands', route: '/retail', fragment: 'our-brands' },
        { label: 'Our Customers', route: '/retail', fragment: 'our-customers' },
        { label: 'Our Partnerships', route: '/retail', fragment: 'our-partnerships' }
      ]
    },
    {
      label: 'Professional', route: '/professional', exact: false, expanded: false,
      children: [
        { label: 'ISFI Assortment', route: '/professional', fragment: 'isfi-assortment' },
        { label: 'Oscar Tausig', route: '/professional', fragment: 'oscar-tausig' }
      ]
    },
    { label: 'Industry', route: '/industry', exact: false },
    {
      label: 'About', route: '/about', exact: false, expanded: false,
      children: [
        { label: 'Our History', route: '/about', fragment: 'history' },
        { label: 'Our Activities', route: '/about', fragment: 'activities' },
        { label: 'Sustainability', route: '/about', fragment: 'sustainability' },
        { label: 'Our Team', route: '/about', fragment: 'our-team' }
      ]
    },
    { label: 'Quality', route: '/quality', exact: false },
    { label: 'Careers', route: '/careers', exact: false },
    { label: 'Contact', route: '/contact', exact: false }
  ];

  constructor(private router: Router, private renderer: Renderer2) { }
 
   ngOnInit(): void {
     this.router.events.pipe(
       filter((e): e is NavigationEnd => e instanceof NavigationEnd)
     ).subscribe(e => {
       this.activeRoute = e.urlAfterRedirects;
     });
   }
 
   ngAfterViewInit(): void {
     // SlickNav removed as requested
   }

   toggleMobileMenu(): void {
     this.isMobileMenuOpen = !this.isMobileMenuOpen;
     this.updateScrollLock();
   }

   closeMobileMenu(): void {
     this.isMobileMenuOpen = false;
     this.updateScrollLock();
   }

   toggleSubmenu(item: any): void {
     item.expanded = !item.expanded;
   }

   navigateTo(route: string): void {
     this.router.navigate([route]);
     this.closeMobileMenu();
   }

   private updateScrollLock(): void {
     if (this.isMobileMenuOpen) {
       this.renderer.addClass(document.body, 'no-scroll');
     } else {
       this.renderer.removeClass(document.body, 'no-scroll');
     }
   }
 
   @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 60;
  }

  isActive(route: string, exact: boolean = false): boolean {
    if (exact) return this.activeRoute === route || this.activeRoute === route + '/';
    return this.activeRoute.startsWith(route);
  }
}
