import "./box.css";
import SideBox from "./SideBox";

import YouTube from '/assets/logos/youtube.svg?url';
import YouTubeHover from '/assets/logos/youtube-hover.svg?url';
import Twitter from '/assets/logos/twitter.svg?url';
import TwitterHover from '/assets/logos/twitter-hover.svg?url';
import Discord from '/assets/logos/discord.svg?url';
import DiscordHover from '/assets/logos/discord-hover.svg?url';
import Twitch from '/assets/logos/twitch.svg?url';
import TwitchHover from '/assets/logos/twitch-hover.svg?url';
import GitHub from '/assets/logos/github.svg?url';
import GitHubHover from '/assets/logos/github-hover.svg?url';
import Reddit from '/assets/logos/reddit.svg?url';
import RedditHover from '/assets/logos/reddit-hover.svg?url';
import Steam from '/assets/logos/steam.svg?url';
import SteamHover from '/assets/logos/steam-hover.svg?url';
import SoundCloud from '/assets/logos/soundcloud.svg?url';
import SoundCloudHover from '/assets/logos/soundcloud-hover.svg?url';

export default function SocialsBox() {
    return (
        <SideBox id="socials" emoji="📱" title="Socials">
            <div id="socials-buttons">
                <SocialButton href="https://www.youtube.com/@TrigamDev"
                    logo={YouTube} hover={YouTubeHover} alt="YouTube"/>
                <SocialButton href="https://twitter.com/Trigam04"
                    logo={Twitter} hover={TwitterHover} alt="Twitter"/>
                <SocialButton href="https://dsc.gg/trigam-den"
                    logo={Discord} hover={DiscordHover} alt="Discord"/>
                <SocialButton href="https://www.twitch.tv/trigamdev"
                    logo={Twitch} hover={TwitchHover} alt="Twitch"/>
                <SocialButton href="https://github.com/TrigamDev"
                    logo={GitHub} hover={GitHubHover} alt="GitHub"/>
                <SocialButton href="https://www.reddit.com/u/TrigamYT"
                    logo={Reddit} hover={RedditHover} alt="Reddit"/>
                <SocialButton href="https://steamcommunity.com/profiles/76561198837678570"
                    logo={Steam} hover={SteamHover} alt="Steam"/>
                <SocialButton href="https://soundcloud.com/trigamdev"
                    logo={SoundCloud} hover={SoundCloudHover} alt="SoundCloud"/>
            </div>
        </SideBox>
    )
}

function SocialButton({ href, logo, hover, alt }: { href: string, logo: string, hover: string, alt: string }) {
    return (
        <a href={href} target="_blank" className="socials-button" id={alt.toLowerCase() + "-button"}>
            <img src={logo} alt={alt} className="socials-logo" id={alt.toLowerCase() + "-logo"}/>
            <img src={hover} alt={alt} className="socials-logo socials-logo-hover" id={alt.toLowerCase() + "-logo-hover"}/>
        </a>
    )
};