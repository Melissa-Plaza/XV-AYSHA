import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit {
  displayText = '';
  fullText = 'Aysha';
  sparkles: any[] = [];

  ngOnInit() {
    this.typeWriter();
    this.generateSparkles();
  }

  typeWriter() {
    let i = 0;
    const interval = setInterval(() => {
      if (i < this.fullText.length) {
        this.displayText += this.fullText.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200);
  }

  generateSparkles() {
    for (let i = 0; i < 20; i++) {
      this.sparkles.push({
        x: Math.random() * 100 + '%',
        y: Math.random() * 100 + '%',
        delay: Math.random() * 3 + 's'
      });
    }
  }
}
