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

    public executeStep(stepFilename: string) {
        Debug.messageBox(`RUNNING STEP ${stepFilename}`)
    }

    public getStepFilenames() {
        return MiscUtil.FilesInFolder(this.folder)
    }
}