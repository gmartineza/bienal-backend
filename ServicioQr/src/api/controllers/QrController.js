const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config/QrConfig');


exports.generateQRToken = (req, res) => {
    // Generar el JWT con una duración de 2 minutos
    const token = jwt.sign({}, SECRET_KEY, { expiresIn: '2m' });

    // URL de redirección personalizada
    const redirectUrl = `https://articulo.mercadolibre.com.ar/MLA-1919073610-camiseta-remera-messi-retro-barcelona-champions-homenaje-lio-_JM?searchVariation=185103406657#polycard_client=search-nordic&searchVariation=185103406657&position=10&search_layout=stack&type=item&tracking_id=df5c39a6-983f-4631-8a04-9aa9820d9ebb&token=${token}`;

    res.json({
        message: 'Token QR generado exitosamente',
        token: token,
        redirectUrl // Enviar el enlace completo al frontend
    });
};
exports.validateQRToken = (req, res) => {
    const token = req.query.token; // Obtener el token de la URL

    // Verificar el token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // Token inválido o expirado
            return res.status(403).send(`
                <html>
                    <body>
                        <h1>QR Expirado</h1>
                        <p>El código QR ha expirado o no es válido. Por favor, solicita uno nuevo.</p>
                    </body>
                </html>
            `);
        }

        // Redirigir a la URL de destino si el token es válido
        const redirectUrl = 'https://articulo.mercadolibre.com.ar/MLA-1919073610-camiseta-remera-messi-retro-barcelona-champions-homenaje-lio-_JM?searchVariation=185103406657#polycard_client=search-nordic&searchVariation=185103406657&position=10&search_layout=stack&type=item&tracking_id=df5c39a6-983f-4631-8a04-9aa9820d9ebb';
        res.redirect(redirectUrl);
    });
};