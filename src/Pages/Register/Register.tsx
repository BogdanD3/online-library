//interface RegisterForm {
  //  name: string;
    //surname: string;
    //email: string;
    //username: string;
    //password: string;
    //confirmPassword: string;
//}

//class RegisterPage {
  //  private form: RegisterForm;

    //constructor() {
      //  this.form = {
        //    name: '',
          //  surname: '',
            //email: '',
            //username: '',
            //password: '',
            //confirmPassword: '',
        //};
    //}

    //public render(): void {
      //  const container: HTMLElement = document.createElement('div');
        //container.className = 'register-container';

        //const title: HTMLElement = document.createElement('h1');
        //title.textContent = 'Register';
        //container.appendChild(title);

        //const form: HTMLElement = document.createElement('form');
        //form.id = 'register-form';
        //container.appendChild(form);

//        this.createFormFields(form);

//        const submitButton: HTMLElement = document.createElement('button');
  //      submitButton.type = 'submit';
    //    submitButton.textContent = 'Register';
      //  form.appendChild(submitButton);

        //document.body.appendChild(container);

    //    this.addEventListeners();
    //}

    //private createFormFields(form: HTMLElement): void {
      //  const fields: { [key: string]: string } = {
        //    name: 'Name',
          //  surname: 'Surname',
            //email: 'Email',
            //username: 'Username',
            //password: 'Password',
            //confirmPassword: 'Confirm Password',
        //};

        //Object.keys(fields).forEach((key: string) => {
          //  const label: HTMLElement = document.createElement('label');
            //label.textContent = fields[key];
            //form.appendChild(label);

            //const input: HTMLInputElement = document.createElement('input');
            //input.type = key === 'password' || key === 'confirmPassword' ? 'password' : 'text';
            //input.id = key;
            //input.name = key;
            //form.appendChild(input);
       // });
    //}

    //private addEventListeners(): void {
        //const form: HTMLFormElement = document.getElementById('register-form') as HTMLFormElement;

        //form.addEventListener('submit', (e: Event) => {
            //e.preventDefault();

            //const formData: RegisterForm = {
                //name: (document.getElementById('name') as HTMLInputElement).value,
                //surname: (document.getElementById('surname') as HTMLInputElement).value,
                //email: (document.getElementById('email') as HTMLInputElement).value,
                //username: (document.getElementById('username') as HTMLInputElement).value,
               // password: (document.getElementById('password') as HTMLInputElement).value,
             //   confirmPassword: (document.getElementById('confirm-password') as HTMLInputElement).value,
           // };

            //if (formData.password !== formData.confirmPassword) {
                //alert('Passwords do not match');
              //  return;
            //}

            // Poslati podatke na API
      //      console.log(formData);
    //    });
  //  }
//}

//const registerPage: RegisterPage = new RegisterPage();
//registerPage.render();