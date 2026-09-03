# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-07-13

### Added
- Initial release of Angular Contact Manager
- Complete CRUD functionality for contacts
- Real-time search across name, email, phone
- Sort by name, email, phone (ascending/descending)
- Pagination with configurable page size (5, 10, 20)
- Dark mode toggle with localStorage persistence
- Multi-language support (EN, AR, ES) with RTL for Arabic
- Component-based architecture with 12+ reusable components
- Toast notification system (success, error, warning, info)
- Modal dialogs for delete confirmation and contact details
- Custom dropdown select component with animations
- Pagination component with smart page range
- Error boundary and global error handler
- 404 error page with smooth animations
- Form validation with inline error messages
- Loading skeletons during data fetch
- Fully responsive design (mobile, tablet, desktop)
- MongoDB Atlas integration
- Express.js REST API with CORS
- Database seeding with 12 sample contacts
- GitHub Actions CI/CD pipeline
- Comprehensive documentation (8 docs)
- Bug report and feature request templates
- MIT License

### Technical
- Angular 20 with standalone components
- TypeScript 5.9 with strict mode
- Tailwind CSS 3.4 with custom scrollbars
- Angular Signals for reactive state
- ngx-translate 17 for i18n
- Mongoose for MongoDB ODM
- Express.js with CORS middleware
- Environment-based configuration

## [Unreleased]

### Planned Features
- [ ] Update/PUT endpoint for editing contacts
- [ ] JWT authentication and authorization
- [ ] User profiles and role-based access
- [ ] Contact groups/categories
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Real-time sync (WebSocket)
- [ ] File uploads (profile pictures)
- [ ] Activity logging
- [ ] Advanced filtering and search
- [ ] Contact import from CSV
- [ ] Email notifications

## Support

For more information, see [README.md](./README.md)
