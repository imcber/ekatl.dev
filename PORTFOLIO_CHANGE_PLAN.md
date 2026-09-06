# Portfolio change plan based on the updated resume

Source of truth reviewed: `ekatl-cv-es.pdf` (updated August 2026).

## Objective

Reposition the portfolio from a generic full-stack profile into the profile shown by the resume: an experienced full-stack engineer who can design APIs, work across web and Android, improve delivery flows, apply clean architecture, and lead technically complex integrations.

The portfolio already has personality and real projects. Its main weakness is that it describes products more clearly than it demonstrates Bernardo's contribution, ownership, and engineering judgment.

## Priority 0 - Resolve factual inconsistencies

Complete these checks before rewriting or publishing. The site and resume should make identical claims.

- [ ] **Years of experience:** the resume and current home content say 7 years, but the employment history starts in February 2018. In September 2026, that timeline indicates more than 8 years. Choose one defensible value and use it everywhere. A durable alternative is `más de 8 años de experiencia`.
- [ ] **Current work:** confirm whether TCPIP is still the current employer. If not, replace `Agosto 2020 - Actualidad` and add the subsequent role.
- [ ] **Nubia scope:** the portfolio says the WhatsApp flow includes payment; the resume mentions flight quoting/reservations but not payment. Confirm whether payment shipped before retaining that claim.
- [ ] **Coppel scope and role:** the resume emphasizes Android analytics modules in Kotlin. The portfolio adds Compose UI work and labels the role `FrontEnd`. Confirm both claims, then use a clearer role such as `Android Developer` or `Android / Kotlin Developer`.
- [ ] **Uniken dates:** the portfolio says `2023 - Present`. Confirm that this engagement is still active and that it can be presented publicly.
- [ ] **TAR and Nubia URL:** both point to TAR's public site. Make it explicit that Nubia is a project for TAR rather than suggesting they are unrelated products.
- [ ] **Confidentiality:** confirm which architectural details, vendor names, and client work may be shown publicly, especially Blnk, S3, internal APIs, analytics, and LLM integrations.

## Priority 1 - Replace the resume downloadable from the site

The website currently ships older files at:

- `public/resume/es.pdf`
- `public/resume/en.pdf`

Required changes:

- [ ] Replace `public/resume/es.pdf` with the updated Spanish resume after correcting the issues listed below.
- [ ] Update the English resume so it matches the Spanish resume in dates, projects, technologies, and positioning.
- [ ] Keep the public filenames stable so existing download links continue working.
- [ ] Confirm that the downloaded file has a professional filename, for example `Bernardo-Ramirez-CV-ES.pdf`, rather than the generated `Bernardo/resume/es.pdf` name currently implied by the download attribute.

Resume corrections recommended before copying it into the site:

- [ ] Change `Fullstack Developer` to `Full-Stack Developer` or `Desarrollador Full-Stack`; use the same spelling throughout.
- [ ] Correct `inyeccion` to `inyección`.
- [ ] Remove the space before the period in `tarmexico.com .`.
- [ ] Rewrite `El reto fue la adaptación a la tecnología aplicando principios sobre Kotlin`; it is vague and sounds junior. State what was built and which Kotlin/Android practices were applied.
- [ ] Change `principalmente con React y Angular para frontend y Java/JS/Python en backend` to a clearer, parallel construction: `React y Angular en frontend; Java, JavaScript y Python en backend`.
- [ ] Do not claim that TDD is an architecture. In the resume, separate `Arquitectura: Event-Driven, IoC, DI` from `Prácticas: TDD`.
- [ ] `IoC` and `DI` are design principles/patterns rather than complete architectures. Prefer `Arquitectura y diseño: arquitectura orientada a eventos, arquitectura hexagonal, IoC y DI` if all are supported by actual experience.
- [ ] Consider replacing `Agentes (Claude, Codex)` with the capability delivered, such as `Agentes conversacionales e integración de LLMs`. Product names can remain as secondary keywords.
- [ ] Add `Arquitectura hexagonal` to the resume because it is a meaningful differentiator and appears in the portfolio's Nubia description.
- [ ] Recalculate `7 años` against the employment dates.
- [ ] Add measurable outcomes where evidence is available. Do not invent figures. Useful examples include API latency reduction, deployment time reduction, number of migrated wallets, error-rate improvement, release frequency, supported users, or transaction volume.

## Priority 2 - Rewrite the home-page positioning

File: `src/content/home/es/home.json`

The current sentence only communicates title and tenure:

> Soy un desarrollador Full-Stack con siete años de experiencia.

It does not explain your specialization or value. Replace it with a compact proposition aligned with the resume.

Suggested copy:

> Soy desarrollador full-stack con más de 8 años creando productos web, APIs y soluciones móviles para empresas como Coppel, Santander y TAR.

Alternative with a stronger technical focus:

> Diseño y construyo productos full-stack, APIs y soluciones móviles con Java, Python, Kotlin y TypeScript, aplicando arquitecturas escalables y buenas prácticas de ingeniería.

Additional changes:

- [ ] Correct `Hola!` to `¡Hola!`.
- [ ] Correct `diganme` to `díganme`.
- [ ] Keep `Nauseu'x` because it gives the portfolio personality, but ensure the tooltip is easy to discover on mobile and keyboard navigation.
- [ ] Change the primary CTA from generic `contacto` to an outcome-oriented label such as `Hablemos` or `Conoce mi trabajo`.
- [ ] Add a visible secondary CTA to `Ver proyectos` above the fold.

## Priority 3 - Rewrite the About page around professional value

File: `src/content/about-me/es/about-me.json`

The current paragraph focuses on learning and finding an opportunity. That language makes the profile sound earlier-career than the updated resume.

Suggested replacement:

> Soy Bernardo Ramírez, desarrollador full-stack con experiencia construyendo y optimizando sistemas web, APIs y aplicaciones móviles. He colaborado en productos para aviación, comercio, banca, seguridad y entretenimiento, trabajando con Java, Python, Kotlin y TypeScript. Me especializo en integrar servicios, diseñar soluciones desacopladas y llevar funcionalidades desde su definición hasta producción. También disfruto aprender, compartir decisiones técnicas y ayudar al equipo a entregar software mantenible.

Recommended table changes:

- [ ] Remove `Edad`; it becomes outdated and does not strengthen the professional profile.
- [ ] Correct the name to `Bernardo Ramírez`.
- [ ] Correct `México` and `Fotografía`.
- [ ] Replace the broad `Tecnologías` and `Frameworks y Librerías` rows with three clearer groups: `Especialidades`, `Stack principal`, and `Idiomas`.
- [ ] Suggested `Especialidades`: `APIs, sistemas orientados a eventos, integraciones, aplicaciones web y Android`.
- [ ] Suggested `Stack principal`: `Java, Python, Kotlin, TypeScript, Spring, FastAPI, React, Node.js`.
- [ ] Keep hobbies and the favorite book only if the page intentionally balances professional and personal identity. Move them below the professional information so they do not compete with the core message.
- [ ] Remove `En este momento, busco nuevas oportunidades laborales` unless actively job hunting. If retained, turn it into a specific CTA describing the desired role, location/remote preference, and type of challenge.

## Priority 4 - Turn each project into evidence

File: `src/content/projects/es/projects.json`

Every project card should answer four questions:

1. What problem existed?
2. What did you personally own?
3. What technical decision or constraint mattered?
4. What changed as a result?

Use first-person, action-oriented language. Avoid presenting a client's marketing description as your accomplishment.

### Nubia

Keep this project first because it is current, technically distinctive, and demonstrates applied LLM experience.

Suggested direction:

> Desarrollé el backend de un agente conversacional para cotizar y reservar vuelos de TAR mediante WhatsApp. Integré el modelo de lenguaje con el motor de reservaciones y diseñé el flujo con arquitectura hexagonal y comunicación orientada a eventos para aislar proveedores y mantener desacoplada la lógica de negocio.

- [ ] Confirm the payment claim.
- [ ] State the actual messaging provider, queue, and cloud service only if public and useful.
- [ ] Add a result such as completed booking flows, reduced manual intervention, response time, or operational coverage if measured.
- [ ] Replace `2024 - Present` with localized `2024 - actualidad` in Spanish.

### Wallet migration - Ganalottodo

This is the strongest ownership claim because the portfolio says `Lideré`.

Suggested direction:

> Lideré el rediseño y la migración del sistema de saldos hacia un ledger basado en Blnk. Definí la estrategia de migración y construí servicios en Java y Spring para transferir datos y saldos preservando su consistencia.

- [ ] Explain why the migration was necessary without disclosing confidential weaknesses.
- [ ] Add how balances were validated: reconciliation, idempotency, audit trail, rollback strategy, or automated tests, if applicable.
- [ ] Add measurable scale if permitted: wallets, records, balances, transactions, or migration duration.
- [ ] Use `Migración de wallets` or `Migración de monederos` consistently; avoid mixing languages unnecessarily.

### Coppel

The current description is the weakest card because it emphasizes that the work was difficult and that you adapted.

Replace:

> Como frontend fue un reto trabajar en la aplicación de coppel, sin embargo, logre adaptarme al desafio y poder publicar cambios en la app.

With a factual summary:

> Construí módulos de analítica para la aplicación Android de Coppel, trabajando con Kotlin y la estructura de datos existente para instrumentar eventos y apoyar el análisis del comportamiento de la app.

If the Compose work is confirmed, extend it with:

> También implementé interfaces con Jetpack Compose y participé en la publicación de cambios de la aplicación.

- [ ] Change role from `FrontEnd` to `Android Developer`.
- [ ] Correct `métodos`, `analítica`, `además`, and `utilizando`.
- [ ] Capitalize `Coppel` consistently.
- [ ] Explain what Firebase was used for if its tag remains.

### TAR México

The current product description is useful context but the task description is written as instructions rather than completed work.

Suggested replacement for the activity:

> Implementé y mantuve funcionalidades de pagos y facturación en microservicios Java/Spring. En frontend, migré componentes de clase a hooks, mejoré la gestión de estado y optimicé las solicitudes al backend. También mejoré los flujos de despliegue para hacer las entregas más confiables.

- [ ] Replace unverified claims such as `sistema más fluido` with a concrete result.
- [ ] If the resume claims reduced request time, add the measured before/after value or soften it to `optimicé las solicitudes`.
- [ ] Correct the tag `open-pay` to the official product spelling `Openpay`.
- [ ] Confirm whether crypto payments belong to your contribution or merely to the product.

### Uniken

The portfolio currently paraphrases the company's positioning instead of explaining the project.

Suggested replacement:

> Desarrollé APIs privadas en Python/FastAPI y Java para integrar servicios REST, bases de datos, buckets S3 y proveedores externos. Apliqué inyección de dependencias para separar integraciones y facilitar las pruebas y el mantenimiento.

- [ ] Correct `APIs`, `Python`, `bases de datos`, `así` and `implementación`.
- [ ] Replace the `js` tag if JavaScript was not part of your actual work. The resume names Python and Java.
- [ ] Add Java, FastAPI, S3, and DI tags if they accurately reflect your work.

### Needed

The portfolio and updated resume are misaligned: Needed is present on the site but absent from the new one-page resume. It can remain if it adds a distinct capability.

- [ ] Keep it only if it demonstrates something not already shown, such as SSO, evaluation engines, NestJS, or full-stack ownership.
- [ ] Replace the vague phrase `facilitar el intercambio de información` with the actual user or business workflow.
- [ ] Explain your contribution to SSO and evaluation formulas.
- [ ] Add the outcome or scale if available.
- [ ] If no stronger evidence is available, move it below the five projects represented in the resume.

## Priority 5 - Redesign the Stack page as a capabilities page

Files:

- `src/components/Stack/StackContainer.astro`
- `src/components/Stack/Cards.astro`

The current `advanced / medium` ratings and percentages are subjective and cannot be verified. They also conflict with the updated resume, which presents technologies by capability rather than self-rating.

Recommended change:

- [ ] Remove progress bars and `advanced / medium / beginner` labels.
- [ ] Group technologies by how you use them:
  - Languages: Java, Python, Kotlin, JavaScript, TypeScript
  - Frontend and mobile: React, Next.js, Angular, Android, Jetpack Compose
  - Backend: Spring, FastAPI, Node.js, NestJS
  - Data: PostgreSQL, MySQL, MongoDB, Redis, Blnk
  - Messaging and integrations: RabbitMQ, AWS SQS, REST APIs, PayPal, Openpay
  - Delivery and cloud: Docker, AWS, GitHub Actions, Jenkins, Maven, Gradle
  - Architecture and practices: hexagonal, event-driven, IoC, DI, TDD
  - Applied AI: LLM integration and conversational agents
- [ ] Link important capabilities to projects that prove them. Example: `Event-driven -> Nubia`, `Blnk -> Wallet migration`, `Kotlin -> Coppel`.
- [ ] If years are retained, update them from evidence and show them as approximate context, not as a measure of mastery.
- [ ] Add missing resume technologies: Angular, PostgreSQL, Redis, Docker, GitHub Actions, RabbitMQ, AWS SQS, Blnk, LLM integration, and agents.
- [ ] Remove or deprioritize technologies that are no longer representative of the roles you want.

## Priority 6 - Improve contact and hiring conversion

File: `src/content/home/es/home.json`

Corrected suggested copy:

> ¿Tienes un proyecto, una oportunidad o un reto técnico? Conversemos sobre desarrollo full-stack, arquitectura de software e integraciones.

Changes:

- [ ] Correct `¿Tienes`, `tecnología`, `arquitectura`, and `buenas prácticas`.
- [ ] Put LinkedIn before Instagram for professional visitors.
- [ ] Consider removing Instagram from the main professional CTA unless it supports your creative identity.
- [ ] Add a visible `Enviar correo` action using the existing email address.
- [ ] Add a short availability statement only if it is accurate, such as preferred role, remote/hybrid preference, and location.
- [ ] Track CV downloads and outbound project clicks with privacy-respecting analytics if you want evidence about portfolio performance.

## Priority 7 - Correct language and naming consistently

Apply these conventions across Spanish content:

- `full-stack` instead of alternating `Fullstack`, `Full-Stack`, and `full-stack`
- `JavaScript`, `TypeScript`, `React`, `Next.js`, `Node.js`, `NestJS`, `FastAPI`, `MongoDB`
- `API` / `APIs`, not `APIS`
- `frontend` and `backend` in lowercase when used generically
- `actualidad`, not `Present`, in the Spanish version
- `rol`, not `role`; `front-end` only if that is the selected editorial convention
- `Openpay`, not `open-pay`
- `México`, `Ramírez`, `fotografía`, `analítica`, `métodos`, `desafío`, `trabajé`, `implementación`

Also perform a complete Spanish proofreading pass. The current content has enough accent and agreement errors to weaken the perception of attention to detail.

## Priority 8 - Align the English version

After the Spanish facts and copy are approved:

- [ ] Translate meaning, not sentence structure.
- [ ] Use standard English role names: `Full-Stack Developer`, `Backend Developer`, `Android Developer`.
- [ ] Use `Present` only in English.
- [ ] Preserve the same project order, dates, responsibilities, technologies, and outcomes.
- [ ] Have the English copy reviewed for professional fluency before publishing; the website itself is evidence of written communication ability.

## Recommended portfolio structure

1. Hero: role, specialization, years, and two CTAs.
2. Selected work: Nubia, wallet migration, Coppel, TAR, and Uniken.
3. Capabilities: grouped stack with links to supporting projects.
4. About: professional story first, personal details second.
5. Experience: compact company timeline matching the resume.
6. Contact: clear invitation, email, LinkedIn, GitHub, and CV.

## Suggested implementation order

### Phase 1 - Accuracy and credibility

- [ ] Resolve the factual questions in Priority 0.
- [ ] Correct spelling, accents, product names, and role labels.
- [ ] Update the downloadable resume.
- [ ] Make Spanish and English facts identical.

### Phase 2 - Positioning

- [ ] Rewrite the hero and About page.
- [ ] Rewrite the five strongest projects around personal contribution.
- [ ] Remove subjective stack ratings and group capabilities.

### Phase 3 - Proof of impact

- [ ] Gather real metrics and add them where confidentiality allows.
- [ ] Create detailed case studies for Nubia and the wallet migration.
- [ ] Add architecture diagrams or concise technical explanations for those case studies.

### Phase 4 - Validation

- [ ] Test desktop and mobile layouts in both languages.
- [ ] Verify every external link and CV download.
- [ ] Check keyboard navigation, contrast, image alternative text, and heading order.
- [ ] Ask one recruiter and one senior engineer to review the portfolio for 60 seconds and describe the profile they inferred.

## Definition of done

The update is complete when a visitor can answer these questions within one minute:

- What kind of engineer is Bernardo?
- What complex systems has he personally built or improved?
- Which technologies and architectural practices can he demonstrate?
- What results did his work produce?
- What role is he seeking, if any?
- How can the visitor contact him or download the current resume?

The portfolio and resume should tell the same story: Bernardo is not simply familiar with many technologies; he has used them to ship integrations, APIs, mobile features, migrations, and production systems across several industries.
