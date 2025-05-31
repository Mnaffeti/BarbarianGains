"use server";

import { recommendSupplements, SupplementRecommendationInput, SupplementRecommendationOutput } from "@/ai/flows/supplement-recommendation";
import { z } from "zod";

const AdvisorFormSchema = z.object({
  fitnessGoals: z.string().min(10, "Please describe your fitness goals in more detail (at least 10 characters)."),
  dietaryRestrictions: z.string().min(3, "Please specify dietary restrictions or type 'none' (at least 3 characters)."),
});

export type AdvisorFormState = {
  message?: string | null;
  recommendations?: SupplementRecommendationOutput | null;
  errors?: {
    fitnessGoals?: string[];
    dietaryRestrictions?: string[];
    server?: string[];
  };
  success: boolean;
};

export async function getSupplementAdvice(
  prevState: AdvisorFormState,
  formData: FormData
): Promise<AdvisorFormState> {
  const validatedFields = AdvisorFormSchema.safeParse({
    fitnessGoals: formData.get("fitnessGoals"),
    dietaryRestrictions: formData.get("dietaryRestrictions"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
      success: false,
    };
  }

  const inputData: SupplementRecommendationInput = validatedFields.data;

  try {
    const recommendations = await recommendSupplements(inputData);
    return {
      recommendations,
      message: "Here are your personalized supplement recommendations!",
      success: true,
    };
  } catch (error) {
    console.error("Error getting supplement advice:", error);
    return {
      message: "An error occurred while generating recommendations. Please try again later.",
      errors: { server: ["Failed to connect to the AI advisor."] },
      success: false,
    };
  }
}
