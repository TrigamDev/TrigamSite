import { Data, useLanyardWS } from "use-lanyard";
import moment from "moment";

import "./box.css";
import SideBox from "./SideBox";
import Twemoji from "../util/Twemoji";
import { useEffect, useState } from "react";

export default function DiscordBox({ id }: { id: `${bigint}` }) {
    const discordData = useLanyardWS(id);
    let statuses = getStatuses(discordData as Data);
    // Get the online state
    const states = {
        online: { emoji: '🟢', name: 'Online' },
        idle: { emoji: '🟡', name: 'Idle' },
        dnd: { emoji: '🔴', name: 'Do Not Disturb' },
        offline: { emoji: '💤', name: 'Away' },
        default: { emoji: '⏱️', name: 'Loading...' }
    };
    let state = states[discordData?.discord_status as keyof typeof states]; 
    if (!state) state = states.default;
    
    return (
        <SideBox id="discord" emoji={state.emoji} title={state.name}>{
            statuses.length > 0 && statuses.map((act: Activity, i) => (
                <DiscordStatus key={i} activity={act}/>
            ))
        }</SideBox>
    )
}

function DiscordStatus({ activity }: { activity: Activity }) {
    let emoji = activity.emoji ? activity.emoji : typeInfo(activity.type).emoji;
    if (!hasEmoji(emoji)) emoji = `:${emoji}:`;
    let assets = getActivityAssets(activity);
    return (
        <div>
            <span><Twemoji emoji={emoji}/> {typeInfo(activity.type).name} <b>{activity.name}</b></span>
            <div className="activity-desc">
                {assets.largeImage && (
                    <div className="activity-imgs">
                        <img className="activity-large-img" src={assets.largeImage} title={assets.largeTitle}/>
                        {assets.smallImage && ( <img className="activity-small-img" src={assets.smallImage} title={assets.smallTitle}/> )}
                    </div>
                )}
                <div className="activity-info">
                    <span>{activity.details}</span>
                    <span>{activity.state}</span>
                    <span><TimeTracker started={activity.started}/></span>
                </div>
            </div>
        </div>
    )
}

function TimeTracker({ started }: { started: number }) {
    const [currentTime, setCurrentTime] = useState(moment());
    useEffect(() => {
        const interval = setInterval(() => { setCurrentTime(moment()) }, 1000);
        return () => clearInterval(interval);
    }, []);

    const elapsed = moment.duration(currentTime.diff(started));
    return (
        elapsed.asMilliseconds() > 0 ? (
            <div>
                {elapsed.hours() > 0 && pad(elapsed.hours()) + ':'}
                {elapsed.minutes() > 0 && pad(elapsed.minutes()) + ':'}
                {pad(elapsed.seconds())} elapsed
            </div>
        ) : <div></div>
    )
}

function getStatuses(data: Data): Activity[] {
    let activities = [] as Activity[];
    if (!data || !data?.activities) return activities;
    for (let activity of data?.activities) {
        let cleaned = {} as Activity;
        // Clean up and only use necessary data
        cleaned.type = activity.type as number;
        cleaned.name = activity.name as string;
        cleaned.emoji = activity.emoji?.name as string;
        cleaned.state = activity.state as string;
        cleaned.details = activity.details as string;
        cleaned.started = activity.timestamps?.start as number;
        cleaned.applicationID = activity.application_id as string;
        cleaned.largeImg = activity.assets?.large_image as string;
        cleaned.largeTitle = activity.assets?.large_text as string;
        cleaned.smallImg = activity.assets?.small_image as string;
        cleaned.smallTitle = activity.assets?.small_text as string;
        // Custom status shenanigans
        if (activity.type == 4) {
            cleaned.name = activity.state as string;
            cleaned.state = '';
        }

        activities.push(cleaned);
    }
    return activities;
}

function typeInfo(statusType: number): { name: string, emoji: string } {
    let name = '';
    let emoji = '';
    switch (statusType) {
        case 0: name = 'Playing'; break;
        case 1: name = 'Streaming'; break;
        case 2: name = 'Listening to'; break;
        case 3: name = 'Watching'; break;
    };
    switch (statusType) {
        case 0: emoji = '🎮'; break;
        case 1: emoji = '🎥'; break;
        case 2: emoji = '🎧'; break;
        case 3: emoji = '🖥️'; break;
    };
    return { name: name, emoji: emoji };
}

function pad(num: Number) {
    return String(num).padStart(2, '0');
}

function hasEmoji(str: string): boolean {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B06}\u{2934}\u{2935}\u{200D}]+/gu;
    return emojiRegex.test(str);
}

function getActivityAssets(activity: Activity) {
    const assetUrl = 'https://cdn.discordapp.com/app-assets/';
    let assets = {
        largeImage: null as string | null,
        largeTitle: activity.largeTitle,
        smallImage: null as string | null,
        smallTitle: activity.smallTitle
    };
    if (activity.applicationID) {
        if (activity.largeImg) assets.largeImage = `${assetUrl}/${activity.applicationID}/${activity.largeImg}`;
        if (activity.smallImg) assets.smallImage = `${assetUrl}/${activity.applicationID}/${activity.smallImg}`;
    };
    return assets;
}

interface Activity {
    type: number;
    name: string;
    emoji: string;
    state: string;
    details: string;
    started: number;
    applicationID: string;
    largeImg: string;
    largeTitle: string;
    smallImg: string;
    smallTitle: string;
}