import { useEffect, useState } from "react";
import { Card } from "antd";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import { Row, Tag, Skeleton, getEllipsisTxt } from "web3uikit";

const SolanaNFTCard = (props) => {
  const { chain = "mainnet", nftAddress } = props;
  const [metadata, setMetadata] = useState({});
  const SolanaApi = useMoralisSolanaApi();
  const { data, isFetching } = useMoralisSolanaCall(
    SolanaApi?.nft?.getNFTMetadata,
    {
      network: chain,
      address: nftAddress,
    },
    {
      autoFetch: true,
    }
  );

  const fetchMetadata = () => {
    if (data) {
      fetch(data?.metaplex?.metadataUri)
        .then((response) => response.json())
        .then((result) => setMetadata(result));
    }
  };

  useEffect(() => {
    fetchMetadata();
  });

  return (
    <Card
      hoverable
      style={{
        width: 300,
        boxShadow: "rgb(0 0 0 / 8%) 0px 4px 15px",
        borderRadius: "15px",
      }}
      cover={
        !isFetching ? (
          <img alt={metadata?.name} src={metadata?.image} />
        ) : (
          <Skeleton theme="image" width="300px" height="300px" />
        )
      }
    >
      {!isFetching ? (
        <>
          <Card.Meta title={getEllipsisTxt(nftAddress)} />
          <Row alignItems="center" style={{ marginTop: "1rem", marginLeft: 0 }}>
            {metadata?.attributes?.map((m) => {
              return <Tag text={m?.value} />;
            })}
          </Row>
        </>
      ) : (
        <>
          <Skeleton theme="text" />
          <Skeleton theme="text" />
          <Skeleton theme="text" />
        </>
      )}
    </Card>
  );
};

export default SolanaNFTCard;
