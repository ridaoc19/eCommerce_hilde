import { User } from "../../../modules/user/interface";

export const templateRegistre = ({ name, password }: Pick<User, 'name' | 'password'>) =>
    `<html>
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
                border: 1px solid #FFA451;
            }

            .content {
                background-color: white;
                border-top-left-radius: 11px;
                border-top-right-radius: 11px;
            }

            .content .header {
                background-color: #FFF2E7;
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


            h1, h2, h3, h4, h6 {
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
                    <h1>Verificar la dirección de correo electrónico</h1>
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
    </html>`