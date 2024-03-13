# reiz-quiz-app

## Summary

The Quiz App is an SPFx application developed with React and hosted on SharePoint. It provides a user-friendly quiz flow, starting with a welcome screen and guiding users through information management on the 2nd screen. Returning users can effortlessly retrieve their details by entering their email, with an option to edit. New users have the flexibility to create a fresh entry.

After completing the information stage, users are seamlessly guided to a 3rd screen with comprehensive quiz instructions. Subsequently, they transition to the 4th screen, where the actual quiz unfolds. The application ensures a smooth quiz experience, allowing users to submit their answers efficiently.

Upon completion, the final screen dynamically showcases the quiz results, offering a satisfying conclusion to the user journey. This structured approach enhances user engagement and streamlines the overall quiz-taking experience within the SharePoint environment.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Minimal Path to Awesome

-   Clone this repository
-   Ensure that you are at the solution folder
-   in the command-line run:
    -   **npm install**
    -   **gulp build**
    -   **gulp serve**

## Features

The quiz app employs an exceptionally user-friendly approach, streamlining user navigation throughout the application. To enhance data handling efficiency, I have integrated additional libraries, specifically:

Formik:
Utilized for managing the user form screen, Formik takes care of repetitive tasks such as tracking values, errors, visited fields, validation, and submission orchestration. This liberates developers from the tedious work of wiring up state and change handlers, allowing more focus on core business logic. Formik operates within the core React framework, avoiding complex subscriptions or observables. Its simplicity facilitates debugging, testing, and reasoning about forms. Notably, Formik, designed for React-savvy individuals familiar with forms, doesn't rely on external state management libraries like Redux or MobX. This incremental adoptability ensures a minimal bundle size.

Zustand:
A compact, swift, and scalable state management solution following simplified flux principles. Boasting a comfortable API based on hooks, Zustand avoids boilerplate code and unnecessary opinions. Despite its charming appearance, it is a robust state manager that addresses common challenges such as the zombie child problem, React concurrency, and context loss between mixed renderers. In the React ecosystem, Zustand stands out as a state manager that adeptly handles these issues, making it a reliable choice for efficient state management.
