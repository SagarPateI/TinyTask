import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';
const USER_ID = 'user_id';

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

  // Saves user ID to AsyncStorage
  async saveID(userId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_ID, userId);
      console.log('User ID saved successfully:', userId);
    } catch (error) {
      console.error('Failed to save user ID:', error);
      throw new Error('Failed to save user ID');
    }
  },

  // Retrieves user ID from AsyncStorage
  async getID(): Promise<string | null> {
    try {
      const userId = await AsyncStorage.getItem(USER_ID);
      console.log('Auth has a user ID:', userId);
      return userId;
    } catch (error) {
      console.error('Failed to get user ID:', error);
      throw new Error('Failed to get user ID');
    }
  },

  // Clears user ID from AsyncStorage
  async clearID(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_ID);
      console.log('User ID cleared successfully');
    } catch (error) {
      console.error('Failed to clear user ID:', error);
      throw new Error('Failed to clear user ID');
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
