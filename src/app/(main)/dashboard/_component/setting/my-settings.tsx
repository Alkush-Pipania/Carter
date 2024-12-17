import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function MySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="text-white">Enable notifications</Label>
          <Switch id="notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode" className="text-white">Dark mode</Label>
          <Switch id="darkMode" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="autoSave" className="text-white">Auto-save changes</Label>
          <Switch id="autoSave" />
        </div>
      </div>
    </div>
  )
}

