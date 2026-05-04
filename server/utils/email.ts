import { Resend } from 'resend'
// fuck sendgrid man that shit some ass
export async function shoot(
  data: {
    id: string
    title: string
    name: string
    email: string
    vulnType: string
    severity: string
    affectedPrograms: string[]
    region: string
    timestamp: string
    description: string
  },
  apiKey: string
): Promise<boolean> {
  try {
    const r = new Resend(apiKey)

    const esc = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

    const a = `Security Report: ${esc(data.title)}
ID: ${esc(data.id)}
Reporter: ${esc(data.name)}
Email: ${esc(data.email)}
Type: ${esc(data.vulnType)}
Severity: ${esc(data.severity)}
Assets: ${data.affectedPrograms.map(esc).join(', ')}
Region: ${esc(data.region)}
Time: ${esc(data.timestamp)}

Description:
${esc(data.description)}`

    await r.emails.send({
      from: 'Hack Club Security Report <tmbx@outbound.3kh0.net>',
      to: ['hcb-security@hackclub.com'], // testing@3kh0.net
      subject: `HCB Report: ${data.title} [${data.id}]`,
      reply_to: data.email,
      html: `<pre style="font-family: monospace; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${a}</pre>`,
    })

    return true
  } catch (error) {
    console.error('shit ', error)
    return false
  }
}
