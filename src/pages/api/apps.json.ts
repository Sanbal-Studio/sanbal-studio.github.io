import type { APIRoute } from 'astro';
import { apps, isDownloadAvailable } from '../../data/apps';

export const GET: APIRoute = ({ site }) =>
  Response.json({
    apps: apps.filter(isDownloadAvailable).map((app) => ({
      name: app.name,
      iconUrl: new URL(app.icon, site).href,
      appstoreUrl: app.appStoreUrl,
      playstoreUrl: app.googlePlayUrl,
    })),
  });
