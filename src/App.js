//import logo from './logo.svg';
import './App.css';
import SiteHeader from './Components/PageBits/SiteHeader/SiteHeader.js';
import BackgroundCanvas from './Components/PageBits/BackgroundCanvas/BackgroundCanvas.js'

function App() {
  return ( 
    <div className="App">
      <BackgroundCanvas/>
      <SiteHeader/>
    </div>
  );
}


export default App;
