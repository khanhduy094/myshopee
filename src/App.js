import 'normalize.css';
import './assets/styles/global.scss';
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from 'react-toastify';
import Authorization from './components/Authorization/Authorization';
import Routes from './Routes';



function App() {

  return (
    <div className="App">
      <Routes />
      <ToastContainer />
      <Authorization />
    </div>
  );
}

export default App;
