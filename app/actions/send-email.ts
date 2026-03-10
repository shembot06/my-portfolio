"use server"

export async function sendEmail(formData: {
  name: string
  email: string
  projectType: string
  message: string
}) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, error: "Please fill in all required fields" }
    }

    // Send using FormSubmit.co (free, no credentials needed)
    const response = await fetch("https://formsubmit.co/ajax/arvinadove1128@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType || "Not specified",
        message: formData.message,
        _subject: `Portfolio Inquiry from ${formData.name}`,
        _captcha: "false",
      }),
    })

    if (response.ok) {
      return { success: true, message: "Inquiry sent successfully! I'll get back to you soon." }
    } else {
      return { success: false, error: "Failed to send inquiry. Please try again." }
    }
  } catch (error) {
    console.error("[v0] Email error:", error)
    return {
      success: false,
      error: "Failed to send inquiry. Please try again later.",
    }
  }
}
