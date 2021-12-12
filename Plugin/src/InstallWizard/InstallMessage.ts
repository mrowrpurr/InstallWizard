import { Form, GlobalVariable, Message, Debug, Game, printConsole } from 'skyrimPlatform'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'

function formReferenceToForm(ref: FormReference) {
    return Game.getFormFromFile(parseInt(ref.formId), ref.plugin)
}

interface FormReference {
    formId: string
    plugin: string
}

interface InstallMessageConfig {
    message: FormReference
    text?: FormReference
    buttons: Array<string>
    toggles?: any
}

export default class InstallMessage {
    // TODO XXX make InstallWizard rootFolder not configurable? OR make this configurable...
    static messageTypesFolder = 'Data/InstallWizard/MessageTypes'

    public static async show(type: string, text?: string, buttons?: string[]): Promise<string | undefined> {
        if (this.exists(type)) {
            const messageTypeJson = MiscUtil.ReadFromFile(`${this.messageTypesFolder}/${type}.json`)
            try {
                const messageTypeConfig = JSON.parse(messageTypeJson) as InstallMessageConfig
                
                // Get Message
                const message = Message.from(formReferenceToForm(messageTypeConfig.message))
                if (message) {

                    // Set Text
                    if (text && messageTypeConfig.text) {
                        const textForm = formReferenceToForm(messageTypeConfig.text)
                        if (textForm) textForm.setName(text)
                    }

                    // Buttons
                    const toggles = new Map<string, GlobalVariable>()
                    Object.entries<FormReference>(messageTypeConfig.toggles).forEach(([key, value]) => {
                        const variable = GlobalVariable.from(formReferenceToForm(value))  
                        if (variable) {
                            toggles.set(key, variable)
                            variable.setValue(0)
                        }
                    })
                    if (buttons && messageTypeConfig.toggles) {
                        for (let buttonName of buttons) {
                            const buttonVariable = toggles.get(buttonName)
                            if (buttonVariable) {
                                if (buttonVariable) buttonVariable.setValue(1)
                            }
                        }
                    }

                    const resultIndex = await message.show(0, 0, 0, 0, 0, 0, 0, 0, 0)
                    return messageTypeConfig.buttons[resultIndex]
                }
            } catch (e) {
                if (e instanceof SyntaxError)
                    Debug.messageBox(`Invalid JSON for InstallWizard message type ${type}`)
            }
        }
    }

    public static exists(type: string) {
        return MiscUtil.FileExists(`${this.messageTypesFolder}/${type}.json`)
    }

    // public message: Message

    // constructor(message: Message) {
    //     this.message = message
    // }
}