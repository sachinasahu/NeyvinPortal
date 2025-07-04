# Neyvin Portal - Login System Setup Guide

## Overview
This guide explains how to set up the simplified login system where users can only register for one role (employer, vendor, or freelancer) and cannot login with a different role than they registered for.

## Changes Made

### 1. Simplified Signup Form
- **Before**: Required email, password, full name, and role-specific fields (company name, agency details, skills, etc.)
- **After**: Only requires email, password, and full name
- Role-specific profile details can be filled later in the dashboard

### 2. Role-Based Login Validation
- Users can only login with the role they registered for
- If someone tries to login with a different role, they get an error message
- Example: If you registered as "employer", you cannot login as "freelancer"

### 3. Database Structure
- One user = One role (enforced at database level)
- Role-specific profile tables for additional details
- Automatic profile creation on signup

## Supabase Setup Instructions

### Step 1: Run the SQL Setup
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click "Run" to execute all the SQL commands

### Step 2: Verify the Setup
After running the SQL, you should have:

#### Tables Created:
- `profiles` - Main user profile with role
- `employer_profiles` - Employer-specific details
- `vendor_profiles` - Vendor-specific details  
- `freelancer_profiles` - Freelancer-specific details

#### Functions Created:
- `get_role_for_email(p_email TEXT)` - Gets user's registered role
- `handle_new_user()` - Automatically creates profiles on signup
- `update_updated_at_column()` - Updates timestamps

#### Triggers Created:
- `on_auth_user_created` - Triggers profile creation on signup
- Various `update_*_updated_at` triggers for timestamp management

#### Security:
- Row Level Security (RLS) enabled on all tables
- Policies ensure users can only access their own data
- Proper permissions granted to authenticated users

## How It Works

### Signup Process:
1. User fills email, password, and full name
2. User selects a role (employer/vendor/freelancer)
3. Account is created in Supabase Auth
4. Trigger automatically creates profile in `profiles` table
5. Trigger creates role-specific profile in corresponding table

### Login Process:
1. User enters email and password
2. User selects a role tab
3. System checks if the user's registered role matches the selected role
4. If mismatch: Shows error and prevents login
5. If match: Allows login and redirects to role-specific dashboard

### Role Enforcement:
- Database function `get_role_for_email()` checks user's registered role
- Login function compares selected role with registered role
- Error message shows the correct role to use

## Error Messages

### During Signup:
- "An account with this email already exists. Please login or use a different email address."
- "You have already registered as a(n) [role]. Please log in with that role."

### During Login:
- "You have registered as a(n) [role]. Please login with that role."
- "Invalid email or password" (for other auth errors)

## Testing the System

### Test Case 1: New User Registration
1. Go to `/signup`
2. Fill in email, password, and full name
3. Select "Employer" role
4. Click "Create Account"
5. Verify account is created and email verification is sent

### Test Case 2: Role Mismatch Login
1. Register as "Employer" with email `test@example.com`
2. Go to `/login`
3. Try to login with "Freelancer" role selected
4. Should see error: "You have registered as a(n) employer. Please login with that role."

### Test Case 3: Correct Role Login
1. Login with "Employer" role selected
2. Should successfully login and redirect to `/employer/dashboard`

## Code Changes Summary

### Files Modified:
1. `app/signup/page.tsx` - Simplified form to only email/password/name
2. `app/login/page.tsx` - Added role parameter to signIn call
3. `contexts/auth-context.tsx` - Updated signIn function to check role mismatch

### Key Functions:
- `signIn(email, password, role)` - Now validates role before allowing login
- `signUp(email, password, fullName, role)` - Simplified to only basic fields
- `get_role_for_email()` - Database function to check user's role

## Security Features

1. **Role Isolation**: Users can only access their registered role
2. **Database Triggers**: Automatic profile creation prevents data inconsistency
3. **Row Level Security**: Users can only access their own data
4. **Input Validation**: Server-side validation of all inputs
5. **Error Handling**: Proper error messages without exposing sensitive data

## Troubleshooting

### Common Issues:

1. **"Function get_role_for_email does not exist"**
   - Make sure you ran the complete SQL setup
   - Check that the function was created successfully

2. **"Permission denied" errors**
   - Verify RLS policies are in place
   - Check that permissions are granted to authenticated users

3. **Profile not created on signup**
   - Check that the trigger `on_auth_user_created` exists
   - Verify the `handle_new_user()` function is working

4. **Role validation not working**
   - Ensure the `get_role_for_email()` function is accessible
   - Check that the signIn function is calling the role check

### Debug Steps:
1. Check Supabase logs for any SQL errors
2. Verify all tables and functions exist in the database
3. Test the `get_role_for_email()` function directly in SQL editor
4. Check browser console for any JavaScript errors

## Next Steps

After setting up the login system:

1. **Profile Completion**: Users can fill additional details in their dashboard
2. **Email Verification**: Implement email verification flow
3. **Password Reset**: Add password reset functionality
4. **Profile Management**: Add profile editing capabilities
5. **Admin Panel**: Create admin interface for user management

## Support

If you encounter any issues:
1. Check the Supabase logs for detailed error messages
2. Verify all SQL commands executed successfully
3. Test the functions directly in the Supabase SQL editor
4. Check the browser console for client-side errors 