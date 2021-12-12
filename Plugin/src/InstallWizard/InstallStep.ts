import { Debug } from 'skyrimPlatform'
import InstallMessage from './InstallMessage'

interface InstallStepProps {
    type?: string
    text?: string
    buttons?: Map<string, string>
}

export default class InstallStep {
    public static async execute(props: InstallStepProps) {
        return new InstallStep(props).execute()
    }

    public type = 'Generic'
    public text = ''
    public buttons = new Map<string, string>()

    constructor(props: InstallStepProps) {
        if (props.type) this.type = props.type
        if (props.text) this.text = props.text
        if (props.buttons)
            Object.entries(props.buttons).forEach(([key, value]) => {
                this.buttons.set(key, value)
            })
    }

    public async execute() {
        InstallMessage.show(this.type, this.text, Array.from(this.buttons.keys()))
    }
}