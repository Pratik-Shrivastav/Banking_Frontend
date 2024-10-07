import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-add-bulk-employee',
  templateUrl: './add-bulk-employee.component.html',
  styleUrls: ['./add-bulk-employee.component.css']
})
export class AddBulkEmployeeComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<AddBulkEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast:ToastService
  ) {
    this.form = this.fb.group({
      csvFile: [null, Validators.required]  // FormControl for the file input
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
        const file = input.files[0];
        this.form.patchValue({ csvFile: file }); // Ensure this updates the form 
        console.log('Selected file:', file);
    }
}


  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      console.log(this.form.get('csvFile')?.value);
      const file = this.form.get('csvFile')?.value;
      formData.append('CsvFile', file);
      console.log(formData);
      
      // Call your service method to upload the CSV file
      this.clientService.uploadCsv(formData).subscribe(
        (response) => {
          // Handle success
          console.log('File uploaded successfully:', response);
          this.dialogRef.close();
          this.toast.showToast("File uploaded successfully");
        },
        error => {
          this.toast.showToast("File upload failed");
          console.error('File upload failed:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
