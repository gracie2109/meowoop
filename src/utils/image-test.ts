// Test image utilities
export const createTestImage = (width: number = 800, height: number = 400): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')!

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Add some text
  ctx.fillStyle = 'white'
  ctx.font = '48px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Test Banner Image', width / 2, height / 2)

  // Add some decorative circles
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 30 + 10,
      0,
      2 * Math.PI
    )
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`
    ctx.fill()
  }

  return canvas.toDataURL()
}

export const SAMPLE_IMAGES = {
  pets: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  abstract: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80'
}
