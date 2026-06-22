/**
 * Email service using Formsubmit.co
 * Zero setup required — no API keys, no accounts.
 * 
 * First-time only: After the first submission, Formsubmit sends a
 * verification email to anirbanshit77@gmail.com. Click the link
 * in that email once, and all future messages will be delivered.
 */

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/anirbanshit77@gmail.com'

/**
 * Send a contact email via Formsubmit.co
 * @param {{ name: string, email: string, message: string }} formData
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function sendContactEmail(formData) {
  // Build a readable date-time stamp
  const now = new Date()
  const dateTime = now.toLocaleString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name:      formData.name.trim(),
        email:     formData.email.trim(),
        message:   formData.message.trim(),
        _subject:  `New Portfolio Contact Message from ${formData.name.trim()}`,
        _template: 'table',
        _captcha:  'false',
        date_time:      dateTime,
        portfolio_name: 'Anirban Shit — Developer Portfolio',
      }),
    })

    const data = await response.json()

    if (data.success) {
      return { success: true }
    } else {
      return { success: false, error: data.message || 'Failed to send message' }
    }
  } catch (err) {
    console.error('[Contact Form Error]', err)
    return {
      success: false,
      error: err?.message || 'Failed to send message',
    }
  }
}
