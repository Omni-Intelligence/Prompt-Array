import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Receipt, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Payments
            </h1>
            <p className="text-muted-foreground">Manage your billing and subscriptions</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">Pro Plan</h3>
                  <p className="text-muted-foreground">$29/month</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                Billing Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Next billing date</p>
                  <p className="font-medium">March 1, 2024</p>
                </div>
                <Button variant="outline" className="w-full hover:bg-primary/10 hover:text-primary transition-colors">
                  Update Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">This month</p>
                  <p className="font-medium">1,234 prompts</p>
                </div>
                <Button variant="outline" className="w-full hover:bg-primary/10 hover:text-primary transition-colors">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: 'Feb 1, 2024', amount: '$29.00', status: 'Paid' },
                { date: 'Jan 1, 2024', amount: '$29.00', status: 'Paid' },
                { date: 'Dec 1, 2023', amount: '$29.00', status: 'Paid' },
              ].map((transaction, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50"
                >
                  <div>
                    <p className="font-medium">{transaction.date}</p>
                    <p className="text-sm text-muted-foreground">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;