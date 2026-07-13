import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.html',
  styleUrls: ['./messages.css'],
})
export class MessagesComponent {
  successMessage = input<string | null>(null);
  error = input<string | null>(null);
}
