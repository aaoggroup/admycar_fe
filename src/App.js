import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTop from "./components/NavBar/NavbarTop";
import AddCampaign from "./components/AddCampaign/AddCampaign";

function App() {
  return (
    <>
      <NavbarTop />
      <AddCampaign />
      <div className="App">
        <div>Admycar</div>
      </div>
    </>
  );
}

export default App;
