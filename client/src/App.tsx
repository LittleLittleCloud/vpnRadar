// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Client } from "./graphQL";
import WorldMap from "./components/map";
class App extends Component<{}, { apiResponse: string }> {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }
  componentDidMount() {
    this.callAPI();
  }
  render() {
    return (
      <ApolloProvider client={Client}>
        <div className="App">
          <header className="App-header">
            <p className="App-intro">{this.state.apiResponse}</p>
          </header>
        </div>
        <WorldMap />
      </ApolloProvider>
    );
  }
}

export default App;
