import mongoose, { Document } from "mongoose";

// Define an interface representing a user document

export interface ProductDetailsDTO extends Document {
  loanTerm: number
  interestRate: number
}
export interface ProductsDTO extends Document {
  name: string;
  type: string;
  productDetails: ProductDetailsDTO[]
}

export interface ApplicationsDTO extends Document {
  status: string
  loanAmount: number
  balanceAmount: number
  createdDate: Date
  productId: string
  productDetailsId: string
  productName: string
  productType: string
  monthlyRepayment: string
}

export interface PaymentsDTO extends Document {
  applicationId: string
  paymentDate: Date
  paymentAmount: Number
}

const ProductDetailsSchema =  new mongoose.Schema<ProductDetailsDTO>({
  loanTerm: {
      type: Number,
      required: true
  },
  interestRate: {
      type: Number,
      required: true
  }
});

const productSchema = new mongoose.Schema<ProductsDTO>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  productDetails: [ProductDetailsSchema] 
});

const applicationSchema = new mongoose.Schema<ApplicationsDTO>({
  status: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  balanceAmount: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: String,
    required: true,
  },
  productDetailsId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  monthlyRepayment: {
    type: String,
    required: true,
  },
});

const paymentSchema = new mongoose.Schema<PaymentsDTO>({
  applicationId: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  
});

export const productsData = mongoose.model<ProductsDTO>(
  "productSchema",
  productSchema
);

export const applicationData = mongoose.model<ApplicationsDTO>(
  "applicationSchema",
  applicationSchema
);

export const paymentData = mongoose.model<PaymentsDTO>(
  "paymentSchema",
  paymentSchema
);
