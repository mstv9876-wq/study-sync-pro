import { supabase } from "@/integrations/supabase/client";

export interface BuddySuggestion {
  user_id: string;
  display_name: string;
  interests: string[];
  focus_score: number;
  total_study_time: number;
}

export const findStudyBuddies = async (
  currentUserId: string,
  userInterests: string[]
): Promise<BuddySuggestion[]> => {
  if (!userInterests.length) return [];

  const { data } = await supabase
    .from("profiles")
    .select("user_id, display_name, interests, focus_score, total_study_time")
    .neq("user_id", currentUserId)
    .overlaps("interests", userInterests)
    .order("focus_score", { ascending: false })
    .limit(10);

  return (data as BuddySuggestion[]) || [];
};
