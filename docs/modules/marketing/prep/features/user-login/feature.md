# Feature: User Login

## Summary
Users can log in to their accounts using email and password. This grants them access to their role-specific dashboard and features (farmer dashboard or customer marketplace).

## User Story
As a registered user, I want to log in with my email and password so that I can access my account and perform role-specific actions.

## Acceptance Criteria
- User can navigate to a login page
- User can enter email address and password
- User can submit the login form
- System validates credentials against registered accounts
- System shows error message if credentials are incorrect
- System logs user in upon successful credential validation
- User is redirected to appropriate dashboard (farmer or customer based on role)
- User remains logged in across page navigation (session persistence)
- User can log out at any time
- System shows "logged in" state in UI (e.g., username or avatar display)

## Priority
High — Users cannot access the platform without login.

## Dependencies
user-registration
