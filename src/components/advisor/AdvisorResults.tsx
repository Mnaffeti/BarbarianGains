import type { SupplementRecommendationOutput } from "@/ai/flows/supplement-recommendation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface AdvisorResultsProps {
  recommendations: SupplementRecommendationOutput;
}

export default function AdvisorResults({ recommendations }: AdvisorResultsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-semibold text-center text-primary">
        Your Personalized Supplement Plan
      </h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-headline">
            <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
            Recommended Supplements
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>{recommendations.recommendations}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-headline">
            <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
            Dosage Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>{recommendations.dosageInstructions}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-headline">
            <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
            Supplement Pairings
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>{recommendations.supplementPairings}</p>
        </CardContent>
      </Card>
    </div>
  );
}
