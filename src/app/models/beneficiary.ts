export interface Beneficiary {
    id?: number;  // Optional for new beneficiaries
    benificiaryName: string; 
    email:string;// Matches the C# model property
    createdOn: string; // Should be string to match JSON date format
    isActive: boolean; // Matches the C# model property
    accountDetailsObject: {
        id?: number;  // Optional for new account details
        accountNumber: string; // Matches the C# model property
        ifsc: string; // Matches the C# model property
        branch: string; // Matches the C# model property
    };
    paymentsList?: Payment[];  // Optional, matches C# model
}

export interface Payment {
    id: number;
    paymentType: string; // Assuming you have this field in your C# model
    amount: number; // Assuming you have this field in your C# model
    status: string; // Assuming you have this field in your C# model
    createdAt: string; // Use string to match the JSON format
    approvedBy: number; // Assuming you have this field in your C# model
    approvedAt: string; // Use string to match the JSON format
    transactions: Transaction[]; // Assuming you have this defined
}

export interface Transaction {
    id: number;
    transactionDate: string; // Use string to match the JSON format
    transactionAmount: number;
    transactionStatus: string;
}
export interface BeneficiaryPaymentRequest {
    beneficiaryId: number;
    paymentType: string;
    amount: number;
}
