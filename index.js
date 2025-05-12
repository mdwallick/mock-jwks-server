const express = require("express")
// const jwksRsa = require("jwks-rsa")
const app = express()
const port = 8080

// Configurable cache duration in seconds (default to 1 hour)
const JWKS_CACHE_DURATION = process.env.JWKS_CACHE_DURATION || 300

// An array of keys, simulating multiple keys
const keys = [
  {
    kid: "key1", // Key ID for the first key
    kty: "RSA",
    use: "sig",
    alg: "RS256",
    n: "sXch3VwExslU8I4QyNUlHGThsbTxA9hzH0EygcnI7J0P9q8gn8EtxpzAPG4eZqYW58nndhUQK1VmNG5xI5Fz5s0vGTbhGxmuKm1po5Z6NO3vPy6iUKOTuO2A1U1e5lKKp2BX0Pl4ptm63cRZ6kr2gFiFOvcxe70pzrxVrz39VnKukdOhZd4iz4X0mNokdF3NSHqPULK2f4d31YXcxoQ4r7D0b7tHY6E8Z8yD4NKDq2oe2gyzt2KhcRHk9OTU0Pt9GvWzbdCxXE2WJ_aUjT4DPktMpp94Xy31X2wgnCjVgQW3_Xc4yHM7-YqMhQf13xduFnqB8pk64qlXzdrGb8IATq8DhHjtnnqXNOdVJkGGYQFLg07ZbCOdozWtoEOHKrdug", // Public Key Modulus
    e: "AQAB", // Public Key Exponent
  },
  {
    kid: "key2", // Key ID for the second key
    kty: "RSA",
    use: "sig",
    alg: "RS256",
    n: "rMOfmIkxgDbzWhf7n4yCHh0WshI4Hz7UG9jTpiEdov1TQxKYKX-q_Jmf7n1hD0eptdPYuNTnoFF8j5P9ftQARuD9FXg3d68zKYsBv_AoYfiUj6W-pk9f7hNh2sD52sLgGlDwpeZ34FG7jeMIgsK6cDfe0uBbdXleqTzscbNXZpqlR0yfHKjCBEnsyJYZV7M8Yo6FlGeJtCKA5C5PR-Y5pZzAXhvjrHCErg0qZxYsYkml3ynrlEMPlFY-VJ2aNlUwK7czNJXtG67ysltyfUvE8aOGJ3fDlfc28JrFch0vZn4QWq9eosvfUsD_54yYJm_YQw7gkEFH-VHmnmkCft-jmjmApJZYzTrv2sru5nmtSds0Mbw58hXhfXJf5A5lg2gV4csu9qa6JYtbF1UzPnwtdQ", // Public Key Modulus
    e: "AQAB", // Public Key Exponent
  },
]

// JWKS endpoint that returns the array of keys
app.get("/.well-known/jwks.json", (req, res) => {
  const maxAge = parseInt(JWKS_CACHE_DURATION, 10)

  res.set({
    "Cache-Control": `public, max-age=${maxAge}, must-revalidate`,
    "Content-Type": "application/json",
  })
  res.json({
    keys: keys,
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Mock JWKS server running at http://localhost:${port}`)
})
