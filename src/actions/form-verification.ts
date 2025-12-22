'use server'

import { verifyCaptchaToken } from '@/utilities/captcha'

export async function formVerificationAction(token: string | null) {
  if (!token) {
    return {
      success: false,
      message: 'Token not found',
    }
  }

  // Verify the token
  const captchaData = await verifyCaptchaToken(token)

  if (!captchaData) {
    return { success: false, message: 'captcha Failed' }
  }

  if (!captchaData.success || captchaData.score < 0.8) {
    return {
      success: false,
      message: 'captcha Failed',
      errors: !captchaData.success ? captchaData['error-codes'] : null,
    }
  }
  return {
    success: true,
    message: 'Message sent successfully!',
  }
}
