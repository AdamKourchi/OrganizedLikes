import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: 'OrganizedLike', // Replace 'repository-name' with your actual repository name
  plugins: [react()],
});
