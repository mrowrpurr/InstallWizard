import { Debug } from 'skyrimPlatform'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'

export default class InstallWizardEnvironment {
    public static boot(rootFolder = 'Data/InstallWizard') {
        new InstallWizardEnvironment(rootFolder).run()
    }
    
    _loaded = false
    public rootFolder: string
    public startupFolder: string
    public messageTypesFolder: string
    public wizardDefinitionsFolder: string
    
    constructor(rootFolder: string) {
        this.rootFolder = rootFolder
        this.startupFolder = `${rootFolder}/Startup`
        this.messageTypesFolder = `${rootFolder}/MessageTypes`
        this.wizardDefinitionsFolder = `${rootFolder}/Wizards`
    }

    public run() {
        const x = MiscUtil.FilesInFolder('FooBarThisDoesNotExist')
        if (x == null)
            Debug.messageBox("IS NULL")
        else
            Debug.messageBox("IS NOT NULL")
    }

    getStartupWizardNames() {
        return MiscUtil.FilesInFolder(this.startupFolder)
    }
}
