# CV Angular Application

A modern, responsive CV landing page built with Angular.

## Features

- Responsive design for all devices
- Dark/light mode toggle
- Modern UI with animations
- GitHub projects showcase
- Professional layout for CV information
- Built with Angular 17+ Standalone Components
- Server-Side Rendering (SSR) support

## Setup

1. Install dependencies:
```
npm install
```

2. Run the development server:
```
ng serve
```

3. Build for production:
```
ng build
```

4. Build with SSR:
```
ng build && ng run CV:server && ng run CV:prerender
```

## Customization

Update the personal information in the respective component files to customize the CV to your needs.

- Edit personal info in `src/app/components/sidebar/sidebar.component.ts`
- Update work experience in `src/app/components/sections/experience-section/experience-section.component.ts`
- Modify education details in `src/app/components/sections/education-section/education-section.component.ts` 
- Change GitHub projects in `src/app/components/sections/projects-section/projects-section.component.ts`
