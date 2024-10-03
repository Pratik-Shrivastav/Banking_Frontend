import { SalaryDisbursementComponent } from "../modules/client/components/salary-disbursement/salary-disbursement.component";
import { Beneficiary } from "./beneficiary";

export interface AccountDetails {
    id: number;
    accountNumber: string;
    ifsc: string;
    branch: string;
    accountBalance: number;
}

export interface Employee {
    employeeId: number;
    name: string;
    email: string;
    designation: string;
    salary: number;
    createdAt: Date;
    accountDetailsObject: AccountDetails;
    isActive: boolean;
}

export interface Client {
    id: number;
    founderName: string;
    companyName: string;
    email: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    status: string;
    isActive: boolean;
    accountDetailsObject: AccountDetails;
    employeeList: Employee[];
    beneficiaryList: Beneficiary[];
    salaryDisbursementList: SalaryDisbursementComponent[];
}
