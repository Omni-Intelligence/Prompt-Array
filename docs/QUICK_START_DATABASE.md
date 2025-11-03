# Quick Start: Database Setup

## For New Projects (Recommended)

### 1. Reset and Apply Clean Schema

```bash
# Stop any running Supabase instance
npx supabase stop

# Start fresh
npx supabase start

# The migrations will automatically apply:
# - 20250000000000_clean_schema_foundation.sql
# - 20250000000001_drop_legacy_tables.sql
```

### 2. Verify Tables

```bash
# Access the database
npx supabase db diff

# Or use SQL editor in Supabase Studio
# Navigate to: http://localhost:54323
```

```sql
-- Verify all 10 tables exist
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Should show:
-- chain_prompts
-- chains
-- favorites
-- folders
-- group_members
-- groups
-- prompt_versions
-- prompts
-- subscriptions
-- user_profiles
```

### 3. Generate TypeScript Types

```bash
# Generate types from your local database
npx supabase gen types typescript --local > src/types/database.types.ts
```

### 4. Test Authentication

```typescript
// In your app
import { createClient } from '@supabase/supabase-js'
import { Database } from './types/database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sign up a test user
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123'
})

// Create user profile
if (data.user) {
  await supabase
    .from('user_profiles')
    .insert({
      id: data.user.id,
      bio: 'Test user'
    })
}
```

### 5. Create Test Data

```sql
-- Create a folder
INSERT INTO folders (user_id, name, path)
VALUES ('your-user-id', 'Work', '/Work');

-- Create a prompt
INSERT INTO prompts (user_id, folder_id, title, content)
VALUES (
  'your-user-id',
  'folder-uuid',
  'Test Prompt',
  'This is a test prompt content'
);

-- Create a favorite
INSERT INTO favorites (user_id, prompt_id)
VALUES ('your-user-id', 'prompt-uuid');
```

### 6. Test RLS Policies

```typescript
// Test as authenticated user
const { data: prompts } = await supabase
  .from('prompts')
  .select('*')

// Should only return user's own prompts + public prompts

// Test creating a prompt
const { data, error } = await supabase
  .from('prompts')
  .insert({
    title: 'My Prompt',
    content: 'Prompt content here',
    user_id: user.id
  })
  .select()
  .single()
```

---

## For Existing Projects

### Option A: Start Fresh (Easiest)

**⚠️ Warning: This will DELETE all existing data!**

```bash
# 1. Export any data you want to keep
npx supabase db dump -f backup.sql

# 2. Reset database
npx supabase db reset

# 3. Migrations apply automatically
```

### Option B: Migrate Data (Preserve Data)

1. **Backup everything:**
   ```bash
   npx supabase db dump -f backup_$(date +%Y%m%d).sql
   ```

2. **Review drop migration:**
   Edit `supabase/migrations/20250000000001_drop_legacy_tables.sql`
   - Uncomment lines for tables you want to drop
   - Keep commented for tables you want to preserve temporarily

3. **Apply migrations:**
   ```bash
   npx supabase db push
   ```

4. **Migrate data:**
   - See [DATABASE_MIGRATION_GUIDE.md](./DATABASE_MIGRATION_GUIDE.md) for detailed steps
   - Create custom migration script if needed

5. **Verify:**
   ```sql
   -- Check counts match
   SELECT 'prompts' as table_name, COUNT(*) FROM prompts
   UNION ALL
   SELECT 'users', COUNT(*) FROM auth.users
   UNION ALL
   SELECT 'folders', COUNT(*) FROM folders;
   ```

---

## Common Commands

### Supabase CLI

```bash
# Start local Supabase
npx supabase start

# Stop local Supabase
npx supabase stop

# View database URL
npx supabase status

# Open Studio (GUI)
open http://localhost:54323

# Create new migration
npx supabase migration new migration_name

# Apply migrations
npx supabase db push

# Reset database (⚠️ deletes data)
npx supabase db reset

# Dump database
npx supabase db dump -f backup.sql

# Generate TypeScript types
npx supabase gen types typescript --local > src/types/database.types.ts
```

### psql Commands

```bash
# Connect to local database
psql postgresql://postgres:postgres@localhost:54322/postgres

# Or using Supabase CLI
npx supabase db shell
```

```sql
-- Inside psql

-- List all tables
\dt

-- Describe table structure
\d prompts

-- List all indexes
\di

-- List all functions
\df

-- Quit
\q
```

---

## Troubleshooting

### Issue: Migrations not applying

```bash
# Check migration status
npx supabase migration list

# Force reapply (⚠️ dangerous)
npx supabase db reset
```

### Issue: RLS blocking queries

```bash
# Temporarily disable RLS for debugging (local only!)
```

```sql
-- Disable RLS on a table
ALTER TABLE prompts DISABLE ROW LEVEL SECURITY;

-- Re-enable when done
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
```

### Issue: Can't connect to database

```bash
# Check if Supabase is running
npx supabase status

# Check port conflicts
lsof -i :54322  # Database port
lsof -i :54323  # Studio port

# Restart
npx supabase stop
npx supabase start
```

### Issue: Type errors in TypeScript

```bash
# Regenerate types
npx supabase gen types typescript --local > src/types/database.types.ts

# Restart TypeScript server in your IDE
# VSCode: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### Issue: Old supabase.ts types file

If you have an old `src/types/supabase.ts` file:

```bash
# Option 1: Delete old file
rm src/types/supabase.ts

# Option 2: Replace with new one
npx supabase gen types typescript --local > src/types/supabase.ts
```

Update imports in your code:
```typescript
// Old
import { Database } from '@/types/supabase'

// New
import { Database } from '@/types/database.types'
```

---

## Next Steps

1. **Review the schema:**
   - [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Full schema reference

2. **Configure authentication:**
   - Set up auth providers in Supabase Studio
   - Configure email templates
   - Set up OAuth if needed

3. **Set up Edge Functions:**
   - Stripe webhooks
   - Email sending
   - Complex business logic

4. **Configure Storage:**
   - User avatars
   - Prompt attachments
   - Group logos

5. **Add monitoring:**
   - Set up Sentry or similar
   - Configure log aggregation
   - Set up uptime monitoring

6. **Deploy to production:**
   ```bash
   # Link to production project
   npx supabase link --project-ref your-project-ref

   # Push migrations
   npx supabase db push
   ```

---

## Database URLs

### Local Development

```bash
# Get local connection details
npx supabase status
```

Default URLs:
- **API URL:** http://localhost:54321
- **Database URL:** postgresql://postgres:postgres@localhost:54322/postgres
- **Studio URL:** http://localhost:54323
- **Inbucket (Emails):** http://localhost:54324

### Environment Variables

Create `.env.local`:

```env
# Local development
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-supabase-status
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-supabase-status

# Production (get from Supabase Dashboard)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
```

---

## Quick Testing Queries

### 1. Test User Profile

```sql
-- Create test user profile
INSERT INTO user_profiles (id, bio, website)
VALUES (
  'paste-auth-user-id-here',
  'Software developer',
  'https://example.com'
);

-- Query user profile
SELECT
  u.email,
  p.bio,
  p.website,
  p.created_at
FROM auth.users u
JOIN user_profiles p ON p.id = u.id;
```

### 2. Test Folder Structure

```sql
-- Create nested folders
INSERT INTO folders (user_id, parent_id, name, path) VALUES
  ('user-id', NULL, 'Work', '/Work'),
  ('user-id', (SELECT id FROM folders WHERE name = 'Work'), 'Projects', '/Work/Projects');

-- Query folder tree
SELECT
  id,
  name,
  path,
  parent_id,
  COALESCE(
    (SELECT COUNT(*) FROM prompts WHERE folder_id = folders.id),
    0
  ) as prompt_count
FROM folders
WHERE user_id = 'user-id'
ORDER BY path;
```

### 3. Test Prompts

```sql
-- Create test prompt
INSERT INTO prompts (user_id, title, content, tags, is_public) VALUES
  ('user-id', 'Test Prompt', 'This is a test', ARRAY['test', 'demo'], false);

-- Query with relationships
SELECT
  p.title,
  p.tags,
  f.name as folder_name,
  g.name as group_name,
  (SELECT COUNT(*) FROM favorites WHERE prompt_id = p.id) as favorite_count,
  (SELECT COUNT(*) FROM prompt_versions WHERE prompt_id = p.id) as version_count
FROM prompts p
LEFT JOIN folders f ON f.id = p.folder_id
LEFT JOIN groups g ON g.id = p.group_id
WHERE p.user_id = 'user-id'
  AND p.deleted_at IS NULL;
```

### 4. Test Groups

```sql
-- Create group
INSERT INTO groups (name, description, created_by) VALUES
  ('My Team', 'Team workspace', 'user-id');

-- Add members
INSERT INTO group_members (group_id, user_id, role) VALUES
  ((SELECT id FROM groups WHERE name = 'My Team'), 'user-id', 'owner'),
  ((SELECT id FROM groups WHERE name = 'My Team'), 'other-user-id', 'member');

-- Query group with members
SELECT
  g.name,
  g.description,
  COUNT(gm.id) as member_count,
  json_agg(
    json_build_object(
      'user_id', gm.user_id,
      'role', gm.role
    )
  ) as members
FROM groups g
LEFT JOIN group_members gm ON gm.group_id = g.id
WHERE g.id = 'group-id'
GROUP BY g.id;
```

---

## Performance Testing

```sql
-- Check index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Check slow queries
SELECT
  mean_exec_time,
  calls,
  query
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat%'
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check table sizes
SELECT
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **Database Design:** https://supabase.com/docs/guides/database/design

---

## Get Help

If you run into issues:

1. Check the [DATABASE_MIGRATION_GUIDE.md](./DATABASE_MIGRATION_GUIDE.md)
2. Review [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
3. Check Supabase Discord: https://discord.supabase.com
4. Search Supabase Discussions: https://github.com/supabase/supabase/discussions
