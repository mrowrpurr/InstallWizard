import InstallWizard from './InstallWizard'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'
import { Debug } from 'skyrimPlatform'

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
        // XXX - This doesn't actually make sense.
        //       Why would we start multiple at once?
        //       We should start the first and THEN the second... and so on...
        const startupWizards = this.getStartupWizardNames()
        if (startupWizards) {
            for (let wizardName of startupWizards)
                if (MiscUtil.FileExists(`${this.wizardDefinitionsFolder}/${wizardName}`))
                    this.getWizard(wizardName, `${this.wizardDefinitionsFolder}/${wizardName}`).start()
        }
    }

    getStartupWizardNames() {
        return MiscUtil.FilesInFolder(this.startupFolder)
    }

    getWizard(wizardName: string, wizardDefinitionFolder: string) {
        return new InstallWizard(wizardName, wizardDefinitionFolder)
    }
}
