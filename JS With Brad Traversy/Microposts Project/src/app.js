import {http} from './http';
import {ui} from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded',getPosts);
// listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);
// listen for delete post by id
document.querySelector('#posts').addEventListener('click',deletePost);
// listen for update state post by id
document.querySelector('#posts').addEventListener('click',enableEdit);
// listen for cancel Btn 
document.querySelector('.card-form').addEventListener('click',cancelEdit);

// get all posts
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data));
} 
// submit post
function submitPost(post){
  const 
    title = document.querySelector('#title').value,
    body = document.querySelector('#body').value,
    id = document.querySelector('#id').value,
    data ={
      title,
      body
  };
  if (data.title !== "" && data.body !=="") {
    if (id === '') {
      // add post
      http.post('http://localhost:3000/posts',data)
      .then(data =>{
        ui.showAlert(`${data.title} added`,'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err =>console.log(err)) 
    } else {
      // edit post
      http.put(`http://localhost:3000/posts/${id}`,data)
      .then(data =>{
        ui.showAlert(`${data.title} updated`,'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err =>console.log(err))
    }
  } else
  ui.showAlert(`Please Fill in all fields`,'alert alert-danger');
}
function deletePost(e){
  if (e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm(`Are you sure ?`)){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data =>{
        ui.showAlert(`post Deleted`,'alert alert-success');
        getPosts();
      }) 
      .catch(err => console.log(err))
    }
  }
  e.preventDefault();
}
// enable edit State
function enableEdit(e){
  if (e.target.parentElement.classList.contains('edit')){ // card-title * card-text
    const post = {
      id : e.target.parentElement.dataset.id,
      body : e.target.parentElement.previousElementSibling.textContent,
      title : e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    };
    // fill form with current post
    ui.fillForm(post);
  }
  e.preventDefault();
}
function cancelEdit(e){
  if (e.target.classList.contains('post-cancel')){ // card-title * card-text
    ui.changeFormState('add');

  }
  e.preventDefault();
}
// if(confirm(`Are you sure ?`)){
//   http.delete(`http://localhost:3000/posts/${id}`)
//   .then(data =>{
//     ui.showAlert(`post Deleted`,'alert alert-success');
//     getPosts();
//   }) 
//   .catch(err => console.log(err))
// }
