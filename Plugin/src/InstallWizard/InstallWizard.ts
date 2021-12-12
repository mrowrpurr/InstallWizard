import InstallStep from './InstallStep'
import { Debug } from 'skyrimPlatform'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'

export default class InstallWizard {
    _currentStep = ''
    public name: string
    public folder: string

    constructor(name: string, folder: string) {
        this.name = name
        this.folder = folder
    }    

    public start() {
        const stepFilenames = this.getStepFilenames()
        if (stepFilenames && stepFilenames.length)
            this.executeStep(stepFilenames[0])
    }

    public async executeStep(stepFilename: string) {
        const stepJson = MiscUtil.ReadFromFile(`${this.folder}/${stepFilename}`)
        try {
            const result = await InstallStep.execute(JSON.parse(stepJson))
        } catch (e) {
            if (e instanceof SyntaxError)
                Debug.messageBox(`Invalid JSON for ${this.name} InstallWizard installation step ${stepFilename}`)
        }
    }

    public getStepFilenames() {
        return MiscUtil.FilesInFolder(this.folder)
    }
}