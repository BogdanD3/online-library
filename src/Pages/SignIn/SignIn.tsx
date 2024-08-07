import React, { useState } from "react";
import "./SignIn.css";
import ApiService from "../../Shared/api";

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await ApiService.signIn(username, password);

      if (response.error) {
        setError(response.error);
      } else {
        // User is authenticated, redirect to protected page
        // e.g., window.location.href = '/protected-page';
     
        // store response.data.data.token
        localStorage.setItem('auth_token', response.data.data.token);
        
        window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>

        <p style={{marginTop: '15px'}}>Don't have an account? &nbsp;
        <a href="/register" style={{color: "blue"}}>
          Register here
        </a>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;

//import * as React from 'react';

//interface SignInPageProps {
// Ako treba neki prop
//}

//interface SignInPageState {
//email: string;
//password: string;
//error: string | null;
//}

//class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
//constructor(props: SignInPageProps) {
//super(props);
//this.state = {
//email: '',
//password: '',
//error: null,
//};
//}

//handleemailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//this.setState({ email: event.target.value });
//};

//handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//this.setState({ password: event.target.value });
//};

//handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//event.preventDefault();

// Ovdje dodati logiku za login
// PRIMJER:
// fetch('/api/signin', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email: this.state.email, password: this.state.password }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.error) {
//       this.setState({ error: data.error });
//     } else {
//       // User is authenticated, redirect to protected page
//     }
//   })
//   .catch((error) => {
//     this.setState({ error: error.message });
//   });

//};

//render() {
//return (
//<div className="sign-in-page">
//<h1>Sign In</h1>
//<form onSubmit={this.handleSubmit}>
//<label>
//Email:
//<input
//type="text"
//value={this.state.email}
//onChange={this.handleEmailChange}
///>
// </label>
//<label>
//Password:
//<input
// type="password"
//value={this.state.password}
//onChange={this.handlePasswordChange}
///>
//</label>
//{this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
//<button type="submit">Sign In</button>
//</form>
//</div>
//);
//}
//}

//export default SignInPage;
export {};

// import React, { useState } from 'react';

// interface SignInPageProps {
//   // Ako treba neki prop
// }

// const SignInPage: React.FC<SignInPageProps> = () => {
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);

//   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('/api/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         // User is authenticated, redirect to protected page
//         // e.g., window.location.href = '/protected-page';
//       }
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="sign-in-page">
//       <h1>Sign In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={handleUsernameChange} />
//         </label>
//         <label>
//           Password:
//           <input type="password" value={password} onChange={handlePasswordChange} />
//         </label>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignInPage;
