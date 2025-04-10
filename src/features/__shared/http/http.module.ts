import { Module } from "@nestjs/common";
import { FetchService } from "~/features/__shared/http/services/fetch.service.js";

@Module({
  imports: [],
  controllers: [],
  providers: [FetchService],
  exports: [FetchService],
})
export class HttpModule {}
