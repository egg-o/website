import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages hosts project sites at /repository-name/ rather than at /.
// A user site (owner.github.io) or custom domain is served at / instead.
const [owner, repositoryName] = process.env.GITHUB_REPOSITORY?.split('/') ?? []
const base = process.env.PAGES_BASE_PATH ||
  (repositoryName && repositoryName.toLowerCase() !== `${owner?.toLowerCase()}.github.io` ? `/${repositoryName}/` : '/')

export default defineConfig({
  plugins: [react()],
  base,
})
