import { Module } from "common/decorators/mod.ts";
import { Feature } from "./feature.ts";
import { Users } from "./users.ts";

@Module({
  imports: [Feature, Users]
})
export class App {}
