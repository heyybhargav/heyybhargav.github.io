import type { Metadata } from 'next';

import img_mouse from './img-mouse';
import img_raptor from './img-raptor';
import img_delusional from './img-delusional';
import img_courage from './img-courage';
import img_uncertainty from './img-uncertainty';

export const metadata: Metadata = { title: 'vault' };

const items = [
    {
        src: img_mouse,
        alt: 'A mouse with a walking stick beside a frozen stream. Caption: you cannot use someone else\u2019s map to find yourself',
        caption: '',
        kind: 'photo',
    },
    {
        src: img_raptor,
        alt: 'Three SpaceX Raptor engines side by side: Raptor 1, Raptor 2 and Raptor 3',
        caption: 'make it exist first, you can make it good later',
        kind: 'photo',
    },
    {
        src: img_delusional,
        alt: 'A man crouching in a hangar full of scattered wreckage, with the text: Be delusional.',
        caption: '',
        kind: 'photo',
    },
    {
        src: img_courage,
        alt: 'A hiker on a mountain ridge at sunrise, with the quote: May I find the courage to disappoint people who expect me to stay small. Michell C. Clark',
        caption: '',
        kind: 'photo',
    },
    {
        src: img_uncertainty,
        alt: 'An illustration of a man on a path leading into tangled roller-coaster tracks above clouds, with the text: Tolerance for uncertainty is the most valuable human trait',
        caption: '',
        kind: 'photo',
    },
];

const css = `
body:has(.vault-page){padding:0;background:#faf9f6}
.vault-page{max-width:680px;margin:0 auto;padding:48px 20px 80px;color:#1a1a1a}
.vault-page h1{font-size:28px;font-weight:600;margin:0 0 6px}
.vault-sub{color:#666;margin:0 0 28px;font-size:15px}
.vault-back{font-size:14px;color:#1a1a1a;text-decoration:underline;display:inline-block;margin-bottom:32px}
.vault-grid{display:grid;gap:16px}
.vault-item{margin:0;border:1px solid #e4e4de;border-radius:10px;overflow:hidden;background:#fff}
.vault-item img{display:block;width:100%;height:auto}
.vault-item figcaption{padding:10px 12px;font-size:14px;color:#444}
`;

export default function Vault() {
    return (
        <div className="vault-page">
            <style>{css}</style>
            <a className="vault-back" href="/">home</a>
            <h1>vault</h1>
            <p className="vault-sub">things i want to keep and share.</p>
            <div className="vault-grid">
                {items.map((item) => (
                    <figure className="vault-item" key={item.src}>
                        <img src={item.src} alt={item.alt} loading="lazy" />
                        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                    </figure>
                ))}
            </div>
        </div>
    );
}
