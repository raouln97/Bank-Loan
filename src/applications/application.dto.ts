export interface ApplicationReqDTO{
    loanAmount: number
    balanceAmount: number
    productId: string
    productDetailsId: string
    productName: string
    productType: string
}

export interface StatusUpdateDTO{
    status: string
}

export enum BankLoanInterface{
    UNDER_REVIEW="Under Review",
    APPROVED = "Approved",
    REJECTED= "Rejected",
    COMPLETED = "Completed"
}