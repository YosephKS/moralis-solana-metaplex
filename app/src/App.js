import { Button } from "web3uikit";

const App = () => {
  return (
    <>
      <Button
        icon="solana"
        isFullWidth
        id="test-button-primary-large"
        onClick={function noRefCheck() {}}
        size="large"
        text="Connect Wallet"
        theme="primary"
        type="button"
      />
    </>
  );
};

export default App;
