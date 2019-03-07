// Define UI Variables
const 
    profile = document.querySelector('#profile'),
    searchContainer = document .querySelector('.searchContainer'),
    search = document .querySelector('.search');


// UI Class
class UI{
    constructor(){
        this.profile = profile;
    }
    // show user profile
    showProfile(user){
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3">
              <img class="img-fluid mb-2" src="${user.avatar_url}">
              <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
      `;
    };
    // show user reposorories
    showUserRepos(repos){
        let outPut ='';
        repos.forEach(repo =>{
            outPut += `
            <div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
             <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
             <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
             <span class="badge badge-success">Forks: ${repo.forms_count}</span>
             </div>
             </div>
            </div>
            `;
        });  
        // output repos
        document .querySelector('#repos').innerHTML = outPut;
    }
    // clear all profiles
    clearProfile(){
        this.profile.innerHTML = ``;
    };
    // show alert message
    showAlert(msg,clsName){
        // clear prev alert
        this.clearAlert();
        // create div
        const alerDiv = document.createElement('div');
        // give it class name
        alerDiv.className = clsName;
        // all text
        alerDiv.appendChild(document.createTextNode(msg));
        // insert alert div
        searchContainer.insertBefore(alerDiv,search);
        // remove alert after 3 second
        setTimeout(() => {
            this.clearAlert();            
        }, 3000);
    };
    // clear prvous alert div
    clearAlert(){
        const curAlert = document.querySelector('.alert');
        if(curAlert)
            curAlert.remove();
    }
}