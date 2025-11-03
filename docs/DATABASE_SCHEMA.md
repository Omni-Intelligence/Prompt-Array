# Database Schema Reference

## Schema Overview

This document provides a visual reference for the simplified database schema.

### Entity Relationship Diagram

```
┌─────────────────────┐
│   auth.users        │ (Supabase managed)
│ ─────────────────── │
│ id (UUID) PK        │
│ email               │
│ encrypted_password  │
│ created_at          │
└─────────────────────┘
          │
          │ 1:1
          ▼
┌─────────────────────┐
│   user_profiles     │
│ ─────────────────── │
│ id (UUID) PK/FK     │────┐
│ bio                 │    │
│ website             │    │
│ social_links (JSON) │    │
│ avatar_url          │    │
└─────────────────────┘    │
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          │ 1:N             │ 1:N             │ 1:N
          ▼                 ▼                 ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│      folders        │   │      prompts        │   │       chains        │
│ ─────────────────── │   │ ─────────────────── │   │ ─────────────────── │
│ id (UUID) PK        │   │ id (UUID) PK        │   │ id (UUID) PK        │
│ user_id (UUID) FK   │   │ user_id (UUID) FK   │   │ user_id (UUID) FK   │
│ parent_id (UUID) FK │◄──│ folder_id (UUID) FK │   │ title               │
│ name                │   │ group_id (UUID) FK  │   │ description         │
│ path                │   │ title               │   └─────────────────────┘
└─────────────────────┘   │ content             │             │
                          │ description         │             │ 1:N
                          │ tags[]              │             ▼
                          │ is_public           │   ┌─────────────────────┐
                          │ is_template         │   │   chain_prompts     │
                          │ template_category   │   │ ─────────────────── │
                          │ forked_from (UUID)  │──┐│ id (UUID) PK        │
                          │ version             │  ││ chain_id (UUID) FK  │
                          │ deleted_at          │  ││ prompt_id (UUID) FK │─┐
                          └─────────────────────┘  ││ sequence_order      │ │
                                    │              │└─────────────────────┘ │
                                    │              │                        │
                                    │ 1:N          │                        │
                                    ▼              │            ┌───────────┘
                          ┌─────────────────────┐  │            │
                          │  prompt_versions    │  │            │
                          │ ─────────────────── │  │            │
                          │ id (UUID) PK        │  │            │
                          │ prompt_id (UUID) FK │──┘            │
                          │ version_number      │               │
                          │ title               │               │
                          │ content             │               │
                          │ change_description  │◄──────────────┘
                          │ created_by (UUID)   │
                          └─────────────────────┘
                                    │
          ┌─────────────────────────┘
          │
          │ N:M via favorites
          ▼
┌─────────────────────┐
│      favorites      │
│ ─────────────────── │
│ id (UUID) PK        │
│ user_id (UUID) FK   │
│ prompt_id (UUID) FK │
└─────────────────────┘


┌─────────────────────┐
│       groups        │
│ ─────────────────── │
│ id (UUID) PK        │
│ name                │
│ description         │
│ avatar              │
│ created_by (UUID)FK │───┐
└─────────────────────┘   │
          │               │
          │ 1:N           │
          ▼               │
┌─────────────────────┐   │
│   group_members     │   │
│ ─────────────────── │   │
│ id (UUID) PK        │   │
│ group_id (UUID) FK  │───┘
│ user_id (UUID) FK   │───────┐
│ role                │       │
└─────────────────────┘       │
                              │
                              │
                              │
┌─────────────────────┐       │
│   subscriptions     │       │
│ ─────────────────── │       │
│ id (UUID) PK        │       │
│ user_id (UUID) FK   │───────┘
│ stripe_customer_id  │
│ stripe_subscription │
│ stripe_price_id     │
│ status              │
│ current_period_end  │
│ trial_end           │
└─────────────────────┘
```

## Table Details

### Core Tables

#### user_profiles
Extended profile information for authenticated users.

**Key Points:**
- Primary key references `auth.users(id)`
- 1:1 relationship with Supabase auth users
- JSON field for flexible social links

**Common Queries:**
```sql
-- Get user profile with auth info
SELECT u.email, p.bio, p.website
FROM auth.users u
JOIN user_profiles p ON p.id = u.id
WHERE u.id = 'user-uuid';
```

#### folders
Hierarchical folder structure for organizing prompts.

**Key Points:**
- Self-referencing `parent_id` for nested folders
- Materialized `path` field for efficient queries
- Cascade deletes remove child folders

**Common Queries:**
```sql
-- Get folder tree
WITH RECURSIVE folder_tree AS (
  SELECT id, name, path, parent_id, 0 as level
  FROM folders
  WHERE parent_id IS NULL AND user_id = 'user-uuid'

  UNION ALL

  SELECT f.id, f.name, f.path, f.parent_id, ft.level + 1
  FROM folders f
  JOIN folder_tree ft ON f.parent_id = ft.id
)
SELECT * FROM folder_tree ORDER BY path;
```

#### groups
Collaborative workspaces for team prompt management.

**Key Points:**
- Created by a user (`created_by`)
- Members managed via `group_members` table
- Prompts can belong to groups

**Common Queries:**
```sql
-- Get user's groups with member count
SELECT g.*, COUNT(gm.id) as member_count
FROM groups g
LEFT JOIN group_members gm ON gm.group_id = g.id
WHERE g.id IN (
  SELECT group_id FROM group_members WHERE user_id = 'user-uuid'
)
GROUP BY g.id;
```

#### group_members
Junction table with role-based access control.

**Key Points:**
- Roles: `owner`, `admin`, `member`
- Unique constraint on (group_id, user_id)
- Used in RLS policies for access control

#### prompts
Main content table for prompts and templates.

**Key Points:**
- Soft deletes via `deleted_at`
- Self-referencing for forked prompts
- Full-text search indexes on title/content
- Version tracking via `version` field

**Common Queries:**
```sql
-- Get user's prompts with relationships
SELECT
  p.*,
  f.name as folder_name,
  g.name as group_name,
  COALESCE(pv.version_count, 0) as version_count,
  EXISTS(SELECT 1 FROM favorites WHERE prompt_id = p.id AND user_id = 'user-uuid') as is_favorite
FROM prompts p
LEFT JOIN folders f ON f.id = p.folder_id
LEFT JOIN groups g ON g.id = p.group_id
LEFT JOIN (
  SELECT prompt_id, COUNT(*) as version_count
  FROM prompt_versions
  GROUP BY prompt_id
) pv ON pv.prompt_id = p.id
WHERE p.user_id = 'user-uuid' AND p.deleted_at IS NULL
ORDER BY p.updated_at DESC;
```

#### prompt_versions
Version history with change tracking.

**Key Points:**
- Auto-incrementing `version_number` per prompt
- Immutable history (no updates after creation)
- Tracks who made the change via `created_by`

**Common Queries:**
```sql
-- Get version history for a prompt
SELECT
  pv.*,
  u.email as created_by_email
FROM prompt_versions pv
JOIN auth.users u ON u.id = pv.created_by
WHERE pv.prompt_id = 'prompt-uuid'
ORDER BY pv.version_number DESC;
```

#### chains
Sequential collections of prompts for workflows.

**Key Points:**
- Owned by a user
- Prompts ordered via `chain_prompts` table
- Can reference any accessible prompt

**Common Queries:**
```sql
-- Get chain with all prompts in order
SELECT
  c.*,
  json_agg(
    json_build_object(
      'id', p.id,
      'title', p.title,
      'content', p.content,
      'sequence_order', cp.sequence_order
    ) ORDER BY cp.sequence_order
  ) as prompts
FROM chains c
JOIN chain_prompts cp ON cp.chain_id = c.id
JOIN prompts p ON p.id = cp.prompt_id
WHERE c.id = 'chain-uuid'
GROUP BY c.id;
```

#### chain_prompts
Junction table linking chains and prompts.

**Key Points:**
- Unique constraint on (chain_id, sequence_order)
- Allows reordering without changing IDs
- Cascade deletes when chain or prompt deleted

#### favorites
User bookmarks for quick access.

**Key Points:**
- Simple many-to-many relationship
- Unique constraint prevents duplicates
- Indexed for fast lookups

#### subscriptions
Stripe subscription tracking.

**Key Points:**
- One active subscription per user (enforced by trigger)
- Status enum for Stripe states
- Indexed on expiration dates for reminders

**Common Queries:**
```sql
-- Get active subscriptions expiring soon
SELECT
  s.*,
  u.email
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.status = 'active'
AND s.current_period_end < NOW() + INTERVAL '7 days'
ORDER BY s.current_period_end;
```

## Indexes

### Performance-Critical Indexes

```sql
-- Most frequently used indexes
prompts_user_id_idx              -- Filter by owner
prompts_is_public_idx            -- Public gallery
prompts_updated_at_idx           -- Recent prompts
prompts_tags_idx (GIN)           -- Tag search
prompts_title_trgm_idx (GIN)     -- Full-text search
prompts_content_trgm_idx (GIN)   -- Content search

folders_user_id_idx              -- User's folders
folders_path_idx                 -- Hierarchy queries

groups_created_by_idx            -- User's groups
group_members_user_id_idx        -- User's memberships
group_members_group_id_idx       -- Group's members

chains_user_id_idx               -- User's chains
chain_prompts_chain_id_idx       -- Chain's prompts

favorites_user_id_idx            -- User's favorites
favorites_prompt_id_idx          -- Prompt popularity

subscriptions_user_id_idx        -- User's subscription
subscriptions_status_idx         -- Active subscriptions
subscriptions_current_period_end -- Expiring subscriptions
```

## Row Level Security (RLS)

All tables have RLS enabled. Key policies:

### prompts
- ✅ Users can view their own prompts
- ✅ Anyone can view public prompts
- ✅ Group members can view group prompts
- ✅ Users can only modify their own prompts

### groups & group_members
- ✅ Members can view groups they belong to
- ✅ Owners can manage group settings
- ✅ Owners/admins can manage members

### chains & chain_prompts
- ✅ Users can only manage their own chains
- ✅ Chain prompts inherit chain permissions

### favorites
- ✅ Users can only manage their own favorites

### subscriptions
- ✅ Users can view their own subscription
- ✅ Service role can manage all (for webhooks)

## Data Types

### UUIDs
All primary keys and foreign keys use UUID v4.

### Timestamps
All timestamps use `TIMESTAMP WITH TIME ZONE` in UTC.

### Arrays
- `tags`: `TEXT[]` - Array of tag strings
- Full GIN index for fast lookups

### JSONB
- `social_links`: Flexible key-value pairs
- Queryable with `->` and `->>` operators

## Triggers

### Automatic Timestamps
`update_updated_at_column()` trigger maintains `updated_at` on:
- user_profiles
- folders
- groups
- group_members
- prompts
- chains
- subscriptions

### Business Logic
- `check_single_active_subscription()` - Prevents multiple active subscriptions
- `set_prompt_version_number()` - Auto-increments version numbers

## Constraints

### Check Constraints
- String length validations (titles, names must be non-empty)
- Numeric constraints (version > 0, sequence_order >= 0)
- Enum constraints (group roles, subscription status)

### Unique Constraints
- (group_id, user_id) - One membership per user per group
- (user_id, prompt_id) - One favorite per user per prompt
- (chain_id, sequence_order) - Unique ordering in chains
- (prompt_id, version_number) - Unique version numbers

### Foreign Key Constraints
All foreign keys use appropriate `ON DELETE` actions:
- `CASCADE` - Delete dependent records
- `SET NULL` - Preserve record but clear reference
- `RESTRICT` - Prevent deletion if references exist

## Migration Strategy

See [DATABASE_MIGRATION_GUIDE.md](./DATABASE_MIGRATION_GUIDE.md) for detailed migration instructions.

## Query Examples

### Get User Dashboard Data

```sql
-- Single query to populate user dashboard
SELECT
  (SELECT COUNT(*) FROM prompts WHERE user_id = 'uuid' AND deleted_at IS NULL) as total_prompts,
  (SELECT COUNT(*) FROM folders WHERE user_id = 'uuid') as total_folders,
  (SELECT COUNT(*) FROM chains WHERE user_id = 'uuid') as total_chains,
  (SELECT COUNT(*) FROM group_members WHERE user_id = 'uuid') as total_groups,
  (SELECT COUNT(*) FROM favorites WHERE user_id = 'uuid') as total_favorites,
  (SELECT COUNT(*) FROM prompts WHERE user_id = 'uuid' AND is_public = true AND deleted_at IS NULL) as public_prompts,
  (SELECT status FROM subscriptions WHERE user_id = 'uuid' ORDER BY created_at DESC LIMIT 1) as subscription_status;
```

### Search Prompts

```sql
-- Full-text search with filters
SELECT
  p.*,
  f.name as folder_name,
  ts_rank(
    to_tsvector('english', p.title || ' ' || p.content),
    plainto_tsquery('english', 'search query')
  ) as rank
FROM prompts p
LEFT JOIN folders f ON f.id = p.folder_id
WHERE
  p.deleted_at IS NULL
  AND (
    p.user_id = 'user-uuid' OR
    p.is_public = true OR
    p.group_id IN (SELECT group_id FROM group_members WHERE user_id = 'user-uuid')
  )
  AND (
    to_tsvector('english', p.title || ' ' || p.content) @@ plainto_tsquery('english', 'search query')
    OR 'tag' = ANY(p.tags)
  )
ORDER BY rank DESC, p.updated_at DESC
LIMIT 50;
```

### Get Group Activity

```sql
-- Recent prompts in user's groups
SELECT
  p.*,
  g.name as group_name,
  u.email as author_email,
  up.avatar_url as author_avatar
FROM prompts p
JOIN groups g ON g.id = p.group_id
JOIN auth.users u ON u.id = p.user_id
LEFT JOIN user_profiles up ON up.id = u.id
WHERE g.id IN (
  SELECT group_id FROM group_members WHERE user_id = 'user-uuid'
)
AND p.deleted_at IS NULL
ORDER BY p.created_at DESC
LIMIT 20;
```

## Performance Tips

1. **Use indexes wisely** - All common query patterns are indexed
2. **Leverage RLS** - Don't duplicate access checks in application
3. **Batch operations** - Use transactions for related inserts/updates
4. **Materialized views** - Consider for complex analytics
5. **Pagination** - Always use LIMIT/OFFSET or cursor-based pagination
6. **Connection pooling** - Use Supabase's built-in Supavisor

## Need More?

- Review [DATABASE_MIGRATION_GUIDE.md](./DATABASE_MIGRATION_GUIDE.md) for migration steps
- Check [Supabase Database Docs](https://supabase.com/docs/guides/database)
- See [RLS Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
