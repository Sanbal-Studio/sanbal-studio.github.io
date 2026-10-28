import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

const root = new URL('..', import.meta.url);

const readJson = (path) =>
  JSON.parse(readFileSync(new URL(path, root), 'utf8'));

const exists = (path) => existsSync(new URL(path, root));

describe('Sanbal Studio site content contract', () => {
  const loadContent = () => readJson('src/data/apps.json');

  it('keeps the configured portfolio apps', () => {
    const content = loadContent();
    const slugs = content.apps.map((app) => app.slug).sort();

    assert.deepEqual(slugs, ['frep', 'not-todo', 'picmory', 'walk-bingo']);
  });

  it('provides studio contact links for the home and contact pages', () => {
    const content = loadContent();

    assert.equal(content.studio.email, 'sanbal-studio@ksanbal.trade');
    assert.match(content.studio.links.threads, /^https:\/\/www\.threads\.com\//);
    assert.match(content.studio.links.x, /^https:\/\/x\.com\//);
  });

  it('defines complete metadata and content files for every app', () => {
    const content = loadContent();

    for (const app of content.apps) {
      assert.match(app.slug, /^[a-z0-9-]+$/);
      assert.ok(app.name);
      assert.match(app.status, /^(published|comingSoon)$/);
      assert.ok(app.tagline);
      assert.ok(app.summary);
      assert.ok(app.supportUrl);
      assert.equal(app.privacyUrl, `/apps/${app.slug}/privacy`);
      assert.ok(exists(app.icon.replace(/^\//, 'public/')), `${app.slug} icon exists`);

      for (const screenshot of app.screenshots) {
        assert.ok(screenshot.src);
        assert.ok(screenshot.alt);
        assert.ok(exists(screenshot.src.replace(/^\//, 'public/')), `${screenshot.src} exists`);
      }

      for (const kind of ['detail', 'support', 'privacy']) {
        assert.ok(
          exists(join('src/content/apps', app.slug, `${kind}.mdx`)),
          `${app.slug} ${kind}.mdx exists`,
        );
      }
    }
  });

  it('exposes the static page templates required by the PRD', () => {
    for (const page of [
      'src/pages/apps/[slug].astro',
      'src/pages/apps/[slug]/support.astro',
      'src/pages/apps/[slug]/privacy.astro',
      'src/pages/apps/[slug]/terms.astro',
      'src/pages/contact.astro',
    ]) {
      assert.ok(exists(page), `${page} exists`);
    }
  });

  it('requires a terms document for every configured terms URL', () => {
    const content = loadContent();

    for (const app of content.apps) {
      if (app.termsUrl !== undefined) {
        assert.equal(app.termsUrl, `/apps/${app.slug}/terms`);
        assert.ok(
          exists(join('src/content/apps', app.slug, 'terms.mdx')),
          `${app.slug} terms.mdx exists`,
        );
      }
    }

    const picmory = content.apps.find((app) => app.slug === 'picmory');

    assert.ok(picmory);
    assert.equal(picmory.termsUrl, '/apps/picmory/terms');
  });

  it('keeps the approved Picmory legal clauses and publication placeholders', () => {
    const terms = readFileSync(new URL('src/content/apps/picmory/terms.mdx', root), 'utf8');
    const privacy = readFileSync(new URL('src/content/apps/picmory/privacy.mdx', root), 'utf8');

    assert.ok(terms.includes('회원은 언제든지 앱에서 탈퇴할 수 있으며, 회사는 탈퇴 즉시'));
    assert.ok(privacy.includes('회원 정보 데이터베이스는 대한민국 내 회사 관리 서버에 저장됩니다.'));
    assert.ok(privacy.includes('사진 저장·전송 및 서비스 접속 중계'));
    assert.ok(terms.includes('### 제16조 (가입 자격)'));
    assert.ok(terms.includes('### 제17조 (회원 탈퇴)'));
    assert.ok(terms.includes('10. 이용자간 혹은 이용자와 제3자 상호간의 온라인 및 오프라인상에서'));
    assert.ok(terms.includes('\n11. 픽모리의 서비스에 배너광고'));
    assert.ok(terms.includes('\n14. 이용자가 작성한 정보가'));
    assert.doesNotMatch(terms, /^\d+\. (?:11|12|13|14)\. /m);

    // 게시 전에 원문의 미확정 표기를 실제 값으로 교체해야 합니다.
    for (const document of [terms, privacy]) {
      assert.ok(document.includes('[N]'));
      assert.ok(document.includes('[시행일 확인 필요]'));
    }
    assert.ok(privacy.includes('[확인 필요]'));
  });

  it('publishes the App Store links', () => {
    const content = loadContent();
    const picmory = content.apps.find((app) => app.slug === 'picmory');
    const walkBingo = content.apps.find((app) => app.slug === 'walk-bingo');

    assert.ok(picmory);
    assert.equal(picmory.appStoreUrl, 'https://apps.apple.com/kr/app/picmory/id6476240673');
    assert.equal(picmory.googlePlayUrl, 'https://play.google.com/store/apps/details?id=com.sanbalstudio.picmory');
    assert.ok(walkBingo);
    assert.equal(walkBingo.status, 'published');
    assert.equal(walkBingo.appStoreUrl, 'https://apps.apple.com/kr/app/산책빙고/id6774197634');
    assert.equal(walkBingo.googlePlayUrl, '');
  });
});
