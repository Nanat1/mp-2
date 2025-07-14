import styled from 'styled-components';
import type {IPAdress} from "../interfaces/IPAdress.ts";

const ObjectListDiv = styled.div`
    margin: 0 auto;
    max-width: 50%;
    font-size: calc(2px + 1.5vw);
    background-color: transparent;
    h1{
        color: #535bf2;
    }
`

const SingleObjectDiv = styled.div`
    display: block;
    margin: 0 auto;
    padding: calc(10px + 1.5vw);
    border: #888888 2px solid;
`

export default function YourIPInfo(props : { ipInfo: IPAdress /*only one ip is fetched, so no"[]"*/}) {
    const ipData = props.ipInfo;

    return (
        <ObjectListDiv>
            {
                // Because there is only one ipAdress object, there is no need to use map:
                // props.ipInfo.map((add: IPAdress) => <.../>)
                // if used would cause error:
                // Uncaught TypeError: can't access property "map", of prop.ipInfo is undefined
                <SingleObjectDiv>
                    <h1>Your IP Address We Found: {ipData.ip}</h1>
                    <p>You are probably in {ipData.city} - {ipData.region}, {ipData.country} {ipData.postal} ({ipData.loc}).</p>
                    <p>Your timezone goes to {ipData.timezone}.</p>
                </SingleObjectDiv>
            }
        </ObjectListDiv>
    )
}