/**
 * Supabase Query Patterns Reference
 * 
 * This file documents common query patterns used throughout the Prompt Array application.
 * These are reference templates - actual query implementations remain in src/services/
 * 
 * ============================================================================
 * PROMPTS QUERIES
 * ============================================================================
 */

/**
 * Pattern: Fetch user's prompts with pagination
 * 
 * Structure:
 * - Select: id, title, content, created_at, updated_at, user_id
 * - From: prompts table
 * - Filter: where user_id = current_user_id
 * - Order: by created_at DESC (newest first)
 * - Pagination: limit() and range() for offset-based pagination
 * 
 * Used in: usePrompts hook, Library page
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * Pattern: Search prompts by title/content
 * 
 * Structure:
 * - Select: id, title, snippet (first 200 chars of content)
 * - From: prompts table
 * - Filter: text search on title or content
 * - Filter: user_id = current_user_id
 * - Limit: 20 results
 * 
 * Used in: PromptDetail, search functionality
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * Pattern: Fetch single prompt with full details
 * 
 * Structure:
 * - Select: * (all columns)
 * - From: prompts table
 * - Filter: where id = prompt_id AND user_id = current_user_id
 * - Join: optional - tags, chains relationships
 * 
 * Used in: PromptDetail page
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * ============================================================================
 * GROUPS QUERIES
 * ============================================================================
 */

/**
 * Pattern: Fetch user's groups
 * 
 * Structure:
 * - Select: id, name, description, created_at, prompt_count
 * - From: groups table
 * - Filter: where user_id = current_user_id
 * - Relationships: count prompts per group
 * 
 * Used in: Groups page, GroupList component, Dashboard
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * Pattern: Fetch group details with associated prompts
 * 
 * Structure:
 * - Select: groups(id, name, description, created_at)
 * - Join: prompts on groups.id = prompts.group_id
 * - Filter: where group_id = selected_group_id
 * - Relationships: full prompt data per group
 * 
 * Used in: GroupDetail page
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * ============================================================================
 * CHAINS QUERIES
 * ============================================================================
 */

/**
 * Pattern: Fetch user's chains
 * 
 * Structure:
 * - Select: id, name, description, steps_count, created_at
 * - From: chains table
 * - Filter: where user_id = current_user_id
 * - Order: by created_at DESC
 * 
 * Used in: Chains page, ChainList component
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * Pattern: Fetch single chain with all steps and prompts
 * 
 * Structure:
 * - Select: chains(id, name, description, created_at)
 * - Join: chain_steps on chains.id = chain_steps.chain_id
 * - Join: prompts on chain_steps.prompt_id = prompts.id
 * - Order: by chain_steps.order ASC
 * - Relationships: full step and prompt details in order
 * 
 * Used in: ChainDetail page, ViewChain page
 * Cache strategy: QUERY_CONFIG.normal
 */

/**
 * ============================================================================
 * COMMON PATTERNS
 * ============================================================================
 */

/**
 * Pattern: Real-time subscription to user data
 * 
 * Structure:
 * - Subscribe to: specific table (prompts, groups, chains)
 * - Filter: where user_id = current_user_id
 * - Events: INSERT, UPDATE, DELETE
 * - Auto-refresh: cache invalidation on changes
 * 
 * Used in: Real-time updates across pages
 * Cache strategy: QUERY_CONFIG.live
 */

/**
 * Pattern: Error handling for auth-protected queries
 * 
 * Structure:
 * - Check: if user is authenticated
 * - Try/Catch: wrap all queries in error handling
 * - On 401: redirect to sign-in
 * - On 403: show permission error
 * - On 404: handle missing data gracefully
 * 
 * Used in: All query hooks
 * Cache strategy: varies by content
 */

export const SUPABASE_QUERY_PATTERNS = {
  prompts: {
    fetchUserPrompts: 'src/services/',
    searchPrompts: 'src/services/',
    fetchPromptDetail: 'src/services/',
  },
  groups: {
    fetchUserGroups: 'src/services/',
    fetchGroupDetail: 'src/services/',
  },
  chains: {
    fetchUserChains: 'src/services/',
    fetchChainDetail: 'src/services/',
  },
  realtime: {
    subscribeToPrompts: 'src/hooks/',
    subscribeToGroups: 'src/hooks/',
    subscribeToChains: 'src/hooks/',
  },
};
