import { Module } from "@nestjs/common";
import { FetchService } from "~/common/http/services/fetch.service.js";

@Module({
  imports: [],
  controllers: [],
  providers: [FetchService],
  exports: [FetchService],
})
export class HttpModule {}
