export const siteConfig = {
  brandName: '베가티켓',
  brandNameKo: '베가티켓',
  tagline: '소액결제 · 정보이용료 · 신용카드 현금화 전문',
  phone: '010-2013-6982',
  kakaoId: '@VEGATICKET',
  kakaoUrl: 'https://vvd.im/vega',
  telUrl: 'tel:010-2013-6982',
  businessHours: '24시간 연중무휴',
  companyName: '베가티켓',
};

export const navigation = [
  { label: '홈', href: '/' },
  { label: '서비스 안내', href: '/service' },
  { label: '이용방법', href: '/guide' },
  { label: '공지사항', href: '/notice' },
  { label: 'FAQ', href: '/faq' }
];

export const serviceCards = [
  {
    title: '소액결제 현금화',
    shortTitle: '소액결제 현금화',
    rate: '최대 75% 지급',
    summary: 'SKT · KT · LGU+ 통신사 소액결제 현금화 최대한도 100만원·신용점수 영향 없음',
    description: '최소 5만원부터 최대 100만원까지 가능 여부를 확인하고, 미납 · 정책 제한 상황도 함께 상담합니다.',
    points: ['모든 통신사', '최소 5만원부터 가능', '미납 · 정책 제한 상담', '상담 후 지급률 안내'],
    visual: 'phone',
    tone: 'primary'
  },
  {
    title: '정보이용료 현금화',
    shortTitle: '정보이용료 현금화',
    rate: '최대 85% 지급',
    summary: '구글 · 애플 · 원스토어 등 콘텐츠 이용료 소액결제와 합산시 최대 200만원',
    description: '정보 · 콘텐츠 이용료 가능 범위와 지급률을 확인하고, 소액결제와 합산 가능 여부까지 안내합니다.',
    points: ['구글 · 애플 · 원스토어', '최대 100만원 한도', '소액결제와 합산 상담', '즉시 입금 처리 안내'],
    visual: 'chart',
    tone: 'light'
  },
  {
    title: '신용카드 현금화',
    shortTitle: '신용카드 현금화',
    rate: '최대 90% 지급',
    summary: '신용카드 한도와 결제 상황에 맞춰 상품별 할부조건과 상품을 안내해 드립니다',
    description: '모든 카드사 이용 가능 여부, 할부결제, 한도 조건 등을 확인하고 상담 후 정확한 지급률을 안내합니다.',
    points: ['모든 카드사 상담', '할부결제 가능 여부 확인', '한도 조건 확인', '상담 후 진행 안내'],
    visual: 'card',
    tone: 'tall'
  }
];

export const supportTiles = [
  { title: '빠른 입금', summary: '상담부터 입금까지 5분이면 충분합니다 \n24시간 동일하게 신속 입금 해드립니다', visual: 'clock' },
  { title: '미납/정책 상담', summary: '미납, 연체, 이용 제한 해결 전문 업체입니다 \n98%의 높은 승인율 보장', visual: 'search' },
  { title: '24시간 상담', summary: '365일 24시간 언제든지 상담 신청 가능 \n대기시간 없는 빠른 처리 ', visual: 'headset' },
];

export const benefits = [
  { icon: '01', title: '빠른 상담', text: '신속한 상담으로 시간을 아껴드립니다.' },
  { icon: '02', title: '투명한 안내', text: '지급률과 진행 절차를 상담 후 정확히 안내합니다.' },
  { icon: '03', title: '개인정보 보호', text: '본인 확인과 개인정보 보호 기준을 지킵니다.' },
  { icon: '24', title: '24시간 운영', text: '야간 · 주말 · 공휴일에도 상담 가능합니다.' },
  { icon: '05', title: '미납 상담 가능', text: '미납 · 정책 제한 상황도 해결해 드립니다.' },
  { icon: '06', title: '간편한 진행', text: '복잡한 절차 없이 진행합니다.' },
  { icon: '07', title: '맞춤 상담', text: '고객 상황에 맞는 상품을 안내합니다.' },
  { icon: '08', title: '빠른 확인', text: '한도와 예상 입금액을 빠르게 확인합니다.' }
];

export const processSteps = [
  { step: '01', title: '상담 신청', text: '카카오톡 또는 전화로 상담을 신청합니다.', tag: '24시간 연결' },
  { step: '02', title: '한도 확인', text: '소액결제 가능 한도와 진행 가능 상품을 확인합니다.', tag: '지급률 안내' },
  { step: '03', title: '진행 안내', text: '상담 내용을 바탕으로 진행 절차와 유의사항을 안내합니다.', tag: '안전 안내' },
  { step: '04', title: '입금 확인', text: '진행 완료 후 입금과 완료 알림을 확인합니다.', tag: '완료 알림' }
];

export const reviews = [
  { title: '소액결제 상담 후기', text: '처음이라 걱정했는데 설명이 깔끔했고 진행도 빨라서 만족했습니다.', name: '김**님', date: '2026.02.18', type: '소액결제 · 50만원', visual: 'review-phone' },
  { title: '정보이용료 상담 후기', text: '지급률과 입금액을 먼저 안내받고 진행해서 안심할 수 있었습니다.', name: '박**님', date: '2026.02.18', type: '정보이용료 · 100만원', visual: 'review-doc' },
  { title: '신용카드 상담 후기', text: '복잡할 줄 알았는데 상담 절차대로 진행되어 편했습니다.', name: '이**님', date: '2026.02.17', type: '신용카드 상담', visual: 'review-card' }
];

export const notices = [
  { title: '상담 가능 시간 및 운영 안내', date: '2026.02.18' },
  { title: '개인정보 보호 정책 안내', date: '2026.02.15' },
  { title: '소액결제 상담 절차 안내', date: '2026.02.12' },
  { title: '정보이용료 관련 안내', date: '2026.02.10' },
  { title: '자주 묻는 질문 모음', date: '2026.02.08' }
];

export const guidePosts = [
  { title: '소액결제, 안전하게 이용하는 방법', text: '소액결제 이용 전 확인해야 할 지급률, 한도, 절차를 정리했습니다.', date: '2026.02.18', visual: 'guide-payment' },
  { title: '정보이용료란 무엇인가요?', text: '정보이용료와 소액결제의 차이, 이용 가능 범위를 쉽게 설명합니다.', date: '2026.02.15', visual: 'guide-info' }
];

export const faqs = [
  { category: '안전·보안', question: '소액결제 현금화는 안전한가요?', answer: '본인 확인과 상담 절차를 거쳐 진행하며, 개인정보 보호와 비밀 보장을 우선으로 안내합니다.' },
  { category: '지급률', question: '지급률은 어떻게 되나요?', answer: '소액결제 최대 75%, 정보이용료 최대 85%, 신용카드 최대 90% 기준으로 안내하되, 실제 지급률은 금액과 상황에 따라 상담 후 정확히 안내합니다.' },
  { category: '입금 속도', question: '입금까지 얼마나 걸리나요?', answer: '본인 확인과 진행이 완료되면 빠르게 입금 안내가 이루어집니다. 다만 은행 점검 시간에는 입금 처리가 지연될 수 있습니다.' },
  { category: '미납·제한', question: '미납이 있어도 상담 가능한가요?', answer: '미납 · 정책 제한이 있는 경우에도 상황에 따라 가능 여부를 확인하고, 가능한 진행 방법을 안내합니다.' },
  { category: '서비스 차이', question: '정보이용료와 소액결제 차이는 무엇인가요?', answer: '소액결제는 통신사 요금에 포함되는 결제 방식이고, 정보이용료는 콘텐츠 구매 시 발생하는 별도 결제입니다.' },
  { category: '신용카드', question: '어떤 카드사 신용카드도 가능한가요?', answer: '국내 카드사 이용 가능 여부와 한도 조건은 상담을 통해 확인합니다.' }
];
