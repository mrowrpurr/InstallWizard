scriptName InstallWizard extends Quest

string property WizardName auto

event OnInit()
    OnSetup()
endEvent

event OnSetup()
endEvent

function HandleEvent(string eventName)
    OnEvent(eventName)
endFunction

function OnEvent(string eventName, string handler = "")
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
