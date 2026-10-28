import siteContent from './apps.json';

export type AppStatus = 'published' | 'comingSoon';

export interface StudioLinkSet {
  threads: string;
  x: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  links: StudioLinkSet;
}

export interface AppScreenshot {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AppInfo {
  slug: string;
  name: string;
  status: AppStatus;
  tagline: string;
  summary: string;
  icon: string;
  screenshots: AppScreenshot[];
  appStoreUrl: string;
  googlePlayUrl: string;
  supportEmail?: string;
  supportUrl: string;
  privacyUrl: string;
  termsUrl?: string;
}

interface SiteContent {
  studio: StudioInfo;
  apps: AppInfo[];
}

const content = siteContent as SiteContent;

export const studio = content.studio;
export const apps = content.apps;

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}

export function mailtoForApp(app: AppInfo) {
  const recipient = app.supportEmail ?? studio.email;
  const subject = encodeURIComponent(`[${app.name}] 문의`);
  const body = encodeURIComponent(
    `${app.name} 관련 문의입니다.\n\n사용 중인 기기와 앱 버전:\n문의 내용:`,
  );

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export function isDownloadAvailable(app: AppInfo) {
  return app.status === 'published' && Boolean(app.appStoreUrl || app.googlePlayUrl);
}
