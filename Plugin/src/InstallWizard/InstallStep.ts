import { Debug } from 'skyrimPlatform'
import InstallAction from './InstallAction'
import InstallMessage from './InstallMessage'

interface InstallStepProps {
    type?: string
    text?: string
    buttons?: Map<string, string>
}

export default class InstallStep {
    public static async execute(wizardName: string, props: InstallStepProps) {
        return new InstallStep(wizardName, props).execute()
    }

    wizardName: string
    public type = 'Generic'
    public text = ''
    public buttons = new Map<string, string>()

    constructor(wizardName: string, props: InstallStepProps) {
        this.wizardName = wizardName
        if (props.type) this.type = props.type
        if (props.text) this.text = props.text
        if (props.buttons)
            Object.entries(props.buttons).forEach(([key, value]) => {
                this.buttons.set(key, value)
            })
    }

    public async execute() {
        const selectedButton = await InstallMessage.show(this.type, this.text, Array.from(this.buttons.keys()))
        if (selectedButton) {
            const actionName = this.buttons.get(selectedButton)
            if (actionName)
                return InstallAction.perform(this.wizardName, actionName)
        }
        return
    }
}