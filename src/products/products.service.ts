import { ProductReqDTO } from "./products.dto";
import { productsData } from "../../Model/data-model";


export class ProductsService {

    async getProducts(){
        return productsData.find()
    }

    async getProduct(id: string){
        return productsData.findById(id)
    }

    async createProducts(body: ProductReqDTO){
        return productsData.create(body)
    }
  }