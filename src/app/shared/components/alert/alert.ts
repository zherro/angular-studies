export class Alert {
    constructor(
        public readonly type: Alertype,
        public readonly message: string
    ) {}

}

export enum Alertype {
    SUCCESS,
    WARNING,
    DANGER,
    INFO
}