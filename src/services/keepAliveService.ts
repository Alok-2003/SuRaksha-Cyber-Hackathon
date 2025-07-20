/**
 * Keep Alive Service for Render API
 * Prevents the Render service from going to sleep by periodically pinging it
 */

class KeepAliveService {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly apiUrl = 'https://securelink-prediction-api.onrender.com/';
  private readonly pingInterval = 14 * 60 * 1000; // 14 minutes (Render sleeps after 15 minutes)
  private isActive = false;

  /**
   * Start the keep-alive service
   */
  start(): void {
    if (this.isActive) {
      console.log('Keep-alive service is already running');
      return;
    }

    this.isActive = true;
    console.log('Starting keep-alive service for Render API...');

    // Ping immediately on start
    this.pingAPI();

    // Set up interval to ping every 14 minutes
    this.intervalId = setInterval(() => {
      this.pingAPI();
    }, this.pingInterval);

    console.log(`Keep-alive service started. Pinging every ${this.pingInterval / 1000 / 60} minutes.`);
  }

  /**
   * Stop the keep-alive service
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isActive = false;
    console.log('Keep-alive service stopped');
  }

  /**
   * Check if the service is currently active
   */
  isRunning(): boolean {
    return this.isActive;
  }

  /**
   * Ping the API to keep it awake
   */
  private async pingAPI(): Promise<void> {
    try {
      console.log(`[${new Date().toLocaleTimeString()}] Pinging Render API to keep it awake...`);
      
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'KeepAlive-Service'
        }
      });

      if (response.ok) {
        console.log(`[${new Date().toLocaleTimeString()}] ✅ Render API ping successful (${response.status})`);
      } else {
        console.warn(`[${new Date().toLocaleTimeString()}] ⚠️ Render API ping returned ${response.status}`);
      }
    } catch (error) {
      console.error(`[${new Date().toLocaleTimeString()}] ❌ Failed to ping Render API:`, error);
    }
  }

  /**
   * Manual ping for testing
   */
  async manualPing(): Promise<void> {
    await this.pingAPI();
  }
}

// Create and export a singleton instance
export const keepAliveService = new KeepAliveService();

// Auto-start the service when the module is imported
if (typeof window !== 'undefined') {
  // Only start in browser environment
  keepAliveService.start();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    keepAliveService.stop();
  });
}
