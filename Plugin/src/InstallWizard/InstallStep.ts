import { Debug } from 'skyrimPlatform'

interface InstallStepConfig {
    type: string
    text?: string
    buttons?: Map<string, string>
}

export default class InstallStep {
    public static loadFromConfig(config: InstallStepConfig) {
        if (this.isValidStepConfig(config)) {
            return new InstallStep(config.type)
        }
    }

    static isValidStepConfig(object: any): object is InstallStepConfig {
        return object.type !== undefined
    }

    public type: string

    constructor(type: string) {
        this.type = type
    }

    public async execute() {

    }
}