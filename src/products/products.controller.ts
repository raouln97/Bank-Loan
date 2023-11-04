import {
    Controller,
    Route,
    Get,
    Security,
    Request,
    Path,
    Post,
    Body,
    Put,
    Tags,
    Query,
    Delete,
    Header,
  } from "tsoa";
import { ProductsService } from "./products.service";
import { ProductReqDTO } from "./products.dto";
  
  
  @Tags("Products")
  @Route("/products")
  export class ProductsController extends Controller {
    private readonly productService: ProductsService
  
    constructor() {
      super();
      this.productService = new ProductsService();
    }

    @Get("/")
    public async getProducts(@Query ("id") id?: string): Promise<any> {
        if (id) return this.productService.getProduct(id)
        return this.productService.getProducts();
      }
  
    @Post("/create")
    public async createProducts(@Body() body: ProductReqDTO): Promise<any> {
        return this.productService.createProducts(body)
    }
  }
  