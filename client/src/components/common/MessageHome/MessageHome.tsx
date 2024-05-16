import Button from '../button/Button';
import './messageHome.scss';

export default function MessageHome() {

  return (
    <div className="maintenance-container">
      <div className="maintenance-message">
        <h1>¡Sitio en Mantenimiento!</h1>
        <p>Estamos realizando mejoras en nuestro sitio. ¡Volveremos pronto!</p>
        <p>Si no deseas leer todo el texto explicativo de lo que esta sucediendo con la aplicación, puede ir a mi nuevo sitio web</p>
        <Button
          button={{
            type: 'dark',
            text: 'E-commerce Haciendola',
            handleClick: () => {
              window.location.href = 'https://client.ridaoc.es';
            },
          }}
        />
      </div>
      <div className="maintenance-info">
        <p>
          Este sitio fue diseñado para demostrar mis habilidades técnicas. Actualmente, estoy migrando de create-react-app a Vite e integrando TypeORM con NestJS aplicando mejores prácticas de programación.
        </p>
        <h2>Frontend</h2>
        <ul>
          <li><strong>Storybook:</strong> Me ayudará a desarrollar y documentar componentes de manera aislada, lo que facilitará la creación de una biblioteca de componentes reutilizables y la visualización interactiva. Esto mejorará la organización de mi código.</li>
          <li><strong>Vitest:</strong> Será esencial para realizar pruebas unitarias en JavaScript y TypeScript, asegurando la calidad del código y su correcto funcionamiento.</li>
          <li><strong>React:</strong> Permitirá construir interfaces de usuario interactivas y escalables, utilizando componentes reutilizables para mejorar la experiencia del usuario.</li>
          <li><strong>TypeScript:</strong> Agregará tipado estático opcional y otras características a mi código, ayudando a detectar errores en tiempo de compilación y a escribir un código más seguro y mantenible.</li>
          <li><strong>Sass:</strong> Agregará características como variables y anidamiento a mis estilos CSS, facilitando la escritura de código CSS más limpio y mantenible.</li>
          <li><strong>React Query:</strong> Simplificará la gestión del estado y los datos en mi aplicación React, mejorando el rendimiento y la experiencia del usuario al manejar solicitudes de datos y caché de manera eficiente.</li>
          <li><strong>React Testing Library:</strong> Será útil para realizar pruebas de integración en componentes React, permitiéndome probar el comportamiento de los componentes desde la perspectiva del usuario.</li>
        </ul>

        <h2>Backend</h2>
        <ul>
          <li><strong>Node.js:</strong> Me permitirá desarrollar aplicaciones web escalables y de alto rendimiento en el servidor, utilizando un modelo de E/S sin bloqueo.</li>
          <li><strong>NestJS:</strong> Utilizaré este framework backend para construir aplicaciones robustas y escalables, basadas en TypeScript y los principios de la arquitectura orientada a servicios.</li>
          <li><strong>JSON Web Token (JWT):</strong> Implementaré JWT para la autenticación de usuarios y la generación de tokens seguros, lo que garantizará la seguridad de mi aplicación y protegerá las rutas privadas.</li>
          <li><strong>Bcrypt:</strong> Utilizaré Bcrypt para el hash y la encriptación de contraseñas de usuarios, asegurando que las contraseñas estén almacenadas de forma segura en la base de datos.</li>
          <li><strong>Jest:</strong> Me proporcionará un framework de pruebas completo para realizar pruebas unitarias y de integración en mi aplicación Node.js, lo que garantizará la calidad del código y su correcto funcionamiento.</li>
        </ul>

        <p>
          Mientras tanto, puedes visitar mi otro sitio web que trabajé con estas tecnologías y está en producción en AWS Lightsail:
        </p>
        <p>
          <strong>Descripción del Proyecto:</strong> El proyecto de e-commerce "Haciéndola" comprende el desarrollo de un sistema completo que incluye FrontEnd, BackEnd y Servidor de archivos para almacenamiento de imágenes. Se han implementado funcionalidades tanto para visitantes como para usuarios registrados con diferentes roles.
        </p>
        <p>
          <strong>Páginas Públicas (Visitante):</strong> Estas páginas están disponibles para todos los usuarios que visiten la tienda en línea. Incluyen funcionalidades como buscador de productos, filtros y menú de navegación.
        </p>
        <p>
          <strong>Páginas Privadas:</strong> Estas páginas solo son accesibles para personas registradas y logueadas, y dependen de los roles asignados (visitante, editor, administrador y súper usuario). Las vistas están disponibles en la ruta "Dashboard", y cada nivel de roles tiene acceso a las funcionalidades de los roles inferiores.
        </p>
        <p>
          <strong>Información Técnica:</strong>
        </p>
        <p>
          <strong>BackEnd:</strong> Construido con Express.js, bcrypt, jsonwebtoken, PostgreSQL, TypeORM, Yup, Zod, y TypeScript.
        </p>
        <p>
          <strong>Servidor de Archivos:</strong> Construido con Express.js, fs-extra, Multer, PostgreSQL, TypeORM, xlsx-populate, Zod, y TypeScript.
        </p>
        <p>
          <strong>Base de Datos:</strong> Se utiliza PostgreSQL como base de datos.
        </p>
        <p>
          <strong>FrontEnd:</strong> Construido con React.js, react-router-dom, Sass, TypeScript, Yup, y React Query.
        </p>
        <p>
          <strong>Despliegue:</strong> La aplicación está desplegada en un servicio de Amazon Web Services (Amazon Lightsail). Se ha configurado el enrutamiento en Route53 de Amazon. Puedes acceder a la aplicación en el siguiente enlace:
        </p>
        <Button
          button={{
            type: 'dark',
            text: 'E-commerce Haciendola',
            handleClick: () => {
              window.location.href = 'https://client.ridaoc.es';
            },
          }}
        />
      </div>
    </div>
  );
}
