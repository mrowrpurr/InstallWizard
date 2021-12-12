scriptName InstallWizard extends SkyrimPlatformConnection

string property WizardName auto

event OnSetup()
    ConnectionName = "InstallWizard"
    OnWizardInit()
endEvent

event OnWizardInit()
endEvent

function HandleEvent(string eventName, string handler = "")
    if ! handler
        handler = eventName
    endIf
    RegisterForModEvent(GetFullEventName(eventName), handler)
endFunction

string function GetFullEventName(string eventName)
    if WizardName
        return WizardName + "_" + eventName
    else
        return eventName
    endIf
endFunction

function NextStep()
    Send("NextStep", WizardName)
endFunction
