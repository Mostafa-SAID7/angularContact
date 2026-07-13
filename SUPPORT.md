# Support

## Getting Help

### Documentation
1. **README.md** — Start here for project overview and quick start
2. **docs/SETUP.md** — Complete local development setup guide
3. **docs/ARCHITECTURE.md** — Project structure and design
4. **docs/API.md** — REST API reference
5. **docs/DEPLOYMENT.md** — Deployment to production
6. **docs/TESTING.md** — Testing strategies

### Community Support

#### GitHub Issues
For bug reports and feature requests:
1. Check [existing issues](https://github.com/Mostafa-SAID7/angularContact/issues)
2. Search for similar problems
3. Create a [new issue](https://github.com/Mostafa-SAID7/angularContact/issues/new) with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment info

Use issue templates:
- [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)

#### Discussions
For general questions and discussions:
- GitHub Discussions (if enabled)
- Tag questions with `question` label

### Direct Contact

**Email**: m.ssaid356@gmail.com

**Response time**: Usually within 24-48 hours

## Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# macOS/Linux
lsof -ti:9887 | xargs kill

# Windows
netstat -ano | findstr :9887
taskkill /PID <PID> /F
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Build failing:**
```bash
npm run build -- --verbose
```

### Backend Issues

**MongoDB connection error:**
```bash
# Check .env file has correct MONGODB_URI
# Verify IP is whitelisted in MongoDB Atlas
npm run seed  # Test connection
```

**Port 5001 in use:**
```bash
# Change PORT in .env
# Or kill process using the port
```

**Seed data not loading:**
```bash
# Clear database first, then:
npm run seed
```

### Common Problems

| Problem | Solution |
|---------|----------|
| "Module not found" | Delete `node_modules`, run `npm install` |
| "Cannot GET /" | Ensure backend is running on port 5001 |
| Dark mode not working | Clear browser localStorage |
| Language not changing | Check translation files in `public/assets/i18n/` |
| Contacts not saving | Check MongoDB connection and seed data |

## Performance Tips

### Frontend
- Use Chrome DevTools Lighthouse for audits
- Check Network tab for large bundles
- Enable gzip compression in server
- Cache static assets aggressively

### Backend
- Monitor database query performance
- Create indexes on frequently searched fields
- Use connection pooling
- Enable response compression

## System Requirements

| Component | Requirement |
|-----------|-------------|
| Node.js | v20.19.0 or higher |
| npm | v8.0.0 or higher |
| Chrome | Latest version |
| MongoDB Atlas | Free tier or higher |

## Feature Requests

Have an idea to improve this project?

1. Check [existing requests](https://github.com/Mostafa-SAID7/angularContact/issues?q=label%3Aenhancement)
2. Create a [feature request](https://github.com/Mostafa-SAID7/angularContact/issues/new?template=feature_request.md)
3. Include:
   - Problem description
   - Proposed solution
   - Alternatives considered
   - Use cases/benefits

## Security Issues

**Do NOT open a public issue for security vulnerabilities.**

See [SECURITY.md](./SECURITY.md) for responsible disclosure.

## Contributing

Want to help? See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## FAQ

**Q: Can I use this in production?**
A: Yes, but ensure you:
- Update all dependencies
- Configure proper environment variables
- Set up SSL/TLS certificates
- Enable rate limiting
- Set up monitoring and logging

**Q: Is there a mobile app?**
A: Not yet, but it's planned. Follow the roadmap in [OVERVIEW.md](docs/OVERVIEW.md)

**Q: How do I deploy this?**
A: See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for multiple options

**Q: Can I modify the code?**
A: Yes, under MIT License. See [LICENSE.txt](LICENSE.txt)

## Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [ngx-translate](https://github.com/ngx-translate/core)

## Feedback

We'd love to hear your feedback! Please share:
- What works well
- What needs improvement
- Feature ideas
- Documentation suggestions

Email: m.ssaid356@gmail.com

---

**Last Updated**: July 13, 2024
