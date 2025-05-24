# Mindful Motion

Authors:

- [Catalina Dinozo](https://github.com/csdinozo) (Project Manager)
- [Tyron Odame](https://github.com/TyronOdame)
- [Ajene Christian](https://github.com/ajenec)
- [Issac Bien-Aime](https://github.com/Issactly)

Team Name: TACI Techs


## The Problem

Many people use their time unproductively, spending countless hours scrolling through social media posts. Excessive social media usage has become a serious problem for not only adults but especially teenagers. Growing up with greater exposure to the internet than prior generations, teenagers spend much of their time online. Our group intended to offer an opportunity to learn new skills, compete with each other in creative challenges, and ultimately boost users' productivity.

- Needs of Focus:
  - Lack of productivity in free time
  - Dopamine-induced appeal of social media
  - Inclusivity of diverse interests and communication


## Summary

<!-- content goes below -->

We will provide a platform for users to interact in communities based on their interests and to share projects and interactive challenges. Our target audience is people who seek greater involvement in activities, particularly teenagers who are struggling with the effects of doom scrolling. We hope our solution will encourage users to be more proactive and ambitious overall. Through seeing others’ involvement, users will gain interest in engaging with project-based challenges.


## Our Hypothesis

TACI’s hypothesis: if teenagers are exposed to more productive content, then it will have a direct impact on the teenagers’ productivity and ambition. For starters, one of our team members, Tyron, noticed this with his younger sisters at home. Tyron’s sisters are regularly active users of TikTok. When they stumbled on a do-it-yourself churro recipe, it took them off their devices, encouraging them to make pastries for hours. This shows how ‘productive scrolling’ can allow for people to be more active. Also, in "Doomscrolling and Brain Rot", Ebersole states “Doomscrolling often involves skimming surface-level information, which can erode teenagers' capacity for deep thinking and critical analysis”. More examples can be seen in "The Doomscrolling Pandemic" by Woolf, who says, “A 2023 study found that 62% of workers reported that doomscrolling hinders their ability to focus on tasks, and over 70% admitted to missing deadlines or underperforming due to doomscrolling”. Time on social media does not have to be so destructive, especially when engaging users in project-based challenges and activities to boost their productivity and ambition.


## 📱 Product Overview

Mindful Motion is a social platform allowing users to participate in user-created challenges and share their experiences through posts and comments.

## 🏙️ Mission Statement

Our team intends to address this issue through a reporting system for abusive language and behaviors. Our application will focus on inclusivity through helping users to take steps toward projects and challenge involvement despite their struggles.


## 🫂 Who do we serve?

Our target audiences are the youth and, more broadly, any individuals interested in engaging in and discussing activities and in spending less of their time online unproductively.


## 🧳 User Journey Map

**Persona**: A teenager who wants to spend less time unproductively on social media but isn’t sure what else to do

**Scenario**: Jane, a 15-year-old, is looking for new things to do offline. She spends much of her time on social media platforms.

1. **Discovery and Entry**
Jane hears about the platform and visits the homepage. Reading examples of challenges, she is immediately interested in participating.
2. **Sign-up and Onboarding**
Jane signs up quickly, creating a username and password. The process is easy and secure.
3. **Exploration and Interaction**
Jane explores the app, accessing challenges of different categories. She feels confident navigating the platform and enjoys the ease of use.
4. **Creating a Post**
Jane adds her entry to a challenge of her interest. She adds a title and description in under 30 seconds. She feels proud to contribute to her community.
5. **Exploration and Interaction**
Jane interacts with posts, commenting to show support. This helps her feel engaged and connected to others.
6. **Creating a Challenge**
Jane starts her own challenge. This helps her feel more actively involved with her community and interests.

[Figma](https://www.figma.com/design/GoU5iKdmamviDVm3FuEIl5/MindfulMotion?node-id=0-1&t=8DOiI1bSrauC95e3-1)


## 👥 User Stories

1. As a User, I can create an account, login securely, and view my challenges.

- **Page: `/register`, `/login`, `/profile`**
- **Frontend Components**: Register/Login forms (with fields for _email_, _username_, _password_), submit buttons, user profile displaying the user’s name and joined challenges.
- **User Interaction**: The user signs up or logs in with their credentials and submits the form. They are directed to their profile showing active challenges.
- **Backend Interaction**:
  - **POST `/api/auth/register`** → creates user with hashed password
  - **POST `/api/auth/login`** → authenticates user and returns profile
  - **GET `/api/user/challenges`** → returns challenges associated with logged-in user

2. As a User, I can view a list of available challenges so i can choose one that interests me.

- **Page: `/challenges`**
- **Frontend Components**: Challenge cards _(with title, short description, creator name, and simple picture icon)_, filters for sorting categories, “join challenge” buttons.
- **User Interaction**: User lands on the challenge list page, and they can scroll through the list or filter by category, and click to join one.
- **Backend Interaction**:
  - **GET `/api/challenges`** → fetches all available challenges
  - **POST `/api/challenges/join/:id`** → adds user to selected challenge

3. As a User, I can create a challenge with a description that other users can participate in.

- **Page: `/create-challenge`**
- **Frontend Components**: Form with input fields (_title_, _description_, _choose image_), and submit button.
- **User Interaction**: User fills out and submits the form. The challenge is added and visible to others in the challenge feed.
- **Backend Interaction**:
  - **POST `/api/challenges`** → creates a new challenge


## 🧗‍♂️ Key Technical Challenge

- **Core Features**: Lists of project-based challenges users can participate in, functionality for adding challenges.
- **Technologies**: JavaScript, Express.js, React.js, and PostgreSQL.
- **Challenges:**
  - Database: We will need to create a good amount of project-based challenges to start off

## 🏋🏽 Extension Opportunities

We wonder whether time of release will impact the effectiveness of our application. We are interested in showcasing challenge participation in user profiles.

Partnerships with schools could strengthen this project since schools tend to center around guiding youth through activities fostering growth. Our solution can decrease the effects of doom scrolling through encouraging people to immerse themselves in creative activities.


## 📒 Sources

Woolf, M. (2025, March 1). The Doomscrolling Pandemic [2023 study]. https://passport-photo.online/blog/doomscrolling

Ebersole, A. (MD). "Doomscrolling and Brain Rot: What Are They?" | 700 Children’s Blog. (30 Jan. 2025). https://www.nationwidechildrens.org/family-resources-education/700childrens/2025/01/doomscrolling-and-brain-rot
