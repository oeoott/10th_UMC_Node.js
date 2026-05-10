import { Controller, Get, Route, Tags } from "tsoa";
import { ApiResponse, success } from "../common/responses/response";
import { HealthCheckResponse } from "../dtos/health.dto";
import { getHealthCheck } from "../services/health.service";

@Route("health")
@Tags("Health")
export class HealthController extends Controller {
  @Get()
  public async getHealth(): Promise<ApiResponse<HealthCheckResponse>> {
    const health = await getHealthCheck();

    return success(health);
  }
}
