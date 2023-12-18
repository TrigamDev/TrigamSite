import { useEffect, useState } from "react"

import "./home.css";
import DiscordBox from "../components/home/DiscordBox";
import SocialsBox from "../components/home/SocialBox";

export default function Home() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        fetch('/api/greeting')
            .then(response => response.text())
            .then(data => setGreeting(data));
    }, []);

    return (
        <div id="content">
            <div id="main-column">
                {greeting}
            </div>
            <div id="side-column">
                <DiscordBox id={"480828680604614675"}></DiscordBox>
                <SocialsBox></SocialsBox>
            </div>
        </div>
    )
}