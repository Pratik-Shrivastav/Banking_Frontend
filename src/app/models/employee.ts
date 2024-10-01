export interface Employee {
    employeeId?: number; // Optional for new employees
    name: string;
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
