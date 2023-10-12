import { PropsWithChildren } from "react";
// import { WagmiConfig, createConfig, configureChains } from "wagmi";
// import { celoAlfajores } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import {
//   ApolloProvider,
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
// } from "@apollo/client";

// const { publicClient, chains } = configureChains(
//   [celoAlfajores],
//   [publicProvider()]
// );

// const config = createConfig({
//   autoConnect: false,
//   publicClient,
//   connectors: [
//     new InjectedConnector({ chains }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId: "9143f3f7d463e1b951f28e8d460ba579",
//       },
//     }),
//   ],
// });

// const httpLink = createHttpLink({
//   uri: "https://api.thegraph.com/subgraphs/name/ricy137/hook",
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           profiles: {
//             keyArgs: false,
//             merge(existing = [], incoming: any[]) {
//               return [...existing, ...incoming];
//             },
//           },
//         },
//       },
//     },
//   }),
// });

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    // <WagmiConfig config={config}>
    //   <ApolloProvider client={client}>
    <>{children}</>
    //   </ApolloProvider>
    // </WagmiConfig>
  );
};

export default Providers;
