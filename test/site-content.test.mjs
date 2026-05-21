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

  it('keeps the first launch apps required by the PRD', () => {
    const content = loadContent();
    const slugs = content.apps.map((app) => app.slug).sort();

    assert.deepEqual(slugs, ['not-todo', 'walk-bingo']);
  });

  it('provides studio contact links for the home and contact pages', () => {
    const content = loadContent();

    assert.equal(content.studio.email, 'sanbal-studio@ksanbal.trade');
    assert.match(content.studio.links.threads, /^https:\/\/www\.threads\.net\//);
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
      assert.equal(app.supportUrl, `/apps/${app.slug}/support`);
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
      'src/pages/contact.astro',
    ]) {
      assert.ok(exists(page), `${page} exists`);
    }
  });

  it('hides download calls to action for coming soon apps', () => {
    const content = loadContent();
    const walkBingo = content.apps.find((app) => app.slug === 'walk-bingo');

    assert.equal(walkBingo.status, 'comingSoon');
    assert.equal(walkBingo.appStoreUrl, '');
    assert.equal(walkBingo.googlePlayUrl, '');
  });
});
