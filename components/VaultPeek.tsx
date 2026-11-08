import { peekImgs, peekRatios } from './peek-imgs';

const css = `
.vp-grid { display:flex; flex-wrap:wrap; gap:8px; }
.vp-grid a { display:block; height:118px; }
.vp-grid img { display:block; width:100%; height:100%; object-fit:cover; border-radius:8px; border:1px solid var(--ds-hairline,#deded6); transition:transform .4s cubic-bezier(.16,1,.3,1); }
.vp-grid a:hover img { transform:translateY(-2px); }
.vp-more { display:inline-block; margin-top:14px; }
`;

export function VaultPeek() {
    return (
        <section className="home-section">
            <style>{css}</style>
            <h2 className="home-label">from the vault</h2>
            <div className="vp-grid">
                {peekImgs.map((src, i) => (
                    <a key={i} href="/vault/" aria-label="open the vault" style={{ flex: `${Math.round(peekRatios[i] * 100)} 1 ${Math.round(peekRatios[i] * 118)}px`, maxWidth: `${Math.round(peekRatios[i] * 118 * 1.3)}px` }}>
                        <img src={src} alt="" loading="lazy" />
                    </a>
                ))}
            </div>
            <a href="/vault/" className="mk-inline vp-more">see all</a>
        </section>
    );
}
