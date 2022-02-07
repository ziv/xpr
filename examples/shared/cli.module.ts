import { Module } from "xpr/core/mod.ts";
import { Users } from "./users.ts";
import { Feature } from "./feature.ts";

@Module({
  imports: [Users, Feature]
})
export default class CliModule {

}
