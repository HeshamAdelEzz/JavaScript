class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }
  // fill inputs form by editable post
  fillForm(post){
    this.titleInput.value =post.title;
    this.bodyInput.value =post.body;
    this.idInput.value =post.id;

    this.changeFormState('edit');
  }
      // clear id input hidden
  clearIDInput(){
    this.idInput.value = "";
  }
  changeFormState(type){
    if (type === 'edit') {
      this.postSubmit.textContent = 'update post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      // create cancel Btn
      const btn = document.createElement('button');
      btn.className = 'post-cancel btn btn-light btn-block';
      btn.appendChild(document.createTextNode('Cancel Edit'));
      // get parent
     const cardForm = document.querySelector('.card-form');
     // get element to insert before
      const formEnd = document.querySelector('.form-end');
      // inser btn
      cardForm.insertBefore(btn,formEnd);

      //this.forState = type;
    } else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // remove cancel btn
      if (document.querySelector('.post-cancel'))
          document.querySelector('.post-cancel').remove();
      // clear id input hidden
      this.clearIDInput();
      // clear input fields
      this.clearFields();

    }  
  }
  clearFields(){
    this.titleInput.value ='';
    this.bodyInput.value ='';
  }
  showAlert(msg,className){
    this.clearAlert();
    // create Div
    const div = document.createElement('div');
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector('.postsContainer');
    // get posts
    const post = document.querySelector('#posts');
    // insert alert div
    container.insertBefore(div,post);
    // close Alert div after 3 secons
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  clearAlert(){
    const currentAlert = document.querySelector('.alert');
    if (currentAlert)
      currentAlert.remove();
  }
}

export const ui = new UI();