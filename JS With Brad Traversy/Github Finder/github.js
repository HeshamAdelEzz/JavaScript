class Github {
    constructor() {
      this.client_id = 'a09e5c4f6d1d0c3301f1';
      this.client_secret = 'e2e27190e2097d253d4cad5a7d50d094804241dd';
      this.repo_count = 5;
      this.repo_sort = 'created : asc';
    }
  
    async getUser(user) {
      const 
        profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`),       
        profile = await profileResponse.json(),

        repoResponse =await fetch(`https://api.github.com/users/${user}/repos?
        per_page=${this.repo_count}&sort=${this.repo_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`),       
        repos = await repoResponse.json();
      return {
        profile,
        repos
      }
    }
  }