import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function MyNotifications() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications" className="text-white">Email notifications</Label>
          <Switch id="emailNotifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="pushNotifications" className="text-white">Push notifications</Label>
          <Switch id="pushNotifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="weeklyDigest" className="text-white">Weekly digest</Label>
          <Switch id="weeklyDigest" defaultChecked />
        </div>
      </div>
    </div>
  )
}

