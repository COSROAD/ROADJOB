// ⚠ 임시 진단 파일 — IP 등록 끝나면 삭제
//
// 목적: 로드잡 Vercel 함수가 밖으로 나갈 때 쓰는 발신 IP를 알아내기 위한 것.
//       알리고가 발신 IP를 몰라 문자를 차단 중이라, 등록할 IP를 확인하는 용도.
// 하는 일: 서버에서 https://api.ipify.org?format=json 을 불러 그 결과를 그대로 돌려준다.
//          비밀키·발송·저장 없음. 조회 전용.
// 쓰는 법: https://roadjob.vercel.app/api/egress-ip 를 브라우저로 열면 된다.

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, message: 'GET만 허용' });

  try {
    const r = await fetch('https://api.ipify.org?format=json');
    const j = await r.json();
    return res.status(200).json({ ok: true, ip: j.ip });
  } catch (e) {
    return res.status(500).json({ ok: false, message: '조회 실패: ' + (e && e.message ? e.message : String(e)) });
  }
}
