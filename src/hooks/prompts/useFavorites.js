import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get all favorited prompts for the user
      const { data: favorites, error } = await supabase
        .from('prompts')
        .select(`
          *,
          favorites!inner(*),
          groups:group_id(
            id,
            name,
            description
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }

      if (!favorites) {
        return [];
      }

      // Group the favorites by their group
      const groupedFavorites = favorites.reduce((acc, prompt) => {
        const groupId = prompt.group_id || 'ungrouped';
        const group = prompt.groups || { id: 'ungrouped', name: 'Ungrouped', description: 'Prompts not assigned to any group' };
        
        if (!acc[groupId]) {
          acc[groupId] = {
            groupId: group.id,
            groupName: group.name,
            description: group.description,
            prompts: []
          };
        }
        
        acc[groupId].prompts.push({
          ...prompt,
          starred: true // These are all favorites
        });
        
        return acc;
      }, {});

      return Object.values(groupedFavorites);
    },
    retry: 1,
    refetchOnWindowFocus: true
  });
};
