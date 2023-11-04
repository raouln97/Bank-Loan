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
import { ApplicationReqDTO, StatusUpdateDTO } from "./application.dto";
import { ApplicationService } from "./application.service";
  
  
  @Tags("Applications")
  @Route("/applications")
  export class ApplicationsController extends Controller {
    private readonly applicationService: ApplicationService
  
    constructor() {
      super();
      this.applicationService = new ApplicationService();
    }

    @Get("/")
    public async getApplications(@Query ("id") id?: string): Promise<any> {
        if (id) return this.applicationService.getApplication(id)
        return this.applicationService.getApplications();
      }
  
    @Post("/create")
    public async createApplications(@Body() body: ApplicationReqDTO): Promise<any> {
        return this.applicationService.createApplication(body)
    }

    @Post("/update")
    public async updatepplicationService(@Query("id") id: string, @Body() body: StatusUpdateDTO): Promise<any> {
        return this.applicationService.updateApplication(body.status, id)
    }
  }
  