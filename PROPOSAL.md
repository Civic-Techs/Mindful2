# Mindful Motion

Authors:

<!-- Replace Name with your names -->

- Catalina Dinozo (PM)
- Tyron Odame
- Issac Bien-Aime
- [Ajene Christian](https://github.com/ajenec)

Team Name: TACI Techs

## 😞 The Problem

<!-- content goes below -->

In today's day and age, many people often find themselves doing nothing productive with their time. This often leads to people spending countless hours scrolling away on social media. Doom Scrolling has become a serious problem with not just adults but also with teenagers. Teenagers are spending a lot of time exploring the web and aimlessly scrolling through social media with their time. Our group has decided to tackle this problem by offering a solution that will allow teenagers to learn new skills, compete with each other in creative challenges and ultimately boost teenagers productivity.

- Needs of Focus:
  - Lack of productivity during freetime
  - Teenagers’ doom scrolling
  - Boosting of productivity

<!-- content goes above -->

## 📝 Summary

<!-- content goes below -->

We will provide a platform for users to interact in communities based on their interests and to share projects and interactive challenges. Our target audience is people who seek greater involvement in activities, particularly teenagers who are struggling with the effects of doom scrolling. We hope our solution will encourage users to be more proactive and ambitious overall. Through seeing others’ involvement, users will gain interest in engaging with project-based challenges.

<!-- content goes above -->

## 🤔 Our Hypothesis

<!-- content goes below -->

TACI’s hypothesis that we came to is, if teenagers are exposed to more productive content, then it will have a direct impact on the teenagers’ productivity and ambition. For starters one of our team members, Tyron, noticed this live in the flesh with his younger sisters at home. Tyron’s sisters are chronic Tik Tok scrollers. Until they stumbled upon a DIY churro recipe which took them off their devices and got them making pastries for hours. This clearly shows how if done correctly, ‘productive scrolling’ can allow for people to be more active. Also, in Doomscrolling and Brain Rot written by Ashly E., states “ Doomscrolling often involves skimming surface-level information, which can erode teenagers' capacity for deep thinking and critical analysis.”. More examples can be seen of this in The Doomscrolling Pandemic by Max W. when he goes on to say “A 2023 study found that 62% of workers reported that doomscrolling hinders their ability to focus on tasks, and over 70% admitted to missing deadlines or underperforming due to doomscrolling.”. Ultimately, doom scrolling does not have to be this destructive, if only there was a way to engage viewers in challenge-like activities to boost their productivity and ambition. Here's where TACI introduces MindfulMotion.

<!-- content goes above -->

## 📱 Product Overview

<!-- content goes below -->

<!-- content goes above -->

## 🏙️ Mission Statement

<!-- content goes below -->

Our team intends to address this issue through a reporting system for abusive language and behaviors. Our application will focus on inclusivity through helping users to take steps toward projects and challenge involvement despite their struggles.

<!-- content goes above -->

## 🫂 Who do we serve?

<!-- content goes below -->

Young people; teenagers

<!-- content goes above -->

## 🧳 User Journy Map

<!-- content goes below -->

<!-- content goes above -->

## 👥 User-stories

<!-- content goes below -->

1. As a User, I can create an account, login securely, and view my challenges.

- **Page: `/register`, `/login`, `/profile`**
- **Frontend Components**: Register/Login forms _(with fields for email, username, password)_, submit buttons, user profile displaying the user’s name and joined or created challenges.
- **User Interaction**: The user signs-up/login with their credentials and submits the form. They are directed to their profile showing active challenges.
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
- **Frontend Components**: Form with input fields _(title, description, choose image)_, and submit button.
- **User Interaction**: User fills out and submits the form. The challenge is added and visible to others in the challenge feed.
- **Backend Interaction**:
  - **POST `/api/challenges`** → creates a new challenge

<!-- content goes above -->

## 🧗‍♂️ Key Technical Challenge

<!-- content goes below -->

- **Core Features**: Lists of project-based challenges users can participate in, public thread sections for users to log their experiences, functionality for adding challenges and beginning contests.
- **Technologies**: JavaScript, Express.js, React.js, and PostgreSQL.
- **Challenges:**
  - Database: We will need to create a good amount of project-based challenges to start off (15 - 25)

<!-- content goes above -->

## 🏋🏽 Extension Opportunities

<!-- content goes below -->

We wonder whether time of release will impact the effectiveness of our application. We are interested in showcasing challenge participation in user profiles.
Partnerships with schools could strengthen this project since schools tend to center around guiding youth through activities fostering growth.
Our solution can decrease the effects of doom scrolling through encouraging people to immerse themselves in creative activities.

<!-- content goes above -->

## 📒 Sources

<!-- content goes below -->

Woolf, M. (2025, March 1). The doomscrolling pandemic [2023 study]. https://passport-photo.online/blog/doomscrolling

Doomscrolling and brain rot: What are they?. Doomscrolling and Brain Rot | 700 Children’s Blog. (n.d.). https://www.nationwidechildrens.org/family-resources-education/700childrens/2025/01/doomscrolling-and-brain-rot

<!-- content goes above -->
