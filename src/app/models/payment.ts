// payment.ts
export interface Payment {
    id: number;
    paymentType: string;
    amount: number;
    status: string;
    createdAt: string; // Change this to 'string' if you want to keep it as a string
    approvedBy: number;
    approvedAt: string; // If you're using a Date, ensure it's consistently defined
    transactions: any[]; // Adjust this type based on your actual transaction structure
}
