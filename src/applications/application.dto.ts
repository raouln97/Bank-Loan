export interface ApplicationReqDTO{
    applicationName: string
    applicationReason: string
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