import InstallWizard from './InstallWizard'
import * as MiscUtil from 'PapyrusUtil/MiscUtil'
import { Debug, once } from 'skyrimPlatform'
import { getConnection } from 'papyrusBridge'

export default class InstallWizardEnvironment {
    static currentlyInstallingWizard: InstallWizard

    public static boot(rootFolder = 'Data/InstallWizard') {
        getConnection('InstallWizard').onEvent(event => {
            if (this.currentlyInstallingWizard)
                this.currentlyInstallingWizard.nextStep()
        })
        new InstallWizardEnvironment(rootFolder).runAfterRacemenu()
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

    runAfterRacemenu() {
        once('menuClose', menu => {
            if (menu.name == 'RaceSex Menu')
                this.run()
            else
                this.runAfterRacemenu()
        })
    }

    async run() {
        // XXX - This doesn't actually make sense.
        //       Why would we start multiple at once?
        //       We should start the first and THEN the second... and so on...
        const startupWizards = this.getStartupWizardNames()
        if (startupWizards) {
            for (let wizardName of startupWizards)
                if (MiscUtil.FileExists(`${this.wizardDefinitionsFolder}/${wizardName}`)) {
                    const wizard = this.getWizard(wizardName, `${this.wizardDefinitionsFolder}/${wizardName}`)
                    InstallWizardEnvironment.currentlyInstallingWizard = wizard
                    await wizard.install()
                }
        }
    }

    getStartupWizardNames() {
        return MiscUtil.FilesInFolder(this.startupFolder)
    }

    getWizard(wizardName: string, wizardDefinitionFolder: string) {
        return new InstallWizard(wizardName, wizardDefinitionFolder)
    }
}
