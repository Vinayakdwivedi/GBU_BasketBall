# 🏀 GBU Basketball Tournament Management System

A modern full-stack basketball tournament management platform built for Gautam Buddha University (GBU).

The platform provides real-time match updates, team management, tournament fixtures, results, notifications, gallery management, and an administrative dashboard for organizers.

# GBU Basketball Tournament System

![Django](https://img.shields.io/badge/Django-6.0-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)
![License](https://img.shields.io/badge/License-MIT-green)
---

## Features

### Tournament Management

* Tournament overview dashboard
* Team registration and management
* Match scheduling
* Fixture generation
* Match results tracking

### Live Updates

* Real-time scoreboard updates
* Live match information
* Match statistics
* Tournament standings

### Gallery System

* Event albums
* Match photos
* Tournament highlights

### Notifications

* Tournament announcements
* Match reminders
* Important updates

### Admin Dashboard

* Manage teams
* Manage matches
* Manage gallery
* Manage notifications
* Tournament administration tools

---

## Tech Stack

### Frontend

* Next.js 16
* TypeScript
* React
* Tailwind CSS

### Backend

* Django
* Django REST Framework
* Gunicorn

### Infrastructure

* AWS EC2
* Nginx
* PM2
* Currently moved to vercel(nextjs) and render(django).

---

## Project Structure

```text
GBU_BasketBall/
├── Frontend/
│   └── gbu-hoops/
│       ├── src/
│       ├── public/
│       └── package.json
│
├── GBUBasketball/
│   ├── gallery/
│   ├── matches/
│   ├── notifications/
│   ├── teams/
│   ├── manage.py
│   └── requirements.txt
```

---

## Local Development Setup

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/GBU_BasketBall.git
cd GBU_BasketBall
```

---

### Backend Setup

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

Linux/Mac:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start backend:

```bash
python manage.py runserver
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

Navigate to frontend directory:

```bash
cd Frontend/gbu-hoops
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Contributing

We welcome contributions from students, developers, designers, and basketball enthusiasts.

### Getting Started

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your work.

```bash
git commit -m "Add: meaningful description"
```

5. Push changes.

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request.

---

## Pull Request Guidelines

Please ensure:

* Code builds successfully.
* No TypeScript errors.
* No linting errors.
* Existing functionality remains intact.
* PR description clearly explains the change.
* Screenshots are included for UI changes.

---

## Areas Where Contributions Are Welcome


### Frontend

* UI/UX improvements
* Mobile responsiveness
* Accessibility improvements
* Performance optimization

### Backend

* API improvements
* Database optimization
* Admin panel enhancements

### Infrastructure

* Docker support
* CI/CD workflows
* Monitoring setup

---

## Architecture

Users
  ↓
Next.js Frontend
  ↓
Nginx Reverse Proxy
  ↓
Django REST API
  ↓
SQLite / PostgreSQL

---

## Reporting Bugs

Please include:

* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots (if applicable)
* Browser/device information

---

## Security

Do not submit sensitive credentials through issues or pull requests.

Examples:

* AWS keys
* Database passwords
* Secret keys
* API tokens

---

## Good First Issues

New contributors can help with:

- Mobile responsiveness improvements
- UI polish and animations
- Accessibility improvements
- Loading skeletons
- Documentation improvements
- Unit tests
- API documentation
- Dark mode support

---

## License

This project is licensed under the MIT License.

---

## Maintainers

Developed and maintained by the GBU Basketball Tournament Team.

If you would like to contribute, feel free to open an issue or submit a pull request.

Every contribution, no matter how small, is appreciated.
