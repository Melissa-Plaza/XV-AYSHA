import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css'
})
export class Rsvp implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.2 });

      setTimeout(() => {
        document.querySelectorAll('.rsvp-section').forEach(el => observer.observe(el));
      }, 100);
    }
  }
}
