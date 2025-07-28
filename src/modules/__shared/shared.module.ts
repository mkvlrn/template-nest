import { Global, Module } from "@nestjs/common";
import { FetchService } from "#/modules/__shared/services/fetch.service.ts";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [FetchService],
  exports: [FetchService],
})
export class SharedModule {}
