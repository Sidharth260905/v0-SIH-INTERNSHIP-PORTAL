export class LocalStorageManager {
  static setItem(key: string, value: any): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Failed to save to localStorage: ${key}`, error)
      return false
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error(`Failed to read from localStorage: ${key}`, error)
      return defaultValue || null
    }
  }

  static removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Failed to remove from localStorage: ${key}`, error)
      return false
    }
  }

  static clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error("Failed to clear localStorage", error)
      return false
    }
  }

  // Auto-save form data with debouncing
  static autoSave(key: string, data: any, delay = 500) {
    const timeoutKey = `${key}_timeout`

    // Clear existing timeout
    const existingTimeout = (window as any)[timeoutKey]
    if (existingTimeout) {
      clearTimeout(existingTimeout)
    }
    // Set new timeout
    ;(window as any)[timeoutKey] = setTimeout(() => {
      this.setItem(key, data)
    }, delay)
  }
}

// Offline state management
export class OfflineManager {
  private static listeners: Set<(isOnline: boolean) => void> = new Set()

  static init() {
    window.addEventListener("online", () => this.notifyListeners(true))
    window.addEventListener("offline", () => this.notifyListeners(false))
  }

  static isOnline(): boolean {
    return navigator.onLine
  }

  static addListener(callback: (isOnline: boolean) => void) {
    this.listeners.add(callback)
  }

  static removeListener(callback: (isOnline: boolean) => void) {
    this.listeners.delete(callback)
  }

  private static notifyListeners(isOnline: boolean) {
    this.listeners.forEach((callback) => callback(isOnline))
  }

  // Queue actions for when back online
  static queueAction(action: string, data: any) {
    const queue = LocalStorageManager.getItem("offline_queue", [])
    queue.push({ action, data, timestamp: Date.now() })
    LocalStorageManager.setItem("offline_queue", queue)
  }

  static getQueuedActions() {
    return LocalStorageManager.getItem("offline_queue", [])
  }

  static clearQueue() {
    LocalStorageManager.removeItem("offline_queue")
  }
}
