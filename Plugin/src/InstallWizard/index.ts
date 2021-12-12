import InstallWizardEnvironment from './InstallWizardEnvironment';
import { once } from 'skyrimPlatform'

once('update', () => {
    InstallWizardEnvironment.boot()
})
