// Function to set data in local storage
export const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting data in local storage:", error);
    }
  };
  
  // Function to get data from local storage
  export const getLocalStorage = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error getting data from local storage:", error);
      return null;
    }
  };
  