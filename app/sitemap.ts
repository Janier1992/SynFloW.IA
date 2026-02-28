import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Ajustar ROOT_URL una vez que el dominio de producción exista, ej: https://synflow.io
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://synflow.test';

    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    ];
}
