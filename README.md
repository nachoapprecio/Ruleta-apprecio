# Ruleta Apprecio

La oportunidad de ganar puntos ¡está aquí! Juega con la Ruleta apprecio y Gana! Una aplicación web interactiva construida con Next.js, TypeScript y Tailwind CSS.

## 🎡 Características

- **Ruleta personalizable**: Agrega, elimina y personaliza elementos
- **Animaciones suaves**: Animaciones fluidas con Framer Motion
- **Responsive**: Funciona perfectamente en desktop y móvil
- **Historial de giros**: Mantiene un registro de los últimos ganadores
- **TypeScript**: Tipado fuerte para mejor desarrollo
- **Optimizada para Vercel**: Lista para deployment inmediato

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18.0 o superior
- npm, yarn o pnpm

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/fortune-wheel-web.git
cd fortune-wheel-web
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run type-check` - Verifica los tipos de TypeScript

## 🛠️ Tecnologías Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework de React
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Librería de animaciones
- **[React](https://reactjs.org/)** - Librería de UI

## 🎨 Personalización

### Agregar Nuevos Elementos

La aplicación permite agregar elementos dinámicamente a través de la interfaz, pero también puedes modificar los elementos por defecto en `src/app/page.tsx`:

```typescript
const defaultItems: FortuneWheelItem[] = [
  { id: '1', label: 'Tu Premio 1', color: '#3B82F6' },
  { id: '2', label: 'Tu Premio 2', color: '#EF4444' },
  // Agrega más elementos aquí
];
```

### Personalizar Colores

Los colores se generan automáticamente, pero puedes personalizar la paleta en `src/utils/wheel-utils.ts`:

```typescript
const colors = [
  '#3B82F6', // Azul
  '#EF4444', // Rojo
  '#10B981', // Verde
  // Agrega más colores aquí
];
```

## 🚀 Deployment en Vercel

1. Haz fork de este repositorio
2. Conecta el repositorio con tu cuenta de Vercel
3. ¡Vercel detectará automáticamente la configuración y hará el deployment!

### Variables de Entorno

No se requieren variables de entorno para el funcionamiento básico.

## 📱 Características de la Aplicación

### Componente Principal: FortuneWheel

- **Props configurables**: Tamaño, colores, duración del giro
- **Eventos**: Callback cuando se completa el giro
- **Animaciones**: Rotación suave con easing personalizado
- **Responsive**: Se adapta a diferentes tamaños de pantalla

### Funcionalidades Adicionales

- **Gestión de elementos**: Agregar/eliminar elementos dinámicamente
- **Historial**: Registro de los últimos 5 ganadores
- **Validaciones**: Mínimo 2 elementos requeridos
- **Persistencia visual**: Indicador del último ganador

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Ver el archivo `LICENSE` para más detalles.

## 🔗 Links Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Framer Motion](https://www.framer.com/motion/)
- [Guía de Deployment en Vercel](https://vercel.com/docs)

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

---

**¡Disfruta girando la rueda de la fortuna! 🎉**