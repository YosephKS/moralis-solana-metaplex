import { useEffect, useState } from "react";
import { Card } from "antd";
import { useMoralisSolanaApi, useMoralisSolanaCall } from "react-moralis";
import { Tag, getEllipsisTxt } from "web3uikit";

const SolanaNFTCard = (props) => {
  const { chain = "mainnet", nftAddress } = props;
  const [metadata, setMetadata] = useState({});
  const SolanaApi = useMoralisSolanaApi();
  const { data, error, isLoading } = useMoralisSolanaCall(
    SolanaApi?.nft?.getNFTMetadata,
    {
      network: chain,
      address: nftAddress,
    },
    {
      autoFetch: true,
    }
  );

  //   useEffect(() => {
  //     if (chain && nftAddress && !data && !isLoading) {
  //       fetch();
  //     }
  //   }, [chain, data, fetch, isLoading, nftAddress]);

  useEffect(() => {
    if (data) {
      fetch(data?.metaplex?.metadataUri)
        .then((response) => response.json())
        .then((result) => setMetadata(result));
    }
  });

  return (
    <>
      {JSON.stringify(metadata)}
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={metadata?.name} src={metadata?.image} />}
      >
        <Card.Meta title={getEllipsisTxt(nftAddress)} />
        {/* {metadata?.attributes?} */}
        <Tag text="tex" />
      </Card>
    </>
  );
};

export default SolanaNFTCard;
