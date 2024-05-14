import mailgun from "mailgun-js"

const { MAILGUN_DOMAIN, MAILGUN_KEY } = process.env

const mg = mailgun({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN,
})

const send = async (mailContent) => {
  const body = await mg.messages().send(mailContent)
  return body
}

const mailService = { send }

export default mailService
