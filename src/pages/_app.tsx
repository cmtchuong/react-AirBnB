import { useEffect, useRef } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
// import { ManagedUIContext } from "@contexts/ui.context";
// import ManagedModal from "@components/common/modal/managed-modal";
import store from "@redux/store";
import { ToastContainer } from "react-toastify";
// import "tailwindcss/tailwind.css";
import { AnimatePresence } from "framer-motion";
// import { initializeApollo } from "@services/graphql";
// import { ApolloProvider } from "@apollo/client";

// import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
// import { DefaultSeo } from "@components/common/default-seo";

// Load Open Sans and satisfy typeface font
// import "@fontsource/open-sans";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/300-italic.css";
// import "@fontsource/open-sans/600.css";
// import "@fontsource/open-sans/700.css";
// import "@fontsource/satisfy";
import "@fontsource/prata";
import "@fontsource/montserrat"
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/global.css"
import { getDirection } from "@utils/get-direction";
// import ScrollToTop from "@components/common/scroll-to-top";

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import { MantineProvider } from '@mantine/core';

const Noop: React.FC = ({ children }) => <>{children}</>;

function handleExitComplete() {
    if (typeof window !== "undefined") {
        window.scrollTo({ top: 0 });
    }
}



function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    // const apolloClient = initializeApollo();
    const queryClient = new QueryClient();

    const queryClientRef = useRef<any>();
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
    }
    const router = useRouter();
    // const dir = getDirection(router.locale);
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 });
        }
    }, []);

    const dir = getDirection(router.locale);
    useEffect(() => {
        document.documentElement.dir = dir;
    }, [dir]);
    const Layout = (Component as any).Layout || Noop;

    return (
        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            {/* <ApolloProvider client={apolloClient}> */}
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Provider store={store}>
                            {/* <ManagedUIContext> */}
                                <Layout pageProps={pageProps}>
                                    {/* <DefaultSeo /> */}
                                    <NextNProgress
                                        color="#fe595e"
                                        startPosition={0.2}
                                        stopDelayMs={200}
                                        height={3}
                                        showOnShallow={true}
                                        options={{
                                            easing: "ease",
                                            speed: 400,
                                        }}
                                    />
                                    <NextUIProvider>   
                                    <Component
                                        {...pageProps}
                                        key={router.route}
                                    />
                                    </NextUIProvider>
                                    <ToastContainer />
                                    {/* <ScrollToTop /> */}
                                </Layout>{" "}
                                {/* <ManagedModal /> */}
                            {/* </ManagedUIContext> */}
                        </Provider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </Hydrate>
                </QueryClientProvider>
            {/* </ApolloProvider> */}
        </AnimatePresence>
    );
}



// MyApp.getInitialProps = async (appContext) => {
//     const appProps = await App.getInitialProps(appContext);
//     return { ...appProps };
// };

export default appWithTranslation(MyApp);
