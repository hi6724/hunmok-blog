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
        title: "JavaScript & TypeScript",
        description: `
자바스트립트 및 타입스크립트를 사용해서 웹서비스를 개발한 경험이 있습니다.
        `,
      },
      {
        title: "python",
        description: `
        `,
      },
      {
        title: "java",
        description: `
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
리액트를 사용해서 웹개발을 한적이 있고,
리액트 네이티브를 사용해서 앱개발을 한 경험이 있습니다.
메모이제이션을 이용한 렌더링 최적화에 대해서 이해하고 있습니다.
상태 관리 라이브러리를 이용한 전역 상태 관리에 대해 이해하고 있습니다.
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
twailwind, scss 를 사용할 수 있습니다. 
styled-components, emotion 과 같은 css in js 를 사용할 수 있습니다.
gsap 및 framer-motion 과 같은 애니메이션 라이브러리를 사용할 수 있습니다.
media query 를 이용한 반응 형 웹사이트를 제작할 수 있습니다.
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
간단한 rest api 를 구축할 수 있습니다.
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
        title: "slack",
        description: `
SSAFY 에서 Spring 에 대해서 배우고 있습니다.
MVC 패턴을 이해하고 있고 사용할 수 있습니다.
`,
      },
      {
        title: "figma",
        description: `
SSAFY 에서 Spring 에 대해서 배우고 있습니다.
MVC 패턴을 이해하고 있고 사용할 수 있습니다.
`,
      },
    ],
  },
];
