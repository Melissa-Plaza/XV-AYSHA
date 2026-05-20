import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dress-code.html',
  styleUrl: './dress-code.css'
})
export class DressCode implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.2 });

      setTimeout(() => {
        document.querySelectorAll('.dresscode-card, .location-card').forEach(el => observer.observe(el));
      }, 100);
    }
  }
}
