"use client";

import { useEffect } from 'react';
import twemoji from 'twemoji';

export default function Twemoji({ emoji }: { emoji: string }) {
    useEffect(() => { twemoji.parse(emoji, {folder: 'svg', ext: '.svg'} ) });
    return ( <span className="Twemoji">{emoji}</span> );
}