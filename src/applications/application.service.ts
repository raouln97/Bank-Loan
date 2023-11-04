import { applicationData, productsData } from "../../Model/data-model";
import { ApplicationReqDTO, BankLoanInterface } from "./application.dto";


export class ApplicationService {

    async getApplications(){
        return applicationData.find()
    }

    async getApplication(id: string){
        return applicationData.findById(id)
    }

    calculateMonthlyRepayment(annualInterestRate: number, principal: number, termInMonths: number){
        const monthlyRate = annualInterestRate / 12 / 100;
        const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termInMonths));

        return monthlyPayment;

    }

    async createApplication(body: ApplicationReqDTO){
        const product = await productsData.findById(body.productId)
        if(!product){
            throw new Error(`Product with id: ${body.productId} not found`)
        }
        const [productDetails] = product.productDetails.filter((detail) => detail.id === body.productDetailsId )
        if(!productDetails){
            throw new Error(`Product Details with id: ${body.productDetailsId} not found`)
        }
        const monthlyPayment = this.calculateMonthlyRepayment(productDetails.interestRate, body.loanAmount, productDetails.loanTerm)
        return applicationData.create({...body, monthlyRepayment: monthlyPayment, status: BankLoanInterface.UNDER_REVIEW})
    }

    async updateApplication(newStatus: string, applicationId: string){
        const application = await applicationData.findById(applicationId)
        if(!application){
            throw new Error(`Application with id: ${applicationId} not found`)
        }
        return applicationData.findByIdAndUpdate(applicationId, {status: newStatus})
    }
  }

  