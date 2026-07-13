# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please email m.ssaid356@gmail.com with:

* Description of the vulnerability
* Steps to reproduce
* Potential impact
* Suggested fix (if any)

**Please do not open a public issue for security vulnerabilities.**

We will:
* Acknowledge your report within 48 hours
* Provide an estimated timeline for a fix
* Keep you updated on the progress
* Credit you in the security advisory (if desired)

## Security Practices

### Code Review
All contributions are reviewed for security issues before merging.

### Dependencies
* Dependencies are regularly updated
* `npm audit` is run in CI/CD pipeline
* Vulnerable packages are addressed immediately

### Environment Variables
* Secrets are never committed to the repository
* Use `.env` files locally (added to `.gitignore`)
* Production secrets stored securely in deployment platform

### Data Protection
* HTTPS/TLS encryption in production
* Input validation on all forms
* SQL injection prevention via Mongoose/parameterized queries
* XSS protection via Angular's built-in sanitization

### Authentication (Future)
When authentication is added:
* Passwords will be hashed with bcrypt
* JWT tokens will have expiration
* Rate limiting will prevent brute force attacks
* CORS will be strictly configured

## Supported Versions

| Version | Status | Security Updates |
|---------|--------|------------------|
| 1.0.x | Current | Yes |

## Security Headers

Production deployment includes:
* `Content-Security-Policy`
* `X-Content-Type-Options: nosniff`
* `X-Frame-Options: DENY`
* `X-XSS-Protection: 1; mode=block`
* `Strict-Transport-Security: max-age=31536000`

## Contact

Security concerns: m.ssaid356@gmail.com

## Acknowledgments

Thank you to all researchers who responsibly disclose vulnerabilities.
