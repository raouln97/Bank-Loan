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
import { PaymentReqDTO } from "./payments.dto";
import { PaymentsService } from "./payments.service";
  
  
  @Tags("Payments")
  @Route("/payments")
  export class PaymentsController extends Controller {
    private readonly paymentService: PaymentsService
  
    constructor() {
      super();
      this.paymentService = new PaymentsService();
    }

    @Get("/")
    public async getPayments(@Query("id") applicationId?: string): Promise<any> {
        if (applicationId) return this.paymentService.getPayment(applicationId)
        return this.paymentService.getPayments();
      }
  
    @Post("/create")
    public async makePayments(@Body() body: PaymentReqDTO): Promise<any> {
        return this.paymentService.makePayment(body)
    }
  }
  