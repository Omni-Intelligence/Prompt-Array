# Database Migration Guide

## Overview

This guide covers migrating from the old complex database schema (30+ tables) to the new simplified schema (10 core tables). The new schema eliminates Laravel-specific tables, consolidates redundant structures, and uses UUID consistently throughout.

## What Changed

### Before vs After

**Tables Removed:** ~20 tables
**Tables Kept/Simplified:** 10 core tables
**Total Reduction:** 67% fewer tables

### Key Changes

1. **ID Strategy:** Now consistently using UUID across all tables
2. **User Management:** Consolidated to use Supabase `auth.users` + `user_profiles`
3. **Laravel Infrastructure:** Completely removed (cache, sessions, jobs, etc.)
4. **Subscriptions:** Simplified from 2 tables to 1
5. **RLS Policies:** Comprehensive row-level security on all tables
6. **Indexes:** Strategic indexes for performance

---

## Tables Comparison

### Removed Tables

| Table | Reason | Replacement |
|-------|--------|-------------|
| `cache`, `cache_locks` | Laravel cache system | Use Supabase/Redis |
| `sessions` | Laravel sessions | Supabase Auth sessions |
| `jobs`, `job_batches`, `failed_jobs` | Laravel queue | Supabase Edge Functions |
| `migrations` | Laravel migrations | Supabase migrations |
| `password_reset_tokens` | Laravel auth | Supabase Auth |
| `personal_access_tokens` | Laravel Sanctum | Supabase JWTs |
| `telescope_*` (3 tables) | Laravel debugging | External monitoring (Sentry, etc.) |
| `profiles` | Duplicate user data | Merged into `user_profiles` |
| `users` | Custom user table | Use `auth.users` + `user_profiles` |
| `group_prompt` | Junction table | Use `prompts.group_id` directly |
| `subscription_items` | Complex subscriptions | Simplified to single `subscriptions` |
| `email_logs`, `email_delivery_events` | Over-engineered email | Can add simplified version if needed |
| `community_prompts` | MVP deferral | Can add later when needed |

### Core Tables (10)

| Table | Purpose | Key Changes |
|-------|---------|-------------|
| `user_profiles` | Extended user info | Now uses UUID, references `auth.users` |
| `folders` | Prompt organization | UUID, materialized path for hierarchy |
| `groups` | Team collaboration | UUID, simplified structure |
| `group_members` | Group membership | UUID, role-based access |
| `prompts` | Main content | UUID, cleaned up relationships |
| `prompt_versions` | Version history | UUID, better versioning logic |
| `chains` | Prompt sequences | UUID, simplified |
| `chain_prompts` | Chain items | UUID, sequence-based ordering |
| `favorites` | User bookmarks | UUID, simple many-to-many |
| `subscriptions` | Billing | UUID, single table design |

---

## Migration Process

### Prerequisites

1. **Backup your database:**
   ```bash
   # If using Supabase locally
   npx supabase db dump -f backup.sql

   # Or pg_dump
   pg_dump -h localhost -U postgres -d postgres > backup.sql
   ```

2. **Export your data:**
   - User data from old `users` table
   - Existing prompts and relationships
   - Active subscriptions
   - Any other critical data

### Option 1: Fresh Start (Recommended for New Projects)

If you're rebuilding from scratch or have no production data:

```bash
# 1. Reset your database
npx supabase db reset

# 2. Apply the new schema
npx supabase db push

# The migration files will run automatically:
# - 20250000000000_clean_schema_foundation.sql
# - 20250000000001_drop_legacy_tables.sql
```

### Option 2: Migrate Existing Data

If you have existing data to preserve:

#### Step 1: Export Critical Data

Create a data export script:

```sql
-- Export users to CSV
COPY (
  SELECT id, email, name, avatar_url, created_at
  FROM users
) TO '/tmp/users_export.csv' CSV HEADER;

-- Export prompts
COPY (
  SELECT id, user_id, title, content, description, tags,
         is_public, is_template, template_category, created_at
  FROM prompts
) TO '/tmp/prompts_export.csv' CSV HEADER;

-- Export subscriptions
COPY (
  SELECT user_id, stripe_customer_id, stripe_subscription_id,
         status, current_period_end
  FROM subscriptions
) TO '/tmp/subscriptions_export.csv' CSV HEADER;
```

#### Step 2: Run the New Schema

```bash
# Apply the clean foundation
npx supabase db push
```

#### Step 3: Import Data

Create an import script ([see data_migration.sql](#data-migration-script) below)

#### Step 4: Verify Data

```sql
-- Check user counts match
SELECT COUNT(*) FROM auth.users;
SELECT COUNT(*) FROM user_profiles;

-- Check prompt counts match
SELECT COUNT(*) FROM prompts WHERE deleted_at IS NULL;

-- Check subscriptions
SELECT COUNT(*) FROM subscriptions WHERE status = 'active';
```

---

## Data Migration Script

Create a file: `supabase/migrations/20250000000002_import_legacy_data.sql`

```sql
-- Import Legacy Data Migration
-- This script helps migrate data from old schema to new schema
-- Adjust UUIDs and mappings as needed for your data

-- ============================================================================
-- STEP 1: Migrate Users to auth.users (if needed)
-- ============================================================================

-- NOTE: If you're using Supabase Auth, users should already be in auth.users
-- This step is only needed if you have a custom users table

-- Create user profiles for existing auth users
INSERT INTO user_profiles (id, avatar_url, bio, created_at, updated_at)
SELECT
  id,
  raw_user_meta_data->>'avatar_url',
  NULL, -- bio can be set later
  created_at,
  updated_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 2: Migrate Folders (if structure changed)
-- ============================================================================

-- If your old folders used integer IDs, you'll need to map them to UUIDs
-- Create a temporary mapping table
CREATE TEMPORARY TABLE folder_id_mapping AS
SELECT
  old_id,
  uuid_generate_v4() AS new_id
FROM (SELECT DISTINCT id AS old_id FROM old_folders) f;

-- Insert folders with new UUIDs
INSERT INTO folders (id, user_id, parent_id, name, path, created_at, updated_at)
SELECT
  fim.new_id,
  u.id, -- Map old user_id to new UUID from auth.users
  pim.new_id, -- Map parent_id using mapping table
  of.name,
  of.path,
  of.created_at,
  of.updated_at
FROM old_folders of
JOIN folder_id_mapping fim ON of.id = fim.old_id
LEFT JOIN folder_id_mapping pim ON of.parent_id = pim.old_id
JOIN auth.users u ON of.user_id = u.id; -- Assuming user_id maps somehow

-- ============================================================================
-- STEP 3: Migrate Groups
-- ============================================================================

CREATE TEMPORARY TABLE group_id_mapping AS
SELECT
  old_id,
  uuid_generate_v4() AS new_id
FROM (SELECT DISTINCT id AS old_id FROM old_groups) g;

INSERT INTO groups (id, name, description, avatar, created_by, created_at, updated_at)
SELECT
  gim.new_id,
  og.name,
  og.description,
  og.avatar,
  u.id,
  og.created_at,
  og.updated_at
FROM old_groups og
JOIN group_id_mapping gim ON og.id = gim.old_id
JOIN auth.users u ON og.created_by = u.id;

-- ============================================================================
-- STEP 4: Migrate Prompts
-- ============================================================================

CREATE TEMPORARY TABLE prompt_id_mapping AS
SELECT
  old_id,
  uuid_generate_v4() AS new_id
FROM (SELECT DISTINCT id AS old_id FROM old_prompts) p;

INSERT INTO prompts (
  id, user_id, folder_id, group_id, title, content, description,
  tags, is_public, is_template, template_category, version,
  created_at, updated_at
)
SELECT
  pim.new_id,
  u.id,
  fim.new_id,
  gim.new_id,
  op.title,
  op.content,
  op.description,
  op.tags,
  op.is_public,
  op.is_template,
  op.template_category,
  op.version,
  op.created_at,
  op.updated_at
FROM old_prompts op
JOIN prompt_id_mapping pim ON op.id = pim.old_id
JOIN auth.users u ON op.user_id = u.id
LEFT JOIN folder_id_mapping fim ON op.folder_id = fim.old_id
LEFT JOIN group_id_mapping gim ON op.group_id = gim.old_id;

-- ============================================================================
-- STEP 5: Migrate Subscriptions
-- ============================================================================

INSERT INTO subscriptions (
  id, user_id, stripe_customer_id, stripe_subscription_id,
  stripe_price_id, status, current_period_start, current_period_end,
  trial_end, created_at, updated_at
)
SELECT
  uuid_generate_v4(),
  u.id,
  os.stripe_customer_id,
  os.stripe_subscription_id,
  os.stripe_price,
  os.stripe_status,
  os.created_at,
  os.ends_at,
  os.trial_ends_at,
  os.created_at,
  os.updated_at
FROM old_subscriptions os
JOIN auth.users u ON os.user_id = u.id;

-- ============================================================================
-- STEP 6: Clean up temporary tables
-- ============================================================================

DROP TABLE IF EXISTS folder_id_mapping;
DROP TABLE IF EXISTS group_id_mapping;
DROP TABLE IF EXISTS prompt_id_mapping;
```

---

## Testing the Migration

### 1. Verify Table Structure

```sql
-- List all tables
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Should show only 10 core tables
```

### 2. Test RLS Policies

```sql
-- As authenticated user
SET request.jwt.claims.sub = 'some-user-uuid';

-- Should only see own data
SELECT COUNT(*) FROM prompts;
SELECT COUNT(*) FROM folders;
SELECT COUNT(*) FROM chains;
```

### 3. Test Relationships

```sql
-- Verify foreign keys work
SELECT
  p.title,
  u.email AS author_email,
  f.name AS folder_name,
  g.name AS group_name
FROM prompts p
LEFT JOIN auth.users u ON p.user_id = u.id
LEFT JOIN folders f ON p.folder_id = f.id
LEFT JOIN groups g ON p.group_id = g.id
LIMIT 10;
```

### 4. Test Indexes

```sql
-- Check if indexes exist
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

---

## Rollback Plan

If something goes wrong:

### Option 1: Restore from Backup

```bash
# Restore from pg_dump
psql -h localhost -U postgres -d postgres < backup.sql

# Or from Supabase dump
npx supabase db reset
psql -h localhost -U postgres -d postgres < backup.sql
```

### Option 2: Keep Old Tables Temporarily

Before running the drop migration, you can:

1. Rename old tables instead of dropping them:
   ```sql
   ALTER TABLE users RENAME TO users_old;
   ALTER TABLE profiles RENAME TO profiles_old;
   -- etc.
   ```

2. Keep them for a grace period (30 days)
3. Drop them after confirming new system works

---

## Post-Migration Checklist

- [ ] All data successfully migrated
- [ ] User authentication works
- [ ] Prompt CRUD operations work
- [ ] Group collaboration works
- [ ] Subscriptions are tracked correctly
- [ ] RLS policies prevent unauthorized access
- [ ] Application queries updated for new schema
- [ ] TypeScript types regenerated and imported
- [ ] Tests updated and passing
- [ ] Performance is acceptable (check slow queries)
- [ ] Backup old tables or confirm safe to drop
- [ ] Update documentation

---

## Updating Your Application Code

### 1. Update Supabase Client

```typescript
// Old - using old types
import { Database } from './types/supabase'

// New - using new types
import { Database } from './types/database.types'
```

### 2. Update Queries

```typescript
// Old - using integer IDs
const { data } = await supabase
  .from('prompts')
  .select('*')
  .eq('id', 123)

// New - using UUIDs
const { data } = await supabase
  .from('prompts')
  .select('*')
  .eq('id', 'uuid-string-here')
```

### 3. Update User References

```typescript
// Old - custom users table
const { data } = await supabase
  .from('users')
  .select('name, email, avatar_url')
  .eq('id', userId)

// New - auth.users + user_profiles
const { data: { user } } = await supabase.auth.getUser()
const { data: profile } = await supabase
  .from('user_profiles')
  .select('bio, website, social_links')
  .eq('id', user.id)
  .single()
```

### 4. Regenerate Types

```bash
# Generate fresh types from your database
npx supabase gen types typescript --local > src/types/database.types.ts
```

---

## Common Issues & Solutions

### Issue: UUID vs Integer Mismatch

**Problem:** Application expects integer IDs but database uses UUIDs

**Solution:**
1. Update all ID comparisons in your code
2. Update API endpoints that use IDs
3. Update URL routing if using IDs in paths

### Issue: RLS Policies Block Access

**Problem:** Queries return empty even though data exists

**Solution:**
1. Check if user is authenticated: `supabase.auth.getUser()`
2. Verify RLS policies include your use case
3. Check if user has permission (group member, prompt owner, etc.)
4. Use `supabase.rpc()` for complex queries that need multiple checks

### Issue: Missing Relations

**Problem:** Joins fail or return null

**Solution:**
1. Verify foreign key relationships exist
2. Use `LEFT JOIN` if relationship is optional
3. Check if cascading deletes removed related data

### Issue: Performance Degradation

**Problem:** Queries are slower than before

**Solution:**
1. Check if indexes exist: see [Testing the Migration](#testing-the-migration)
2. Add missing indexes for your specific queries
3. Use `EXPLAIN ANALYZE` to identify slow queries
4. Consider adding materialized views for complex queries

---

## Need Help?

- Check the Supabase docs: https://supabase.com/docs
- Review RLS policies: https://supabase.com/docs/guides/auth/row-level-security
- Database design patterns: https://supabase.com/docs/guides/database/design

---

## Files Created

1. `supabase/migrations/20250000000000_clean_schema_foundation.sql` - New schema
2. `supabase/migrations/20250000000001_drop_legacy_tables.sql` - Drop old tables
3. `src/types/database.types.ts` - TypeScript types
4. `docs/DATABASE_MIGRATION_GUIDE.md` - This file
