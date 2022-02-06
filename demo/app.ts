import { Module } from "core/decorators/mod.ts";
import { Feature } from "./feature.ts";

@Module({
  imports: [Feature]
})
export class App {}
