// myApiLib.js

class WikiSurveyUserApi {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }

    
    async createUser(demographicsData) {
      try {
        const response = await fetch(`${this.baseURL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ demographics: demographicsData }),
        });
  
        if (!response.ok) {
          throw new Error('Error creating user');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
    setSessionCookie(name, value, expiresIn) {
      console.log('saving a cookie for:', name);
      const date = new Date();
      date.setTime(date.getTime() + expiresIn * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WikiSurveyUserApi;
  } else {
    window.WikiSurveyUserApi = WikiSurveyUserApi;
  }
  