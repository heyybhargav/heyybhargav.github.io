"use client";
import { useState } from 'react';
import { obsidian } from './img-bw1';
import { survey, strata } from './img-bw2';
import { summit, halo } from './img-bw3';
import { phosphorAzure, phosphorEmber, phosphorCharcoal, phosphorAubergine } from './img-bw4';

type Piece = { name: string; img: string; full: string };
const driveDl = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
const pieces: Piece[] = [
    { name: 'obsidian', img: obsidian, full: driveDl('1nTqRKg7d_8ja6JaBB5r4e64DyoqltB85') },
    { name: 'survey', img: survey, full: driveDl('1rI2idCkk1HSpVwhzRmmKHzORaU036U9h') },
    { name: 'strata', img: strata, full: driveDl('16eKiPBi_l6zesore5tYUl-JAyo1yrLXp') },
    { name: 'summit', img: summit, full: driveDl('1Xphp56YoVMFxvacsikwKf9nmoPnzQ7ba') },
    { name: 'halo', img: halo, full: driveDl('1Em0PUZelfuxxII5mSUvRKxDpRvys1gi5') },
];

type Variant = { key: string; label: string; swatch: string; img: string; full: string };
const phosphor: Variant[] = [
    { key: 'azure', label: 'azure', swatch: '#1a65c8', img: phosphorAzure, full: driveDl('1LPqOODuYqGMc8UbZEcUPq9IwquFQQYlv') },
    { key: 'ember', label: 'ember', swatch: '#c8702e', img: phosphorEmber, full: driveDl('1MpnLwXL_vEL-0NlI2tINSqWLmYOvTSeW') },
    { key: 'charcoal', label: 'charcoal', swatch: '#8a8d94', img: phosphorCharcoal, full: driveDl('1hRHcPEQgw8eCO7OgyxCwRvZ9Av5pY-FC') },
    { key: 'aubergine', label: 'aubergine', swatch: '#7a4a6e', img: phosphorAubergine, full: driveDl('19Rljj023FZU0QIdANSB9go89cFNDfJiF') },
];

const css = `body:has(.bw) { padding:0; background:#faf9f6; color:#282825; }
html:has(.bw) { background:#faf9f6; color-scheme:light; }
body:has(.bw) main { width:min(100% - 40px, 620px); max-width:620px; margin:0 auto; padding:48px 0 64px; }
body:has(.bw) .site-footer { display:none; }
@media(max-width:600px) { body:has(.bw) main { padding-top:24px; } }
.bw { --ink:#282825; --ink2:#66665f; --hair:#deded6; --serif:Georgia,"Times New Roman",serif; background:#faf9f6; color:#282825; font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; padding:0; }
.bw a { color:inherit; }
.bw button { all: unset; cursor: pointer; box-sizing: border-box; }
.bw .bw-back { display:inline-block; text-decoration:none; font-size:13px; color:var(--ink2); box-shadow:inset 0 -1px 0 var(--hair); }
.bw header { margin:28px 0 22px; }
.bw h1 { font:400 26px/1.2 var(--serif); letter-spacing:-.025em; color:var(--ink); margin:0; }
.bw-sub { margin:10px 0 0; color:var(--ink2); font-size:14px; line-height:24px; max-width:34em; }
.bw-item { margin:0 0 28px; animation:bwin .6s cubic-bezier(.16,1,.3,1) both; }
@keyframes bwin { from { opacity:0; transform:translateY(10px); } }
.bw-shot { display:block; border-radius:12px; overflow:hidden; border:1px solid var(--hair); background:#f1f0ea; }
.bw-shot img { display:block; width:100%; height:auto; }
.bw-row { display:flex; align-items:baseline; justify-content:space-between; margin-top:8px; }
.bw-name { font:400 14px/1.35 var(--serif); color:var(--ink); letter-spacing:-.01em; }
.bw-dl { text-decoration:none; font-size:13px; color:var(--ink2); box-shadow:inset 0 -1px 0 var(--hair); }
.bw-dl:hover { color:var(--ink); }
.bw-swatches { display:flex; flex-wrap:wrap; gap:6px 18px; margin-top:10px; }
.bw-swatches button { display:inline-flex; align-items:center; gap:6px; font-size:13px; color:var(--ink2); padding:2px 0; box-shadow:inset 0 -1px 0 transparent; transition:color .2s, box-shadow .2s; }
.bw-swatches button:hover { color:var(--ink); }
.bw-swatches button[aria-pressed="true"] { color:var(--ink); box-shadow:inset 0 -1px 0 var(--ink); }
.bw-dot { width:9px; height:9px; border-radius:50%; background:var(--sw); }
.bw-end { margin-top:28px; border-top:1px solid var(--hair); padding-top:14px; font-size:12px; color:var(--ink2); display:flex; justify-content:space-between; gap:12px; }
.bw .bw-end a { text-decoration:none; color:var(--ink2); box-shadow:inset 0 -1px 0 var(--hair); }
.bw a:focus-visible, .bw button:focus-visible { outline:2px solid #3f746b; outline-offset:4px; }
@media (prefers-reduced-motion: reduce) { .bw * { animation:none !important; transition:none !important; } }`;

export function BolnaWallpapers() {
    const [sel, setSel] = useState('azure');
    const v = phosphor.find((p) => p.key === sel)!;
    return (
        <div className="bw">
            <style>{css}</style>
            <a className="bw-back" href="/">home</a>
            <header>
                <h1>bolna wallpapers</h1>
                <p className="bw-sub">a small set of desktop wallpapers carrying the bolna mark. every piece is 3840 &times; 2160 and saves straight to your device.</p>
            </header>
            {pieces.map((p) => (
                <figure key={p.name} className="bw-item">
                    <span className="bw-shot">
                        <img src={p.img} alt={`${p.name} wallpaper`} loading="lazy" />
                    </span>
                    <figcaption className="bw-row">
                        <span className="bw-name">{p.name}</span>
                        <a className="bw-dl" href={p.full} target="_blank" rel="noopener">download 4k</a>
                    </figcaption>
                </figure>
            ))}
            <figure className="bw-item">
                <span className="bw-shot">
                    <img src={v.img} alt={`phosphor wallpaper, ${v.label}`} loading="lazy" />
                </span>
                <figcaption className="bw-row">
                    <span className="bw-name">phosphor</span>
                    <a className="bw-dl" href={v.full} target="_blank" rel="noopener">download 4k</a>
                </figcaption>
                <div className="bw-swatches" role="group" aria-label="phosphor colour options">
                    {phosphor.map((p) => (
                        <button key={p.key} type="button" aria-pressed={p.key === sel} onClick={() => setSel(p.key)}>
                            <span className="bw-dot" style={{ ['--sw' as any]: p.swatch }} />
                            {p.label}
                        </button>
                    ))}
                </div>
            </figure>
            <div className="bw-end"><span>the mark is traced from a sticker photo, not the official vector.</span><a href="/">back to home</a></div>
        </div>
    );
                                                                                                  }
