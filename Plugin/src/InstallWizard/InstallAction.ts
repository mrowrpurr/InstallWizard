import { Debug } from 'skyrimPlatform'
import * as sp from 'skyrimPlatform'

export interface InstallActionResult {
    nextStep: string
}

export default class InstallAction {
    public static async perform(wizardName: string, name: string): Promise<InstallActionResult | undefined> {
        // Check for built-in core functions
        switch (name) {
            case 'next': {
                return { nextStep: 'next' }
            }
            default: {
                const modEvent = (sp as any).ModEvent
                const handle = modEvent.Create(`${wizardName}_${name}`)
                modEvent.Send(handle)
                sp.printConsole(`[InstallWizard] ${wizardName}_${name}`)
                return { nextStep: 'wait' }
                break
            }
        }
    }
}
