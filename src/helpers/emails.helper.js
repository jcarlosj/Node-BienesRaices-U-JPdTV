import transporter from '../config/nodemailer.js';

const sendConfirmationEmail = async ( data ) => {
    const { name, email, token } = data;

    await transporter.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices',
        text: 'Confirma tu cuenta en BienesRaices',
        html: `
            <p>Hola, ${ name }. BienesRaices te da la bienvenida</p>
            <p>Puedes habilitar tu cuenta al hacer click en <a href="#">confirmar tu cuenta</a></p>
            <p>Si no has sido tú quien creo la cuenta en BienesRaices, solo puedes ignorar este mensaje</p>
        `
    });
}


export {
    sendConfirmationEmail
}