import { Fragment } from "react";
import "./box.css";
import Twemoji from "../util/Twemoji";

export default function SideBox({ id, emoji, title, children }: { id: string, emoji: string, title: string, children: React.ReactNode }) {
    return (
        <div className="side-box" id={id}>
            <div className="title">
                <Twemoji emoji={emoji}></Twemoji>
                <span className="title-text">{title}</span>
            </div>
            <Fragment>
                {
                    children &&
                    <div className="box-content">
                        {children}
                    </div>
                }
            </Fragment>
        </div>
    )
}