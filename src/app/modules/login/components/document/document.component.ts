import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {
  fileForm: FormGroup;

  // Use a union type for keys
  files: { cin?: File, aoa?: File, pan?: File } = {};

  constructor(private fb: FormBuilder) {
    this.fileForm = this.fb.group({
      cin: [null, Validators.required],
      aoa: [null, Validators.required],
      pan: [null, Validators.required]
    });
  }

  // Use 'keyof typeof this.files' to ensure type safety
  onFileSelected(event: Event, fileType: keyof typeof this.files): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.files[fileType] = input.files[0];  // Now TypeScript knows that 'fileType' can only be 'cin', 'aoa', or 'pan'
      this.fileForm.patchValue({ [fileType]: input.files[0].name });
    }
  }

  uploadFiles(): void {
    if (this.fileForm.valid) {
      // Implement your file upload logic here
      console.log('Uploading files:', this.files);
    } else {
      console.log('Please select all required files.');
    }
  }
}
