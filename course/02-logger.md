# Logger

A simple logger implementation for logging messages to the a file descriptor.

## Content

* [x] Simple service

## Study Path

* [x] Creating new projects
* [x] Defining types
* [x] Implementing a logger

## Tasks

* [x] Create new project `packages/common` named `@xpr/jinn-common` for the logger project
* [x] Create a logger service in `@xpr/jinn-common` package with the following requirements

## Logger Requirements

The logger...

- [x] should work the same on any platform
- [x] should support the following levels: `TRACE` `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL` (60-10)
- [x] should allow logging string messages and an optional payload
- [x] should log messages with the following details:
    - [x] Unix epoch timestamp `ts:number`
    - [x] ISO date `time:string`
    - [x] Log level `level:number`
    - [x] Log message `message:string`
    - [x] Optional payload `payload:unknown`
- [x] should output log messages as a JSON string