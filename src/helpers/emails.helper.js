import dotenv from 'dotenv';

import transporter from '../config/nodemailer.js';

dotenv.config({ path: '.env' });


const sendConfirmationEmail = async ( data ) => {
    const
        { name, email, token } = data,
        url = `${ process.env.BASE_URL }:${ process.env.PORT || 4000 }/auth/confirm-account/${ token }`;

    await transporter.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices',
        text: 'Confirma tu cuenta en BienesRaices',
        html: `
            <p>Hola, ${ name }. BienesRaices te da la bienvenida</p>
            <p>Puedes habilitar tu cuenta al hacer click en <a href="${ url }">confirmar tu cuenta</a></p>
            <p>Si no has sido tú quien creo la cuenta en BienesRaices, solo puedes ignorar este mensaje</p>
        `
    });
}


const sendPasswordChangeConfirmation = async ( data ) => {
    const
        { name, email, token } = data,
        url = `${ process.env.BASE_URL }:${ process.env.PORT || 4000 }/auth/recover-password/${ token }`;

    await transporter.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Restablece tu contraseña en BienesRaices',
        text: 'Restablece tu contraseña en BienesRaices',
        html: `
            <p>Hola, ${ name } ¿Has solicitado reestablecer o recuperar tu contraseña?</p>
            <p>Puedes recuperar tu contraseña al hacer click en <a href="${ url }">cambiar contraseña</a></p>
            <p>Si no has sido tú quien realizó la solicitud de cambio de contraseña, puedes ignorar este mensaje</p>
        `
    });
}


export {
    sendConfirmationEmail,
    sendPasswordChangeConfirmation
}