import { Form, GlobalVariable, Message, Debug, Game } from 'skyrimPlatform'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'

function formReferenceToForm(ref: FormReference) {
    Debug.messageBox(`Game.getFormFromFile(${ref.formId}, ${ref.plugin})`)
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
    toggles?: Map<string, FormReference>
}

export default class InstallMessage {
    // TODO XXX make InstallWizard rootFolder not configurable? OR make this configurable...
    static messageTypesFolder = 'Data/InstallWizard/MessageTypes'

    public static show(type: string, text?: string) {
        if (this.exists(type)) {
            const messageTypeJson = MiscUtil.ReadFromFile(`${this.messageTypesFolder}/${type}.json`)
            try {
                const messageTypeConfig = JSON.parse(messageTypeJson) as InstallMessageConfig
                const message = Message.from(formReferenceToForm(messageTypeConfig.message))
                Debug.messageBox(`The mesage? ${message}`)
                if (message) {
                    const installMessage = new InstallMessage(message)
                    installMessage.show()
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

    public message: Message

    constructor(message: Message) {
        this.message = message
    }

    public show() {
        Debug.messageBox("SHOWING MESSAGE")
        this.message.show(0, 0, 0, 0, 0, 0, 0, 0, 0)
    }
}