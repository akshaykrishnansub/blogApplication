# Blogifier - A Blogging Application

Blogifier is a full-stack blog platform where users can register, log in, and publish blog posts. Users can manage their own blogs through a personal dashboard with search and pagination.

## Live Demo:
Link to Live demo is as below:
https://blogapplication-xmph.onrender.com/

## Features
User authentication (JWT) <br>
Create, edit, and delete blogs <br>
User dashboard with blog statistics(Total Blogs Published overall, My Blogs, No. of Users) <br>
Search functionality <br>
Pagination for blog listings <br>
Responsive UI (Mobile, Tablet and Desktop) <br>
Secure password hashing <br>
Alert messages for better UX <br>
Deployment with cloud database

## Tech Stack
### Frontend:
HTML5 <br>
CSS3 <br>
JavaScript <br>
Bootstrap <br>
EJS <br>

### Backend:
Node.js <br>
Express.js <br>

### Database:
PostgreSQL (Supabase)

### Deployment:
Render

## Installation

To run this project locally:
1. Clone the repository:
   git clone https://github.com/akshaykrishnansub/blogApplication.git
   cd blogApplication
2. Setup PostgreSQL database
  - Create a database in PostgreSQL, e.g., blogdb.
  - Update database credentials in config/db.js (or wherever your DB config is).
3. Install dependencies:
   npm install
4. Start the server:
   npm run start
5. Open http://localhost:3000 in your browser

## Folder Structure

blogifier/ <br>
├── controllers/ <br>
├── models/      <br>
├── routes/      <br>
├── views/       <br>
├── public/      <br>
├── middleware/  <br>
├── config/      <br>
├── package.json <br>
└── app.js       <br>

## Usage

Register / Login: Create an account or log in with existing credentials
Dashboard: View your blogs, search blogs, and check statistics
Create Blog: Add a new blog with title, content, and tags
Edit / Delete: Manage your existing blogs
Search & Pagination: Easily find blogs and navigate through pages
