// define UI variables
const 
    H = document,
    searchUser = H.querySelector('#searchUser'),
    github = new Github ,
    ui = new UI;
    
// search  user event listerner
searchUser.addEventListener('keyup',(e)=>{
    if (searchUser.value !== '') {
        // make http call
    github.getUser(searchUser.value)
    .then(data =>{
      if(data.profile.message === 'Not Found') {
        // Show alert
        ui.showAlert('there is no user found','alert alert-danger');
        ui.clearProfile();    
      } else {
        // Show profile
        ui.showProfile(data.profile);
        ui.showUserRepos(data.repos);
      }
    })
  } else {
    // Clear profile
    ui.clearProfile();    
  }
}); 