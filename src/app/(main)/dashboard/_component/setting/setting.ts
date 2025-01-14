export type UserSettings = {
  preferredName: string;
  email: string;
  supportAccess: boolean;
  twoFactorEnabled: boolean;
}

export async function getUserSettings(): Promise<any> {
  // In a real app, this would fetch from your API
  return {
    preferredName: "Alkush Pipania",
    email: "workofalkushpipania@gmail.com",
    supportAccess: false,
    twoFactorEnabled: false,
  }
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<void> {
  // In a real app, this would send to your API
  console.log('Updating settings:', settings)
}

export async function deleteAccount(): Promise<void> {
  // In a real app, this would send to your API
  console.log('Deleting account')
}

