"use client";
import { useCallback, useEffect, useState } from 'react';
import img_mouse from '@/app/vault/img-mouse';
import img_raptor from '@/app/vault/img-raptor';
import img_delusional from '@/app/vault/img-delusional';
import img_courage from '@/app/vault/img-courage';
import img_uncertainty from '@/app/vault/img-uncertainty';
import { chart, mastery, truthful } from '@/app/vault/img-more1';
import { deep, personally } from '@/app/vault/img-more2';
import { commitment, emerson } from '@/app/vault/img-more3';

type Item = { src: string; kind: string; alt: string };
const items: Item[] = [
    { src: img_mouse, kind: 'words', alt: 'A mouse with a walking stick beside a frozen stream. Caption: you cannot use someone else\u2019s map to find yourself' },
    { src: img_raptor, kind: 'build', alt: 'Three SpaceX Raptor engines side by side: Raptor 1, Raptor 2 and Raptor 3, with the text: make it exist first, you can make it good later' },
    { src: img_delusional, kind: 'build', alt: 'A man crouching in a hangar full of scattered wreckage, with the text: Be delusional.' },
    { src: img_courage, kind: 'words', alt: 'A hiker on a mountain ridge at sunrise, with the quote: May I find the courage to disappoint people who expect me to stay small. Michell C. Clark' },
    { src: img_uncertainty, kind: 'ideas', alt: 'An illustration of a man on a path leading into tangled roller-coaster tracks above clouds, with the text: Tolerance for uncertainty is the most valuable human trait' },
    { src: chart, kind: 'ideas', alt: 'A chart by William Meijer: unkind truths trend a system upward over time, kind lies trend it downward' },
    { src: mastery, kind: 'words', alt: 'Text: Mastery is the best goal because the rich can\u2019t buy it, the impatient can\u2019t rush it, the privileged can\u2019t inherit it, and nobody can steal it. You can only earn it through hard work. Mastery is the ultimate status.' },
    { src: truthful, kind: 'words', alt: 'Text: Be truthful. Be sincere. Do you really want to be rid of your problems? Man gets what he wants.' },
    { src: deep, kind: 'words', alt: 'Text: Going Deep and Staying Curious, by Patrick Collison, Advice (2021)' },
    { src: personally, kind: 'words', alt: 'Text: don\u2019t take it personally. Whatever happens around you, don\u2019t take it personally.' },
    { src: commitment, kind: 'words', alt: 'Text: There\u2019s a big difference between being interested in something and being committed to it.' },
    { src: emerson, kind: 'words', alt: 'Ralph Waldo Emerson: Write it on your heart that every day is the best day in the year.' },
];
const kinds = ['all', ...Array.from(new Set(items.map((i) => i.kind)))];

const css = `body:has(.vv) { padding:0; background:#faf9f6; color:#282825; }
html:has(.vv) { background:#faf9f6; color-scheme:light; }
body:has(.vv) main { width:min(100% - 40px, 620px); max-width:620px; margin:0 auto; padding:48px 0 64px; }
body:has(.vv) .site-footer { display:none; }
@media(max-width:600px) { body:has(.vv) main { padding-top:24px; } }
.vv a { color:inherit; }
.vv { --ink:#282825; --ink2:#66665f; --hair:#deded6; --teal:#3f746b; --serif:Georgia,"Times New Roman",serif; background:#faf9f6; color:#282825; font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; padding:0; }
.vv button { all: unset; cursor: pointer; box-sizing: border-box; }
.vv a.vv-back { font-size:13px; color:var(--ink2); box-shadow:inset 0 -1px 0 var(--hair); }
.vv .vv-back { display:inline-block; text-decoration:none; font-size:13px; color:var(--ink2); box-shadow:inset 0 -1px 0 var(--hair); }
.vv header { margin:28px 0 22px; }
.vv h1 { font:400 26px/1.2 var(--serif); letter-spacing:-.025em; color:var(--ink); margin:0; }
.vv-sub { margin:10px 0 0; color:var(--ink2); font-size:14px; line-height:24px; max-width:34em; }
.vv-bar { display:flex; align-items:center; justify-content:space-between; gap:12px; border-top:1px solid var(--hair); padding-top:14px; margin-bottom:18px; }
.vv-chips { display:flex; flex-wrap:wrap; gap:6px 18px; }
.vv-chips button { font-size:13px; color:var(--ink2); padding:2px 0; box-shadow:inset 0 -1px 0 transparent; transition:color .2s, box-shadow .2s; }
.vv-chips button:hover { color:var(--ink); }
.vv-chips button[aria-pressed="true"] { color:var(--ink); box-shadow:inset 0 -1px 0 var(--ink); }
.vv-grid { columns:2; column-gap:14px; }
.vv-card { display:block; width:100%; break-inside:avoid; margin:0 0 16px; cursor:zoom-in; animation:vvin .6s cubic-bezier(.16,1,.3,1) both; }
@keyframes vvin { from { opacity:0; transform:translateY(10px); } }
.vv-thumb { display:block; border-radius:12px; overflow:hidden; border:1px solid var(--hair); background:#f1f0ea; transition:transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s; }
.vv-card:hover .vv-thumb { transform:translateY(-3px); box-shadow:0 10px 28px -14px rgba(40,40,37,.35); }
.vv-thumb img { display:block; width:100%; height:auto; }
.vv-cap { display:block; font:400 14px/1.35 var(--serif); color:var(--ink); margin-top:8px; letter-spacing:-.01em; }
.vv-end { margin-top:28px; border-top:1px solid var(--hair); padding-top:14px; font-size:12px; color:var(--ink2); display:flex; justify-content:space-between; }
.vv .vv-end a { text-decoration:none; color:var(--ink2); box-shadow:inset 0 -1px 0 var(--hair); }
.vv-lb { position:fixed; inset:0; z-index:10; background:#faf9f6; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px 16px 64px; animation:vvfade .25s ease; }
@keyframes vvfade { from { opacity:0; } }
.vv-lb img { flex:0 1 auto; min-height:0; max-width:100%; object-fit:contain; max-height:calc(100vh - 150px); max-height:calc(100dvh - 150px); width:auto; height:auto; border-radius:10px; border:1px solid var(--hair); box-shadow:0 20px 50px -24px rgba(40,40,37,.4); }
.vv-info { margin-top:14px; text-align:center; font:400 16px/1.35 var(--serif); color:var(--ink); }
.vv-lb button { position:absolute; font-size:13px; color:var(--ink2); padding:8px 10px; }
.vv-lb button:hover { color:var(--ink); }
.vv-lb .vv-x { bottom:18px; left:50%; transform:translateX(-50%); border-bottom:1px solid var(--hair); } .vv-lb .vv-p { left:6px; top:50%; } .vv-lb .vv-n { right:6px; top:50%; }
.vv a:focus-visible, .vv button:focus-visible { outline:2px solid #3f746b; outline-offset:4px; }
@media (prefers-reduced-motion: reduce) { .vv * { animation:none !important; transition:none !important; } }`;

export function VaultGallery() {
    const [cur, setCur] = useState('all');
    const [open, setOpen] = useState<number | null>(null);
    const [sx, setSx] = useState(0);
    const vis = items.map((_, i) => i).filter((i) => cur === 'all' || items[i].kind === cur);
    const step = useCallback((d: number) => {
        setOpen((o) => {
            if (o === null) return o;
            const p = vis.indexOf(o);
            return vis[(p + d + vis.length) % vis.length];
        });
    }, [cur]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (open === null) return;
        const k = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null);
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
        };
        window.addEventListener('keydown', k);
        return () => window.removeEventListener('keydown', k);
    }, [open, step]);
    return (
        <div className="vv">
            <style>{css}</style>
            <a className="vv-back" href="/">home</a>
            <header>
                <h1>vault</h1>
                <p className="vv-sub">things i keep coming back to. words, pictures, ideas. tap one to see it properly.</p>
            </header>
            <div className="vv-bar">
                <div className="vv-chips">
                    {kinds.map((k) => (
                        <button key={k} aria-pressed={cur === k} onClick={() => setCur(k)}>{k}</button>
                    ))}
                </div>
            </div>
            <div className="vv-grid">
                {vis.map((i) => (
                    <button key={i} className="vv-card" aria-label={'open: ' + items[i].alt} onClick={() => setOpen(i)}>
                        <span className="vv-thumb"><img src={items[i].src} alt={items[i].alt} loading="lazy" /></span>
                    </button>
                ))}
            </div>
            <div className="vv-end"><span>more soon</span><a href="/">back to home</a></div>
            {open !== null && (
                <div
                    className="vv-lb"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
                    onTouchStart={(e) => setSx(e.touches[0].clientX)}
                    onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); }}
                >
                    <button className="vv-x" onClick={() => setOpen(null)}>close</button>
                    <button className="vv-p" aria-label="previous" onClick={() => step(-1)}>&larr;</button>
                    <img src={items[open].src} alt={items[open].alt} />
                    <button className="vv-n" aria-label="next" onClick={() => step(1)}>&rarr;</button>
                </div>
            )}
        </div>
    );
}

