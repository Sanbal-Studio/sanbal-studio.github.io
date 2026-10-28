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

    assert.ok(terms.includes('② 회사는 탈퇴 즉시 회원의 개인정보와 업로드한 사진을 파기합니다.'));
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
    // [전화번호]는 게시 전에 실제 값으로 치환해야 하는 표지입니다.
    assert.ok(privacy.includes('전화: [전화번호]'));
    assert.doesNotMatch(privacy, /0\d{1,2}-?\d{3,4}-?\d{4}/);
    // [M]은 minimal records 보관 기간으로, 현균님 결정 전까지 표지로 남깁니다.
    const retention = '탈퇴 즉시 파기합니다. 다만 부정 이용 방지와 분쟁 대응을 위해 원래 식별자를 알 수 없도록 변환한 탈퇴 기록과 동의 이력은 [M]일간 보관 후 파기합니다.';
    assert.ok(privacy.includes('회원 탈퇴 시 개인정보를 ' + retention));
    assert.ok(privacy.includes('해당 기록은 ' + retention));
    assert.ok(terms.includes('다만 부정 이용 방지와 분쟁 대응을 위해 원래 식별자를 알 수 없도록 변환한 탈퇴 기록과 동의 이력은 [M]일간 보관 후 파기합니다.'));
    assert.ok(privacy.includes('| 부정 이용 방지·분쟁 대응 | 탈퇴 후 [M]일 |'));
    assert.ok(!privacy.includes('해당 기록은 회원 탈퇴 시 함께 파기합니다.'));
    assert.ok(!privacy.includes('개인정보를 지체 없이 파기합니다. 시스템'));
    assert.ok(terms.includes('[M]일간'));
  });

  it('keeps the revised Picmory privacy disclosures', () => {
    const privacy = readFileSync(new URL('src/content/apps/picmory/privacy.mdx', root), 'utf8');

    for (const clause of [
      '단, 관계 법령에 따라 보존해야 하는 경우나 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 기간 동안만 보관합니다.',
      '| 구글 계정을 연동한 회원가입 | 이용자 고유 식별자, 이메일 주소, 이름(닉네임), 프로필 사진 URL |',
      '| 애플 계정을 연동한 회원가입 | 이용자 고유 식별자, 이메일 주소, 이름(닉네임) |',
      '서비스 이용 과정에서 회원이 업로드한 사진·영상, 푸시 토큰, 만 14세 이상 확인 체크와 동의 기록(일시·문구 버전)이 처리됩니다.\n\n| 처리 항목 | 처리 목적 | 보유 및 이용기간 |\n| --- | --- | --- |\n| 원래 식별자를 알 수 없도록 변환(HMAC)한 탈퇴 기록, 해시 처리한 동의 이력 | 부정 이용 방지·분쟁 대응 | 탈퇴 후 [M]일 |\n\n또한, 이용자의 서비스 이용과정에서',
      '## 제4조 (개인정보 처리 위탁)\n\n회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁합니다. 국외 이전에 관한 사항은 제11조에 따릅니다.\n\n- 수탁자: Google LLC / 위탁업무: 푸시 알림, 오류 분석, 원격 설정, 이용 분석, 광고 제공\n- 수탁자: Cloudflare, Inc. / 위탁업무: 사진 저장·전송 및 서비스 접속 중계',
      '- 동의 철회: 마이페이지 > 회원 탈퇴 (이용 분석·맞춤형 광고 동의는 앱 설정에서 개별 철회)',
      "② 연령은 이용자의 '만 14세 이상' 체크로 확인하며 생년월일을 수집하지 않습니다. 체크 여부와 동의 기록(일시·문구 버전)만 보관합니다. 해당 기록은 탈퇴 즉시 파기합니다. 다만 부정 이용 방지와 분쟁 대응을 위해 원래 식별자를 알 수 없도록 변환한 탈퇴 기록과 동의 이력은 [M]일간 보관 후 파기합니다.",
      '앱 이용 기록, 회원 식별자(이용 분석 동의 시), 오류 로그',
      '항목: 사진 파일, 서비스 요청 데이터(회원 식별자 등), 접속 IP',
      "③ 국외 이전 거부 방법 및 불이익: 이용 분석과 맞춤형 광고는 앱 설정 또는 iOS '추적 허용' 해제로 거부할 수 있으며 서비스 이용에 불이익이 없습니다. 푸시 알림, 오류 분석, 사진 저장은 서비스 제공에 필요하여 거부하려면 회원 탈퇴가 필요합니다.",
      "앱은 Google AdMob을 통해 광고를 제공하며, 맞춤형 광고는 회원이 동의한 경우에만 제공합니다. iOS는 '추적 허용'을 선택한 경우, Android는 앱의 동의 화면에서 동의한 경우에만 광고 식별자와 앱 이용 기록이 맞춤형 광고에 사용됩니다. 동의하지 않아도 서비스는 똑같이 이용할 수 있으며 맞춤형이 아닌 광고가 표시됩니다. 동의는 앱 설정 또는 기기의 광고·추적 설정에서 언제든지 철회할 수 있습니다.",
      '14. 개인정보 보호책임자',
      '## 제14조 (개인정보 보호책임자)\n\n성명: 김현균 / 이메일: picmory.contact@gmail.com / 전화: [전화번호]\n\n이 개인정보 처리방침은 시행일로부터 적용됩니다.',
    ]) {
      assert.ok(privacy.includes(clause), `privacy includes ${clause}`);
    }

    for (const removed of ['Notion', '뷰저블', 'Google Analytics Academy', '30일']) {
      assert.ok(!privacy.includes(removed), `privacy excludes ${removed}`);
    }
  });

  it('keeps the revised Picmory terms clauses', () => {
    const terms = readFileSync(new URL('src/content/apps/picmory/terms.mdx', root), 'utf8');

    for (const clause of [
      '픽모리(이하 “회사”)가 제공하는',
      '4. “아이디(ID)”라 함은',
      '1. 회원이 서비스 내에 작성한 텍스트, 사진, 영상 등 정보(이하 “게시물”)에 대한 책임 및 권리는 게시물을 등록한 회원에게 있습니다.',
      '5. 회원이 탈퇴하는 경우 회사는 제17조에 따라 회원이 올린 사진 등 게시물을 지체 없이 파기합니다. 다만 관계 법령에 따라 보존해야 하는 경우는 예외로 합니다.',
      '6. 게시물이 제 3자에 의하여 보관되거나 무단복제 등을 통하여 복제됨으로써 해당 게시물이 삭제되지 않고 재게시된 경우에 대하여 픽모리는 책임을 지지 않습니다.',
      '1. 소셜 로그인 계정에 관한 관리책임은 전적으로 회원에게 있습니다.',
      '2. 회원은 자신의 소셜 로그인 계정을 제3자에게 이용하게 해서는 안 됩니다.',
      '3. 회원이 자신의 소셜 로그인 계정을 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 픽모리에 통보하고 픽모리의 안내가 있는 경우에는 그에 따라야 합니다.',
      '11. 음란한 영상을 게시하는 행위',
      '위 1항 각 호 해당 사항에',
      '4. 이용계약이 해지되거나 회원이 탈퇴하는 경우 회사는 제17조 및 개인정보처리방침에 따라 회원의 개인정보와 업로드한 사진을 파기합니다.',
      '5. 제16조 ③에 따라 만 14세 미만으로 확인된 경우에도 계약이 종료됩니다.',
      '### 제17조 (회원 탈퇴)\n\n① 회원은 언제든지 앱에서 탈퇴할 수 있습니다.\n\n② 회사는 탈퇴 즉시 회원의 개인정보와 업로드한 사진을 파기합니다. 다만 부정 이용 방지와 분쟁 대응을 위해 원래 식별자를 알 수 없도록 변환한 탈퇴 기록과 동의 이력은 [M]일간 보관 후 파기합니다. 또한 관계 법령에 따라 보존해야 하는 경우, 또는 관계 법령 위반에 따른 수사·조사가 진행 중인 경우에는 그 기간 동안 보관 후 파기합니다.\n\n③ 백업본은 백업 보관 주기([N]일) 내에 파기하며, 그동안 서비스 운영에 사용하지 않습니다.',
      "### 제18조 (광고)\n\n① 서비스에는 Google AdMob을 통한 광고가 표시될 수 있습니다.\n\n② 맞춤형 광고는 회원이 iOS의 '추적 허용' 또는 앱의 동의 화면에서 동의한 경우에만 제공하며, 동의하지 않아도 서비스를 똑같이 이용할 수 있습니다. 이 경우 맞춤형이 아닌 광고가 표시됩니다.\n\n③ 자세한 내용은 개인정보처리방침 제12조에 따릅니다.",
    ]) {
      assert.ok(terms.includes(clause), `terms includes ${clause}`);
    }

    for (const removed of [
      '타인의 문',
      '음란물 및 동영상',
      '이메일과 비밀번호',
      '이메일 및 비밀번호',
      '위 2항 각 호',
    ]) {
      assert.ok(!terms.includes(removed), `terms excludes ${removed}`);
    }

    assert.equal([...terms.matchAll(/“회원”(?:이라|라) 함은/g)].length, 1);
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
