# Developer Skill & Preference Guide: Zubair

This document captures the specific development style, technical preferences, and procedural requirements unique to Zubair's workflow.

## 🎨 Aesthetic & Brand Vision
- **Premium Focus**: Always aim for "WOW" factor. Use curated palettes (HSL), modern typography (Inter, Playfair Display), and subtle animations (Framer Motion).
- **Minimalist Luxury**: Avoid cluttered UIs. Clean lines, generous spacing, and high-quality imagery (Montblanc style).
- **Glassmorphism**: Use backdrop blurs and subtle transparency for a premium feel.

## 🛠 Technical Hardlines
- **Latest Tech, Planned Well**: Prioritize using the latest stable versions (e.g., Tailwind v4). Don't stick to older versions just for "stability" if a well-planned migration can bring better features and performance. "Juggle issues" if it means arriving at the right final solution.
- **Headless First**: Payload CMS 3.x is the preferred backend for modern e-commerce.
- **Strict Typing**: Payload types must be generated and strictly followed in the frontend.
- **Naming Protocol**: Be wary of Mongoose reserved words. Use descriptive names like `penCollection` instead of generic `collection`.
- **Layout Architecture**: **NO** nested HTML. Use parallel root layouts: `(frontend)` for public sites, `(payload)` for admin. Delete top-level `src/app/layout.tsx`.

## 📜 Documentation & Memory
- **No Lost Lessons**: Every resolved issue must be logged in `Tech-stack-choice.md`.
- **Session Continuity**: Use `memory.md` to bridge gaps between sessions so any developer can pick up immediately.
- **"Final Working Solutions"**: Documentation should focus on the *solution* and *why* it works, acting as a shortcut for future projects.

## ⚙️ Workflow & Tooling
- **Package Manager**: NPM is the primary tool.
- **Database**: Shift to MongoDB Atlas (Cloud) early to avoid local setup friction.
- **Environment**: Keep `.env` simple and well-documented.
- **Cleanup**: Proactively fix TypeScript errors and console warnings.
- **Troubleshooting Protocol**:
    - For database hangs/SSL errors, always check **IP whitelisting** first via `curl.exe https://api.ipify.org`.
    - For duplicate React keys in Payload galleries, always filter by ID: `self.findIndex((t) => t.id === img.id)`.
    - For missing images, check `next.config.mjs` for **remotePatterns** configuration.

### 🛑 Critical Protocols
- **Git Commit Rule**: **DO NOT COMMIT OR PUSH** without specific, explicit user permission. Always ask before running `git commit` or `git push`. This is a hard rule.

## 💡 Personal Development Philosophy
"I want to jump straight to the final working solution instead of juggling with issues."
- Focus on efficiency and reproducibility.
- Build components that are reusable but tailored to the brand's premium identity.
- Documentation isn't optional; it's the foundation of the next project.
