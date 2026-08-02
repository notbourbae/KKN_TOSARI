/**
 * Helper utility to compress images under 1 MB (1,048,576 bytes)
 */

export interface CompressionResult {
    dataUrl: string;
    originalSize: number; // in bytes
    compressedSize: number; // in bytes
    infoText?: string;
}

/**
 * Calculates byte size of a base64 Data URL
 */
export function getDataUrlByteSize(dataUrl: string): number {
    if (!dataUrl) return 0;
    const base64Str = dataUrl.split(',')[1] || '';
    return Math.round((base64Str.length * 3) / 4);
}

/**
 * Format bytes to human readable format (KB / MB)
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Compresses an image file so that the resulting data URL is under 1MB (1,048,576 bytes).
 */
export async function compressImageUnder1MB(
    file: File,
    maxSizeBytes: number = 1024 * 1024 // 1 MB
): Promise<CompressionResult> {
    const originalSize = file.size;

    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('File yang dipilih bukan berkas gambar yang valid.'));
            return;
        }

        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
        reader.onload = (event) => {
            const src = event.target?.result as string;
            if (!src) {
                reject(new Error('Gagal mengolah data gambar.'));
                return;
            }

            const img = new Image();
            img.onerror = () => reject(new Error('Gagal memproses gambar.'));
            img.onload = () => {
                let width = img.naturalWidth || img.width;
                let height = img.naturalHeight || img.height;

                // Max initial dimensions
                const MAX_DIM = 1920;
                if (width > MAX_DIM || height > MAX_DIM) {
                    if (width > height) {
                        height = Math.round((height * MAX_DIM) / width);
                        width = MAX_DIM;
                    } else {
                        width = Math.round((width * MAX_DIM) / height);
                        height = MAX_DIM;
                    }
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Browser tidak mendukung canvas HTML5.'));
                    return;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                // Try JPEG compression with decreasing quality
                let quality = 0.88;
                let dataUrl = canvas.toDataURL('image/jpeg', quality);
                let currentSize = getDataUrlByteSize(dataUrl);

                // Reduce quality iteratively if needed
                while (currentSize > maxSizeBytes && quality > 0.2) {
                    quality -= 0.08;
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                    currentSize = getDataUrlByteSize(dataUrl);
                }

                // If quality drops and still > 1MB, resize dimensions progressively
                let scale = 0.8;
                while (currentSize > maxSizeBytes && scale >= 0.2) {
                    const scaledWidth = Math.round(width * scale);
                    const scaledHeight = Math.round(height * scale);

                    canvas.width = scaledWidth;
                    canvas.height = scaledHeight;

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                    dataUrl = canvas.toDataURL('image/jpeg', Math.min(quality, 0.75));
                    currentSize = getDataUrlByteSize(dataUrl);
                    scale -= 0.15;
                }

                const infoText =
                    originalSize > currentSize
                        ? `Terkompresi dari ${formatFileSize(originalSize)} menjadi ${formatFileSize(currentSize)} (< 1MB)`
                        : `Ukuran gambar: ${formatFileSize(currentSize)} (< 1MB)`;

                resolve({
                    dataUrl,
                    originalSize,
                    compressedSize: currentSize,
                    infoText
                });
            };

            img.src = src;
        };

        reader.readAsDataURL(file);
    });
}
