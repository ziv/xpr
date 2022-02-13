import { Module } from "packages/core/mod.ts";
import HttpController from "./http-controller.ts";

@Module({
  controllers: [HttpController],
})
export default class HttpModule {
}
