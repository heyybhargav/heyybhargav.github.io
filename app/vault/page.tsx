import type { Metadata } from 'next';
import { VaultGallery } from '@/components/VaultGallery';

export const metadata: Metadata = { title: 'vault' };

export default function Vault() {
    return <VaultGallery />;
}
