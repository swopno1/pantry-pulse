files=("src/components/RecipeViewer.jsx" "src/components/IngredientInput.jsx" "src/components/RecipePreferences.jsx" "src/components/SettingsModal.jsx" "src/App.jsx" "src/index.css")
for file in "${files[@]}"; do
  echo "FILE: $file"
  cat "$file"
  echo "---END---"
done
