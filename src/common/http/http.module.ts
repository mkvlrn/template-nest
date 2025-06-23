import { Module } from "@nestjs/common";
import { FetchService } from "#/common/http/services/fetch.service.ts";

@Module({
  imports: [],
  controllers: [],
  providers: [FetchService],
  exports: [FetchService],
})
export class HttpModule {}
