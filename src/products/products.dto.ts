import { TrigonometryExpressionOperator } from "mongoose"

export interface ProductReqDTO {
    name: string
    type: string
    productDetails: ProductDetails[]
}

export interface ProductDetails {
    loanTerm: number
    interestRate: number 
}