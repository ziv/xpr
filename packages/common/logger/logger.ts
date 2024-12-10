// log level
export type Level = 10 | 20 | 30 | 40 | 50 | 60;

// log message structure
export type Log = {
    ts: number;
    level: Level;
    time: string;
    message: string;
    payload?: unknown;
};

export class Logger {

    constructor(private readonly level: Level) {
    }

    fatal(message: string, payload: unknown) {
        this.log(10, message, payload);
    }

    error(message: string, payload: unknown) {
        this.log(20, message, payload);
    }

    warn(message: string, payload: unknown) {
        this.log(30, message, payload);
    }

    info(message: string, payload: unknown) {
        this.log(40, message, payload);
    }

    debug(message: string, payload: unknown) {
        this.log(50, message, payload);
    }

    trace(message: string, payload: unknown) {
        this.log(60, message, payload);
    }

    private log(level: Level, message: string, payload?: unknown) {
        if (level > this.level) {
            return;
        }
        // create the log message structure
        const now = new Date();
        const log: Log = {
            ts: now.getTime(),
            time: now.toISOString(),
            level,
            message,
            ...payload ? {payload} : {},
        };
        console.log(JSON.stringify(log));
    }
}
