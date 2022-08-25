const nodemailer = require('nodemailer')


class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'gilbert.botsford89@ethereal.email',
                pass: 'td4bj8CH1TVJmA9UuC'
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: '',
            html: 
                `<div>
                    <h1>Для активации аккаунта на ${process.env.API_URL} кликните по ссылке</h1>
                    <a href={${link}}>${link}</a>
                </div>`
        })
    }
}

module.exports = new MailService()