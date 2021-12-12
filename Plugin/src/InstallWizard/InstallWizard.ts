import InstallStep from './InstallStep'
import { Debug } from 'skyrimPlatform'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'

export default class InstallWizard {
    private _currentStep = -1
    private _stepFilenames: string[] | null = null
    name: string
    folder: string
    completedCallback?: () => void

    constructor(name: string, folder: string) {
        this.name = name
        this.folder = folder
    }    

    async install(): Promise<void> {
        return new Promise<void>(resolve => {
            this.completedCallback = resolve
            this._stepFilenames = this.getStepFilenames()
            if (this._stepFilenames && this._stepFilenames.length)
                this.nextStep()
            else
                resolve()
        })
    }

    nextStep() {
        if (this._stepFilenames) {
            this._currentStep++
            if (this._currentStep < this._stepFilenames.length) {
                const nextStep = this._stepFilenames[this._currentStep]
                this.executeStep(nextStep)
            } else {
                this.completedCallback!()
            }
        }
    }

    async executeStep(stepFilename: string) {
        const stepJson = MiscUtil.ReadFromFile(`${this.folder}/${stepFilename}`)
        try {
            const result = await InstallStep.execute(this.name, JSON.parse(stepJson))
            if (result) {
                switch (result.nextStep) {
                    case 'next': {
                        this.nextStep()
                        break
                    }
                    case 'wait': {
                        // Nothing, we need to wait for an operation to be performed
                        break
                    }
                    default: {
                        Debug.messageBox(`Jeepers creepers! I don't know how to handle the 'next step' ${result.nextStep}`)
                        break
                    }
                }
            }
        } catch (e) {
            if (e instanceof SyntaxError)
                Debug.messageBox(`Invalid JSON for ${this.name} InstallWizard installation step ${stepFilename}`)
        }
    }

    private getStepFilenames() {
        return MiscUtil.FilesInFolder(this.folder)
    }
}
