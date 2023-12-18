import { ReactNode } from "react";
import { Howl } from 'howler';
import Twemoji from "../util/Twemoji";
import { Link, useLocation } from "react-router-dom";

import 'src/css/wrapper.css';

var navButtons = [
    { label: 'Home', icon: '🏠', href: '/', sfx: 'home', selected: false },
    { label: 'Art', icon: '🎨', href: '/art', sfx: 'art', selected: false },
    { label: 'Projects', icon: '💻', href: '/projects', sfx: 'projects', selected: false },
    { label: 'Blog', icon: '📝', href: '/blog', sfx: 'blog', selected: false },
]

export default function PageWrapper({ children, }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div id="wrapper">
            <div id="toolbar">
                <div id="cool-logo">
                    <img src="/logoMark.svg" alt="△" id="logo-mark"/>
                    <img src="/textMark.svg" alt="Trigam" id="text-mark"/>
                    <span id="website-version">v8.0.0</span>
                </div>
                <div id="nav-buttons">
                    {navButtons.map((button, index) => {
                        return (
                            <NavButton label={button.label} icon={button.icon} href={button.href}
                                sfx={button.sfx} key={index}
                                selected={location.pathname === button.href}
                            />
                        )
                    })}
                </div>
            </div>
            <div id="content">
                {children}
            </div>
        </div>
    )
}

export function NavButton({ label, icon, href, sfx, selected }: { label: string, icon: string, href: string, sfx: string, selected: boolean }): ReactNode {
    const clickSound = new Howl({
        src: [`/assets/sfx/${sfx}.mp3`],
        volume: 0.5,
    });

    const onClick = () => {
        clickSound.play();
        for (let button of navButtons) {
            button.selected = false;
        }
        navButtons.find(button => button.href === href)!.selected = true;
    };

    return (
        <Link className={ selected ? 'nav-button selected' : 'nav-button' } to={href} onClick={onClick}>
            <Twemoji emoji={icon}/>
            <span className="nav-label">{label}</span>
        </Link>
    )
}