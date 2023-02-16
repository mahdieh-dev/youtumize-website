// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SMTPClient } from "emailjs";

const { MAIL, MAIL_PASSWORD } = process.env;

const email = async (req, res) => {
  const { email, name, message } = req.body;

  const client = new SMTPClient({
    user: MAIL,
    password: MAIL_PASSWORD,
    host: "smtp.gmail.com",
    ssl: true,
  });

  try {
    await client.sendAsync({
      text: `Message from ${name}
      -----------------
      -----------------
      -----------------
      ${message}`,
      from: email,
      to: MAIL,
      subject: "Youtumize - Contacts",
    });
  } catch (e) {
    res.status(400).end(JSON.stringify({ message: "Error", error: e }));
    return;
  }

  res.status(200).end(JSON.stringify({ message: "Success" }));
};

export default email;
