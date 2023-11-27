import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';

export const AuthService = {
  // Saves user token to AsyncStorage
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('Token saved successfully:', token);
    } catch (error) {
      console.error('Failed to save token:', error);
      throw new Error('Failed to save token');
    }
  },

  // Retrieves user token from AsyncStorage
  async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      console.log('Retrieved token:', token);
      return token;
    } catch (error) {
      console.error('Failed to get token:', error);
      throw new Error('Failed to get token');
    }
  },

  // Clears user token from AsyncStorage
  async clearToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('Token cleared successfully');
    } catch (error) {
      console.error('Failed to clear token:', error);
      throw new Error('Failed to clear token');
    }
  },

  // Example function to check if a user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const authenticated = !!token;
      console.log('User authenticated:', authenticated);
      return authenticated;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  },
};
