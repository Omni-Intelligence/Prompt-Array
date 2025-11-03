import { HomeLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WhyFree() {
  return (
    <HomeLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent">
          Why is Prompt Array Free?
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We believe in making AI prompt engineering accessible to everyone. Here's why we've chosen to make Prompt Array completely free:
          </p>

          <div className="space-y-8 mb-16">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Democratizing AI Development
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our mission is to empower developers, creators, and businesses of all sizes to harness the power of AI. By removing financial barriers, we ensure that innovative AI solutions are accessible to everyone, not just large enterprises.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Community-Driven Growth
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that a strong, engaged community is more valuable than subscription revenue. Your participation, feedback, and shared prompts help make Prompt Array better for everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Focus on Innovation
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Instead of focusing on monetization, we're dedicated to building the best possible platform for prompt engineering. This allows us to innovate faster and respond to community needs more effectively.
              </p>
            </section>
          </div>

          {/* How We Support Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">How We Support Prompt Array</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
              While Prompt Array remains free, we offer premium services and solutions for businesses looking to leverage our expertise and technology:
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Custom AI Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We build incredible applications leveraging the latest AI technologies, tailored to your specific needs and opportunities.
                </p>
                <Button variant="outline" className="w-full" onClick={() => window.open('https://omniintelligence.co/', '_blank')}>
                  Learn More
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">White Label Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get your own customized version of Prompt Array for internal use, with features tailored to your organization's needs.
                </p>
                <Button variant="outline" className="w-full" onClick={() => window.open('https://omniintelligence.co/', '_blank')}>
                  Learn More
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">App Idea Engine</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Explore our other innovative technologies, including our App Idea Engine for generating new application concepts.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </Card>
            </div>
          </div>

          <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h2 className="text-2xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
              Join Our Community
            </h2>
            <p className="text-purple-800 dark:text-purple-200">
              Start creating and sharing prompts today. Your contributions help make AI more accessible and effective for everyone.
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
