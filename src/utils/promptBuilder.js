/**
 * promptBuilder.js
 * Generates an optimized prompt for AI recipe generation.
 */

export const generateRecipePrompt = (ingredients, preferences) => {
  const { cuisine, style, spice } = preferences;

  const prompt = `
Act as a Master Zero-Waste Chef. Your mission is to create a recipe that primarily uses the following ingredients: ${ingredients.join(', ')}.

STAPLES: You may assume the user has access to basic staples: salt, oil, water, and black pepper. Do not assume any other ingredients.

PREFERENCES:
- Cuisine: ${cuisine}
- Cooking Style: ${style}
- Spice Level: ${spice}

OUTPUT SCHEMA (STRICT):
You must format your response using clean Markdown headers as follows:
# [Recipe Title]
## Quick Overview (Prep Time, Cook Time, Serving Size)
## Ingredients Needed (Bulleted list with exact measurements)
## Step-by-Step Instructions (Numbered list with clear, actionable steps)
## Chef's Zero-Waste Tip (A hint on saving leftovers or ingredient swaps)

CONSTRAINTS:
- Start your response immediately with '#'.
- Do not provide any introductory or concluding remarks.
- Provide only the recipe content.
`.trim();

  return prompt;
};
