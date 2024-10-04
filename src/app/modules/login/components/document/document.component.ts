import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {
  fileForm: FormGroup;

  // Use a union type for keys
  files: { cin?: File, aoa?: File, pan?: File } = {};

  constructor(private fb: FormBuilder, private loginService:LoginService, private router:Router) {
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
      const formData = new FormData();
      // Append the files to the FormData object
      if (this.files.cin) {
        formData.append('cin', this.files.cin, this.files.cin.name);
      }
      if (this.files.aoa) {
        formData.append('aoa', this.files.aoa, this.files.aoa.name);
      }
      if (this.files.pan) {
        formData.append('pan', this.files.pan, this.files.pan.name);
      }

      // Make the HTTP POST request to the server
      this.loginService.upload(formData).subscribe(
         (response) =>{ console.log(response)},
        
        error => 
          {console.error('File upload failed', error)}
      );
      this.router.navigate(['Login/DocumentDisplay'])
    } else {
      console.log('Please select all required files.');
    }

  }
}
