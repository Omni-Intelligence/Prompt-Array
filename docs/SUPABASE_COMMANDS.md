# Supabase Commands Quick Reference

A quick reference guide for all Supabase CLI commands used in this project. Most commands use npx to run the Supabase CLI.

================================================================================

TABLE OF CONTENTS

1. Project Setup
2. Local Development
3. Database Management
4. Migrations
5. Edge Functions
6. Authentication
7. Storage Management
8. Production
9. Useful Resources

================================================================================

PROJECT SETUP

Initialize Supabase in Project
  npx supabase init
  Creates a new supabase folder with configuration files.

Link Local Project to Remote Supabase
  npx supabase link --project-ref your_project_id
  Links your local environment to your Supabase project. Your project ID is xrzrvfbxyyuzpmtlthtv.

Login to Supabase CLI
  npx supabase login
  Authenticate with your Supabase account to access remote resources.

================================================================================

LOCAL DEVELOPMENT

Start Local Supabase Environment
  npx supabase start
  Starts all local Supabase services (API, Database, Studio, Auth emulator, etc.)
  
  Services Started:
  - API: http://localhost:54321
  - Database: localhost:54322
  - Studio: http://localhost:54323
  - Email Testing: http://localhost:54324

Stop Local Supabase Environment
  npx supabase stop
  Stops all running Supabase services.

Check Local Supabase Status
  npx supabase status
  Shows the status of all running local services and their ports.

Reset Local Database
  npx supabase db reset
  Resets the local database to its initial state (runs migrations from scratch).

================================================================================

DATABASE MANAGEMENT

Connect to Local Database
  npx supabase db pull
  Fetches the remote schema and applies it to your local database for development.

Execute SQL Commands
  npx supabase sql
  Opens an interactive SQL shell connected to your local database.

List Database Tables
  npx supabase db tables
  Lists all tables in your database.

Import SQL File
  npx supabase db execute < path/to/file.sql
  Runs an SQL script against your local database.

Generate/Update TypeScript Types from Database
  npx supabase gen types typescript --linked > src/types/supabase.ts
  Pulls your remote database schema and generates updated TypeScript types. Saves to src/types/supabase.ts

================================================================================

MIGRATIONS

Create a New Migration
  npx supabase migration new migration_name
  Creates a new migration file in supabase/migrations/ with a timestamp prefix.
  
  Example:
  npx supabase migration new add_users_table
  Creates: supabase/migrations/20250000000000_add_users_table.sql

Apply Pending Migrations
  npx supabase db push
  Applies all pending migrations to your local database.

Push Migrations to Production
  npx supabase db push --linked
  Applies pending migrations to your linked remote Supabase project.

View Migration History
  npx supabase migration list
  Shows all migrations and their status.

Rollback Last Migration
  npx supabase migration delete migration_name
  Removes a migration from the system (be careful with this!).

================================================================================

EDGE FUNCTIONS

Create a New Edge Function
  npx supabase functions new function_name
  Scaffolds a new Deno-based Edge Function.
  
  Example:
  npx supabase functions new send-email
  Creates: supabase/functions/send-email/index.ts

Deploy Edge Functions
  npx supabase functions deploy function_name
  Deploys a specific function to your linked Supabase project.

Deploy All Functions
  npx supabase functions deploy
  Deploys all Edge Functions to your linked project.

Test Function Locally
  npx supabase functions serve function_name
  Runs an Edge Function locally for testing (requires local Supabase running).

Invoke Function
  npx supabase functions invoke function_name --body '{"key":"value"}'
  Calls an Edge Function with JSON payload.

================================================================================

AUTHENTICATION

View Auth Emulator Data (Local)
  npx supabase studio
  Opens Supabase Studio at http://localhost:54323 where you can view auth users, sessions, and more.

Generate JWT Token (Local Testing)
  npx supabase sql
  Then run SQL to view JWT tokens in the auth.sessions table.

================================================================================

STORAGE MANAGEMENT

List Storage Buckets
  npx supabase storage list
  Lists all storage buckets in your project.

Create Storage Bucket
  npx supabase storage create bucket_name
  Creates a new storage bucket.

Delete Storage Bucket
  npx supabase storage delete bucket_name
  Deletes a storage bucket and its contents.

================================================================================

PRODUCTION

Pull Production Schema
  npx supabase db pull
  Fetches your production database schema and creates a migration.

View Production Logs
  npx supabase functions logs function_name
  Shows logs from Edge Functions running on production.

Check Production Status
  npx supabase projects list
  Lists all your Supabase projects.

================================================================================

USEFUL RESOURCES

Supabase CLI Docs:       https://supabase.com/docs/guides/cli
Migrations Guide:        https://supabase.com/docs/guides/cli/local-development/db-migrations
Edge Functions:          https://supabase.com/docs/guides/functions
Project ID:              xrzrvfbxyyuzpmtlthtv
Local Config File:       supabase/config.toml

================================================================================

TIPS & TRICKS

Check CLI Version
  npx supabase --version

Get Help for Any Command
  npx supabase [command] --help
  Example: npx supabase migration --help

Clear All Local Supabase Data
  npx supabase stop --no-backup
  npx supabase start

Access Local Database Directly
  psql postgresql://postgres:postgres@localhost:54322/postgres
  Requires psql CLI tool installed.

Why npx?
  npx is used because the Supabase CLI is installed as an npm package in your project's devDependencies. This ensures everyone uses the same version of the CLI across the team.