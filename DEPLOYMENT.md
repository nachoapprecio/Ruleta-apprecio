# Instrucciones de Instalación y Deployment

## 🚀 Deployment en Vercel (Recomendado)

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   cd fortune-wheel-web
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/fortune-wheel-web.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js
   - Haz clic en "Deploy"

3. **¡Listo!** Tu aplicación estará disponible en unos minutos.

### Opción 2: Deployment Directo con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Desde la carpeta del proyecto:**
   ```bash
   cd fortune-wheel-web
   vercel
   ```

3. **Sigue las instrucciones** en la terminal.

## 💻 Desarrollo Local

### Prerequisitos
- Node.js 18.0 o superior
- npm, yarn o pnpm

### Pasos

1. **Instala dependencias:**
   ```bash
   cd fortune-wheel-web
   npm install
   ```

2. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abre tu navegador:**
   - Ve a [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificación de tipos
```

## 🌍 Otras Opciones de Deployment

### Netlify
1. Conecta tu repositorio de GitHub con Netlify
2. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `out`

### GitHub Pages
1. Modifica `next.config.js` para GitHub Pages:
   ```js
   const nextConfig = {
     output: 'export',
     basePath: '/nombre-de-tu-repo',
     images: { unoptimized: true }
   }
   ```

2. Ejecuta:
   ```bash
   npm run build
   ```

3. Sube la carpeta `out` a la rama `gh-pages`

## 🔐 Variables de Entorno

Este proyecto no requiere variables de entorno para funcionar, pero si quieres personalizar algo:

```bash
# .env.local (opcional)
NEXT_PUBLIC_APP_NAME="Mi Ruleta Personalizada"
```

## ⚡ Optimizaciones de Performance

El proyecto ya incluye:
- ✅ Optimización automática de imágenes
- ✅ Code splitting automático
- ✅ Compresión gzip
- ✅ Static generation cuando es posible
- ✅ Lazy loading de componentes

## 🐛 Solución de Problemas

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de build en Vercel
- Asegúrate de que `next.config.js` esté configurado correctamente
- Verifica que todas las dependencias estén en `package.json`

### Problemas con TypeScript
```bash
npm run type-check
```

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Vercel](https://vercel.com/docs)
3. Abre un issue en el repositorio