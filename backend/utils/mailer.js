const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'm.esteban.goat@gmail.com',  // Correo emisor
    pass: 'mszp anba fjnx akfd', // Contraseña de aplicación, no la de acceso normal
  },
});

const enviarCorreo = async (destinatario, asunto, mensaje) => {
  try {
    await transporter.sendMail({
      from: '"Sistema de Inventario" <TU_CORREO@gmail.com>',
      to: destinatario,
      subject: asunto,
      html: mensaje,
    });
    console.log('Correo enviado a:', destinatario);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};

module.exports = enviarCorreo;
