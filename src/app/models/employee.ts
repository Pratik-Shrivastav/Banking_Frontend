export interface Employee {
    selected:any;
    employeeId?: number; // Optional for new employees
    name: string;
    email:string;
    designation: string;
    salary: number;
    accountDetailsObject: {
        id?: number;  // Optional for new account details
        accountNumber: string;
        ifsc: string;
        branch: string;
    };
    isActive: boolean;
}
