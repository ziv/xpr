import { Module } from "core/mod.ts";
import { Feature } from "./feature.ts";
import { Users } from "./users.ts";

@Module({
  imports: [Users, Feature]
})
export class App {
}
