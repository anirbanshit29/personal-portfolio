/**
 * Contact form validation utility.
 * Returns user-friendly error messages per field.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export function validateName(name) {
  const trimmed = (name || '').trim()
  if (!trimmed) return 'Name is required'
  if (trimmed.length < 2) return 'Name must be at least 2 characters'
  return ''
}

export function validateEmail(email) {
  const trimmed = (email || '').trim()
  if (!trimmed) return 'Email is required'
  if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address'
  return ''
}

export function validateMessage(message) {
  const trimmed = (message || '').trim()
  if (!trimmed) return 'Message is required'
  if (trimmed.length < 10) return 'Message must be at least 10 characters'
  return ''
}

/**
 * Validate all contact form fields.
 * @param {{ name: string, email: string, message: string }} formData
 * @returns {{ isValid: boolean, errors: { name: string, email: string, message: string } }}
 */
export function validateContactForm(formData) {
  const errors = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    message: validateMessage(formData.message),
  }
  const isValid = !errors.name && !errors.email && !errors.message
  return { isValid, errors }
}
