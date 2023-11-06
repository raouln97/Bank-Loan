import { BankLoanInterface } from "../applications/application.dto";
import { applicationData, paymentData, productsData } from "../../Model/data-model";
import { PaymentReqDTO } from "./payments.dto";


export class PaymentsService {

    async getPayments(){
        return paymentData.find()
    }

    async getPayment(id: string){
        return paymentData.find({applicationId: id})
    }

    recalculateRepayment(principal: number, termInMonths: number, annualInterestRate: number, paymentAmount: number) {
        if(paymentAmount > principal){
            throw new Error("Payment amount larger than principal amount")
        }
        // Deduct the payment from the principal
        principal -= paymentAmount;
    
        // Monthly interest rate
        const rate = annualInterestRate / 12 / 100;
    
        // Monthly repayment calculation
        const monthlyRepaymentRaw = principal * (rate * Math.pow((1 + rate), termInMonths)) / (Math.pow((1 + rate), termInMonths) - 1);
        const monthlyRepayment = parseFloat(monthlyRepaymentRaw.toFixed(2));

    
        return {monthlyRepayment, updatedPrincipal: principal};
    }

    async makePayment(body: PaymentReqDTO){
        const application = await applicationData.findById(body.applicationId)
        if (!application){
            throw new Error(`Application with id: ${body.applicationId} not found`)
        }

        const product = await productsData.findById(application.productId)
        if(!product){
            throw new Error(`Product with id: ${application.productId} not found`)
        }

        const [productDetails] = product.productDetails.filter((detail) => detail.id === application.productDetailsId )
        if(!productDetails){
            throw new Error(`Product Details with id: ${application.productDetailsId} not found`)
        }

        const paymentDetails = this.recalculateRepayment(application.balanceAmount, productDetails.loanTerm, productDetails.interestRate, body.paymentAmount)

        if (paymentDetails.updatedPrincipal === 0){
            await applicationData.findOneAndUpdate(application._id, {monthlyRepayment: paymentDetails.monthlyRepayment, balanceAmount: paymentDetails.updatedPrincipal, status: BankLoanInterface.COMPLETED})
        }

        await applicationData.findOneAndUpdate(application._id, {monthlyRepayment: paymentDetails.monthlyRepayment, balanceAmount: paymentDetails.updatedPrincipal})

        return paymentData.create(body)

        
    }


  }

  