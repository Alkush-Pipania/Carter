const waitlist: { email: string; joinedAt: number }[] = []

// Add user to waitlist
export async function addToWaitlist(email: string): Promise<void> {
  // Check if user is already in waitlist
  const existingIndex = waitlist.findIndex((entry) => entry.email === email)

  if (existingIndex !== -1) {
    // User already exists, update timestamp
    waitlist[existingIndex].joinedAt = Date.now()
  } else {
    // Add new user
    waitlist.push({
      email,
      joinedAt: Date.now(),
    })
  }

  // Sort waitlist by join time (oldest first)
  waitlist.sort((a, b) => a.joinedAt - b.joinedAt)
}

// Get user's position in queue
export async function getQueuePosition(email: string): Promise<number> {
  const index = waitlist.findIndex((entry) => entry.email === email)

  if (index === -1) {
    throw new Error("User not found in waitlist")
  }

  return index + 1 // Position is 1-indexed
}

// Get total waitlist count
export async function getWaitlistCount(): Promise<number> {
  return waitlist.length
}

// Check if user exists in waitlist
export async function isUserInWaitlist(email: string): Promise<boolean> {
  return waitlist.some((entry) => entry.email === email)
}
