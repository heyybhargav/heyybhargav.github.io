import type { Metadata } from 'next';
import { BolnaWallpapers } from './BolnaWallpapers';

export const metadata: Metadata = {
    title: 'bolna wallpapers', description: 'Desktop wallpapers with the new Bolna logo. Six designs in 4K.', openGraph: { title: 'bolna wallpapers', description: 'Desktop wallpapers with the new Bolna logo. Six designs in 4K.' }, twitter: { title: 'bolna wallpapers', description: 'Desktop wallpapers with the new Bolna logo. Six designs in 4K.' },
    robots: { index: false, follow: false }, alternates: { canonical: '/bolna-wallpapers/' },
};

export default function Wallpapers() {
    return <BolnaWallpapers />;
}
