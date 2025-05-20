import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserContextProvider from "./contexts/CurrentUserContextProvider.jsx";
import "./styles/index.css";
import { Provider } from "./components/ui/provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </Provider>
);
