import { User } from "../../../modules/user/interface";

export const templateRegistre = ({ name, password, type }: Pick<User.Content, 'name' | 'password' | 'type'>): { subject: string, html: string } => {
    switch (type) {
        case 'registre':
            return {
                subject: "Verificación de correo electrónico", html: `<html>

            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
        
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        border-radius: 10px;
                        text-align: center;
                        border: 1px solid #ffa5513b;
                    }
        
                    .content {
                        background-color: white;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header {
                        background-color: #fff2e791;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header img {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        padding: 20px;
                        color: white;
                    }
        
                    .content .main {
                        padding: 0 20px 10px;
                    }
        
                    h1,
                    h2,
                    h3,
                    h4,
                    h6 {
                        color: #333;
                        text-align: center;
                    }
        
                    p {
                        color: #555;
                        line-height: 1.5;
                        text-align: justify;
                    }
        
                    .container>p {
                        text-align: center;
                    }
                </style>
            </head>
        
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <img src="https://e-commerce-hilde.vercel.app/favicon.ico" alt="">
                        </div>
                        <div class="main">
                            <h1>Verificación de correo electrónico</h1>
                            <p>${name} gracias por iniciar el proceso de creación de la nueva cuenta. Queremos asegurarnos de
                                que es realmente usted. Inicie sesión con la contraseña temporal. Si no desea
                                crear una cuenta, puede omitir este mensaje.</p>
                            <h3>Contraseña temporal</h3>
                            <h2>${password}</h2>
                            <h6>(Esta contraseña es válida durante 10 minutos)</h6>
                            <hr>
                            <p>Nunca se enviará un correo electrónico o se solicitará que revele o verifique su contraseña
                                personal, tarjeta de crédito o número de cuenta bancaria.</p>
                        </div>
                    </div>
                    <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce.
                        Todos los derechos reservados. <a href="https://e-commerce-hilde.vercel.app/hilde">E-commerce Hilde.</a>
                    </p>
                </div>
            </body>
        
            </html>`}

        case 'reset':
            return {
                subject: "Restablecimiento de contraseña", html: `<html>

            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
        
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        border-radius: 10px;
                        text-align: center;
                        border: 1px solid #ffa5513b;
                    }
        
                    .content {
                        background-color: white;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header {
                        background-color: #fff2e791;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header img {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        padding: 20px;
                        color: white;
                    }
        
                    .content .main {
                        padding: 0 20px 10px;
                    }
        
                    h1,
                    h2,
                    h3,
                    h4,
                    h6 {
                        color: #333;
                        text-align: center;
                    }
        
                    p {
                        color: #555;
                        line-height: 1.5;
                        text-align: justify;
                    }
        
                    .container>p {
                        text-align: center;
                    }
                </style>
            </head>
        
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <img src="https://e-commerce-hilde.vercel.app/favicon.ico" alt="">
                        </div>
                        <div class="main">
                            <h1>Tu contraseña cambió</h1>
                            <p>${name} gracias por solicitar el restablecimiento de contraseña. Queremos asegurarnos de
                                que es realmente usted. Inicie sesión con la contraseña temporal que encontraras a continuación 
                                y te pedirá que cambie la contraseña por una personal.</p>
                            <h3>Contraseña temporal</h3>
                            <h2>${password}</h2>
                            <h6>(Esta contraseña es válida durante 10 minutos)</h6>
                            <hr>
                            <p>Haz clic <a href="https://e-commerce-hilde.vercel.app/hilde/login">aca</a> y te llevara a Iniciar sesión</p>
                            <p>Nunca se enviará un correo electrónico o se solicitará que revele o verifique su contraseña
                                personal, tarjeta de crédito o número de cuenta bancaria.</p>
                        </div>
                    </div>
                    <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce.
                        Todos los derechos reservados. <a href="https://e-commerce-hilde.vercel.app/hilde">E-commerce Hilde.</a>
                    </p>
                </div>
            </body>
        
            </html>`}

        case 'firstNotificationRegistre':
            return {
                subject: "Recordatorio para activar tu cuenta", html: `<html>

            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
        
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        border-radius: 10px;
                        text-align: center;
                        border: 1px solid #ffa5513b;
                    }
        
                    .content {
                        background-color: white;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header {
                        background-color: #fff2e791;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header img {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        padding: 20px;
                        color: white;
                    }
        
                    .content .main {
                        padding: 0 20px 10px;
                    }
        
                    h1,
                    h2,
                    h3,
                    h4,
                    h6 {
                        color: #333;
                        text-align: center;
                    }
        
                    p, li {
                        color: #555;
                        line-height: 1.5;
                        text-align: justify;
                    }
        
                    .container>p {
                        text-align: center;
                    }
                </style>
            </head>
        
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <img src="https://e-commerce-hilde.vercel.app/favicon.ico" alt="">
                        </div>
                        <div class="main">
                            <h1>Tu registro está próximo a vencer</h1>
                            <p>${name}, te recordamos que tu registro en nuestro sitio web está próximo a vencer. Para evitar
                                que tu cuenta sea eliminada, te recomendamos realizar los siguientes pasos:</p>
                            <ol>
                                <li>Inicia sesión utilizando la contraseña temporal que te enviamos en el correo anterior.</li>
                                <li>Sigue las instrucciones para cambiar la contraseña por una personal y segura.</li>
                            </ol>
                            <p>Si no completas estos pasos en los próximos 5 minutos, tu registro será eliminado y deberás crear
                                nuevamente tu cuenta.</p>
                            <hr>
                            <p>Queremos asegurarte que nunca enviaremos un correo electrónico solicitando que reveles o
                                verifiques tu contraseña personal, tarjeta de crédito o número de cuenta bancaria. Mantenemos la
                                seguridad de tus datos como nuestra máxima prioridad.</p>
                        </div>
                    </div>
                    <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce.
                        Todos los derechos reservados. <a href="https://e-commerce-hilde.vercel.app/hilde">E-commerce Hilde.</a>
                    </p>
                </div>
            </body>
        
            </html>`}

        case 'secondNotificationRegistre':
            return {
                subject: "Notificación de eliminación de cuenta", html: ` <html>

            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
        
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        border-radius: 10px;
                        text-align: center;
                        border: 1px solid #ffa5513b;
                    }
        
                    .content {
                        background-color: white;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header {
                        background-color: #fff2e791;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header img {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        padding: 20px;
                        color: white;
                    }
        
                    .content .main {
                        padding: 0 20px 10px;
                    }
        
                    h1,
                    h2,
                    h3,
                    h4,
                    h6 {
                        color: #333;
                        text-align: center;
                    }
        
                    p,
                    li {
                        color: #555;
                        line-height: 1.5;
                        text-align: justify;
                    }
        
                    .container>p {
                        text-align: center;
                    }
                </style>
            </head>
        
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <img src="https://e-commerce-hilde.vercel.app/favicon.ico" alt="">
                        </div>
                        <div class="main">
                            <h1>Tu registro ha vencido</h1>
                            <p>${name}, lamentamos informarte que tu registro ha vencido. Para poder utilizar nuestro sitio web,
                                deberás crear nuevamente una cuenta siguiendo estos pasos:</p>
                            <ol>
                                <li>Ingresa al siguiente enlace para crear una nueva cuenta: <a
                                        href="https://e-commerce-hilde.vercel.app/hilde/registre">Crear cuenta</a></li>
                                <li>Una vez creada la cuenta, asegúrate de activarla dentro de un lapso de 10 minutos para
                                    evitar que sea eliminada.</li>
                            </ol>
        
                            <hr>
                            <p>Queremos asegurarte que nunca enviaremos un correo electrónico solicitando que reveles o
                                verifiques tu contraseña personal, tarjeta de crédito o número de cuenta bancaria. Mantenemos la
                                seguridad de tus datos como nuestra máxima prioridad.</p>
                        </div>
                    </div>
                    <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce.
                        Todos los derechos reservados. <a href="https://e-commerce-hilde.vercel.app/hilde">E-commerce Hilde.</a>
                    </p>
                </div>
            </body>
        
            </html>`}

        case 'firstNotificationReset':
            return {
                subject: "Recordatorio para restablecer contraseña", html: `<html>

            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
        
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        border-radius: 10px;
                        text-align: center;
                        border: 1px solid #ffa5513b;
                    }
        
                    .content {
                        background-color: white;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header {
                        background-color: #fff2e791;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header img {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        padding: 20px;
                        color: white;
                    }
        
                    .content .main {
                        padding: 0 20px 10px;
                    }
        
                    h1,
                    h2,
                    h3,
                    h4,
                    h6 {
                        color: #333;
                        text-align: center;
                    }
        
                    p, li {
                        color: #555;
                        line-height: 1.5;
                        text-align: justify;
                    }
        
                    .container>p {
                        text-align: center;
                    }
                </style>
            </head>
        
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <img src="https://e-commerce-hilde.vercel.app/favicon.ico" alt="">
                        </div>
                        <div class="main">
                        <h1>Tu restablecimiento de contraseña está próximo a vencer</h1>
                        <p>${name}, te recordamos que tu cambio de contraseña está próximo a vencer. para evitar que la contraseña
                        venza, te recomendamos realizar los siguientes pasos:</p>
                        <ol>
                            <li>Inicia sesión utilizando la contraseña temporal que te enviamos en el correo anterior.</li>
                            <li>Sigue las instrucciones para cambiar la contraseña por una personal y segura.</li>
                        </ol>
                        <p>Si no completas estos pasos en los próximos 5 minutos, tu contraseña se vencerá y deberá restablecerla nuevamente.</p>
                            <hr>
                            <p>Queremos asegurarte que nunca enviaremos un correo electrónico solicitando que reveles o
                                verifiques tu contraseña personal, tarjeta de crédito o número de cuenta bancaria. Mantenemos la
                                seguridad de tus datos como nuestra máxima prioridad.</p>
                        </div>
                    </div>
                    <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce.
                        Todos los derechos reservados. <a href="https://e-commerce-hilde.vercel.app/hilde">E-commerce Hilde.</a>
                    </p>
                </div>
            </body>
        
            </html>`}

        case 'secondNotificationReset':
            return {
                subject: "El tiempo para restablecer la contraseña ha vencido", html: `<html>

            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
        
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        border-radius: 10px;
                        text-align: center;
                        border: 1px solid #ffa5513b;
                    }
        
                    .content {
                        background-color: white;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header {
                        background-color: #fff2e791;
                        border-top-left-radius: 11px;
                        border-top-right-radius: 11px;
                    }
        
                    .content .header img {
                        width: 100px;
                        display: block;
                        margin: 0 auto;
                        padding: 20px;
                        color: white;
                    }
        
                    .content .main {
                        padding: 0 20px 10px;
                    }
        
                    h1,
                    h2,
                    h3,
                    h4,
                    h6 {
                        color: #333;
                        text-align: center;
                    }
        
                    p, li {
                        color: #555;
                        line-height: 1.5;
                        text-align: justify;
                    }
        
                    .container>p {
                        text-align: center;
                    }
                </style>
            </head>
        
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <img src="https://e-commerce-hilde.vercel.app/favicon.ico" alt="">
                        </div>
                        <div class="main">
                        <h1>El tiempo para restablecer la contraseña ha vencido</h1>
                        <p>${name}, te informamos que el período para restablecer tu contraseña ha vencido. Si aún necesitas cambiar tu contraseña, deberás volver a solicitar el restablecimiento siguiendo estos pasos:</p>
                        <ol>
                        <li>Haz clic <a href="https://e-commerce-hilde.vercel.app/hilde/reset">aquí</a> para solicitar nuevamente el restablecimiento de contraseña.</li>
                        <li>Ingresa tu correo electrónico y recibirás una contraseña temporal en tu bandeja de entrada.</li>
                        <li>Tienes 10 minutos para cambiar la contraseña temporal por una personal y segura.</li>
                        </ol>
                            <hr>
                            <p>Queremos asegurarte que nunca enviaremos un correo electrónico solicitando que reveles o
                                verifiques tu contraseña personal, tarjeta de crédito o número de cuenta bancaria. Mantenemos la
                                seguridad de tus datos como nuestra máxima prioridad.</p>
                        </div>
                    </div>
                    <p>Calle 30. Anorí, Antioquia, Colombia. © 2023, e-commerce.
                        Todos los derechos reservados. <a href="https://e-commerce-hilde.vercel.app/hilde">E-commerce Hilde.</a>
                    </p>
                </div>
            </body>
        
            </html>`}

        default:
            return { subject: "", html: `` };
    }
}
