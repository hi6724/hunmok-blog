export interface ISkillDetail {
  title: string;
  description: string;
}
export interface ISkill {
  title: string;
  type: string;
  value: number;
  details: ISkillDetail[];
}
export const SKILL_DATA: ISkill[] = [
  {
    title: "LANGUAGE",
    type: "fullstack",
    value: 80,
    details: [
      {
        title: "JS & TS",
        description: `
JS 및 TS 사용해서 웹서비스를 개발한 경험이 있습니다.
TS의 타입추론에 대해서 이해하고 있습니다.
        `,
      },
      {
        title: "python",
        description: `
주로 python 을 사용해서 알고리즘을 공부하고 있습니다.
django 로 간단한 rest api 를 개발할 수 있습니다.
        `,
      },
      {
        title: "java",
        description: `
java의 기초적인 활용이 가능합니다.
현재 SSAFY에서 spring 을 배우고 있습니다.
`,
      },
    ],
  },
  {
    title: "FRONTEND",
    type: "frontend",
    value: 80,
    details: [
      {
        title: "react & react-native",
        description: `
렌더링 최적화에 대해서 이해하고 있습니다.
전역 상태관리에 대해서 이해하고 있고, FLUX 패턴을 적용시킬 수 있습니다.
RTK, Recoil, SWR 과 같은 라이브러리를 사용할 수 있습니다.
        `,
      },
      {
        title: "next",
        description: `
next.js 를 사용해서 프로젝트를 진행 한 적이 있습니다.
SSR, SSG, ISG  의 장단점에 대해서 이해하고 적절하게 사용할 수 있습니다. 
        `,
      },
      {
        title: "style",
        description: `
css in js 와 tailwind 를 사용할 수 있습니다. 
gsap 및 framer-motion 과 같은 애니메이션 라이브러리를 사용할 수 있습니다.
`,
      },
    ],
  },
  {
    title: "BACKEND",
    type: "backend",
    value: 50,
    details: [
      {
        title: "express & graphql",
        description: `
nodeJS의 express와 graphql을 이용해서 백엔드를 개발한 경험이 있습니다.
express로 간단한 rest api 를 구축할 수 있습니다.
`,
      },
      {
        title: "Spring",
        description: `
SSAFY 에서 Spring 에 대해서 배우고 있습니다.
MVC 패턴을 이해하고 있고 사용할 수 있습니다.
`,
      },
    ],
  },

  {
    title: "TOOLS",
    type: "asd",
    value: 70,
    details: [
      {
        title: "git & github",
        description: `
git을 이용해서 협업 및, 버전 관리를 할 수 있습니다.
github을 이용해서 소스 코드 관리를 한 적이 있습니다.
`,
      },
      {
        title: "slack & notion",
        description: `
slack 과 notion 을 통한 커뮤니케이션이 능숙합니다.
notion 과 slack api 를 사용한 경험이 있습니다.
`,
      },
      {
        title: "figma",
        description: `
figma 를 사용한 협업경험이 있습니다.
figma 의 내용대로 구현할 수 있습니다.
`,
      },
    ],
  },
];
