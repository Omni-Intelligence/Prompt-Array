import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FEATURES } from '@/config/features';

export function BillingSection() {
  // Subscriptions removed - app is now completely free
  if (!FEATURES.PAYMENTS_ENABLED) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan</CardTitle>
        <CardDescription>Prompt Array is completely free to use</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Current Plan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Free Plan - Unlimited prompts
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
