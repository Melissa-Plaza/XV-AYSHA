import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetails implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.2 });

      setTimeout(() => {
        document.querySelectorAll('.event-card, .location-card').forEach(card => {
          observer.observe(card);
        });
      }, 100);
    }
  }
}
