import type { Metadata } from 'next';
import { BolnaWallpapers } from './BolnaWallpapers';

export const metadata: Metadata = {
    title: 'bolna wallpapers',
    robots: { index: false, follow: false },
};

export default function Wallpapers() {
    return <BolnaWallpapers />;
}
