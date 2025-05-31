"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSupplementAdvice, AdvisorFormState } from "@/app/advisor/actions";
import AdvisorResults from "./AdvisorResults";
import { AlertCircle, Loader2 } from "lucide-react";

const initialState: AdvisorFormState = {
  message: null,
  recommendations: null,
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Advice...
        </>
      ) : (
        "Get Personalized Advice"
      )}
    </Button>
  );
}

export default function AdvisorForm() {
  const [state, formAction] = useFormState(getSupplementAdvice, initialState);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Personalized Supplement Advisor</CardTitle>
        <CardDescription>
          Tell us about your fitness goals and dietary needs, and our AI will provide tailored supplement recommendations.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="fitnessGoals" className="text-base font-medium">Fitness Goals</Label>
            <Textarea
              id="fitnessGoals"
              name="fitnessGoals"
              placeholder="e.g., Build lean muscle, improve endurance for marathon training, lose 10 lbs of fat while preserving muscle."
              rows={4}
              className="mt-1"
              aria-describedby="fitnessGoals-error"
            />
            {state.errors?.fitnessGoals && (
              <div id="fitnessGoals-error" className="text-sm text-destructive mt-1">
                {state.errors.fitnessGoals.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="dietaryRestrictions" className="text-base font-medium">Dietary Restrictions</Label>
            <Textarea
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              placeholder="e.g., Vegetarian, gluten-free, allergic to shellfish, none."
              rows={3}
              className="mt-1"
              aria-describedby="dietaryRestrictions-error"
            />
             {state.errors?.dietaryRestrictions && (
              <div id="dietaryRestrictions-error" className="text-sm text-destructive mt-1">
                {state.errors.dietaryRestrictions.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {state.message && !state.success && state.errors?.server && (
             <Alert variant="destructive">
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>Error</AlertTitle>
               <AlertDescription>{state.message}</AlertDescription>
             </Alert>
           )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>

      {state.success && state.recommendations && (
        <div className="mt-8 p-6 border-t">
          <AdvisorResults recommendations={state.recommendations} />
        </div>
      )}
    </Card>
  );
}
