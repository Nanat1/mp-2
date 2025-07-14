import YourIPInfo from "./components/YourIPInfo.tsx";
import styled from 'styled-components';
import type { IPAdress} from "./interfaces/IPAdress.ts";
import { useEffect, useState } from 'react';

const PageWrapperDiv=styled.div`
    height: 100vh;
    width: 100vw;
    display: block;
    box-sizing: border-box;
    margin: auto;
    background-color: whitesmoke;
    font-family: Avenir;
`;

function App() {
    // Because only one ip is fetched, we use:
    const [currentIP, setCurrentIP] = useState<IPAdress>();
    // instead of:
    // const [currentIP, setCurrentIP] = useState<IPAdress[]>([]);

    useEffect(() => {
        async function fetchIP(): Promise<void> {
            // Two API is used from https://apipheny.io/free-api/
            // fetch User's current IP from IPify
            const responseIP = await fetch("https://api.ipify.org/?format=json");
            const { ip } = await responseIP.json();
            // fetch the IP's information from IPInfo
            const ipInfoUrl = `https://ipinfo.io/${ip}/geo`
            const responseInfo = await fetch(ipInfoUrl);
            const ipInfo = await responseInfo.json();
            setCurrentIP(ipInfo)
            // for Debugging use
            // console.log(ipInfo)
        }

        fetchIP()
            .then(() => console.log("Fetched IP and IP info Successfully."))
            .catch(err => console.log(err));
    }, []);

    return (
        <PageWrapperDiv>
            {currentIP ? (
                <YourIPInfo ipInfo={currentIP}/>
            ): (
                <p>Please wait, Loading IP Information......</p>
            )}

        </PageWrapperDiv>
    )
}

export default App
