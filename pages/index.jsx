import Image from "next/image";
import { useState } from "react";
import buildspaceLogo from "../assets/buildspace-logo.png";
import youtubeLogo from "../assets/youtube.png";
import { ChainId, ConnectWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Pricing from "./Pricing";
import Features from "./Features";
import Header from "./Header";
import Contacts from "./Contacts";
import Home from "./Home";

const App = () => {
  const [menuState, setMenuState] = useState(1);

  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <PayPalScriptProvider
        options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}
      >
        <Header onMenuStateChange={(state) => setMenuState(state)} />
        <div className="root">
          {/* <div className="navbar">
            <Image src={youtubeLogo} className="logo" /> */}

          {/* <div className="connect-wallet-wrapper">
              <ConnectWallet />
            </div>
          </div> */}
          {menuState === 1 && <Home />}
          {menuState === 2 && <Features />}
          {menuState === 3 && <Pricing />}
          {menuState === 4 && <Contacts />}
        </div>
      </PayPalScriptProvider>
    </ThirdwebProvider>
  );
};

export default App;
