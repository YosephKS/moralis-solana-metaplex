import { useState, useEffect } from "react";
import {
  useMoralis,
  useMoralisSolanaApi,
  useMoralisSolanaCall,
} from "react-moralis";
import {
  Button,
  Row,
  Select,
  Icon,
  Blockie,
  CopyButton,
  useNotification,
  getEllipsisTxt,
} from "web3uikit";
import SolanaNFTCard from "./components/SolanaNFTCard";

const { Col } = Row;

const App = () => {
  const [chain, setChain] = useState("devnet");
  const notify = useNotification();
  const SolanaApi = useMoralisSolanaApi();
  const {
    user,
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    isAuthenticating,
    authenticate,
    enableWeb3,
  } = useMoralis();

  const { data, error, isLoading } = useMoralisSolanaCall(
    SolanaApi.account.getNFTs,
    {
      network: chain,
      address: user?.get("solAddress"),
    },
    {
      autoFetch: true,
    }
  );

  useEffect(() => {
    if (
      isInitialized &&
      isAuthenticated &&
      !isWeb3Enabled &&
      isWeb3EnableLoading
    ) {
      enableWeb3({ type: "sol" });
    }
  }, [
    enableWeb3,
    isAuthenticated,
    isInitialized,
    isWeb3EnableLoading,
    isWeb3Enabled,
  ]);

  return (
    <Row alignItems="center" justifyItems="center">
      <Col isFullWidth>
        <div style={{ margin: "1rem" }}>
          <Row alignItems="center" justifyItems="end">
            <Select
              defaultOptionIndex={1}
              width="220px"
              value={chain}
              onChange={(option) => setChain(option?.id)}
              options={[
                {
                  id: "mainnet",
                  label: "Solana Mainnet",
                  prefix: <Icon fill="#68738D" svg="solana" />,
                },
                {
                  id: "devnet",
                  label: "Solana Devnet",
                  prefix: <Icon fill="#68738D" svg="solana" />,
                },
              ]}
            />
            {isAuthenticated ? (
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  border: "1px solid",
                  borderRadius: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Blockie seed={user?.get("solAddress")} />
                {getEllipsisTxt(user?.get("solAddress"))}
                <CopyButton
                  text={`${getEllipsisTxt(user?.get("solAddress"))}`}
                  revertIn={6500}
                  onCopy={() =>
                    notify({
                      type: "success",
                      message: "Copied to clipboard",
                      title: "New Notification",
                      position: "topR",
                    })
                  }
                />
              </div>
            ) : (
              <Button
                icon="solana"
                onClick={() => authenticate({ type: "sol" })}
                isLoading={isAuthenticating || isWeb3EnableLoading}
                size="large"
                text="Connect Wallet"
                theme="primary"
                type="button"
                style={{ height: "56px" }}
              />
            )}
          </Row>
        </div>
      </Col>
      <Col isFullWidth>
        <Row alignItems="center" justifyItems="center">
          <h1>Solana NFT Portfolio</h1>
        </Row>
      </Col>
      <Col isFullWidth>
        {JSON.stringify(data)}
        {data?.map((nft) => {
          return <SolanaNFTCard chain={chain} nftAddress={nft?.mint} />;
        })}
      </Col>
    </Row>
  );
};

export default App;
