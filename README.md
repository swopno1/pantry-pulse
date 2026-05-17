# 🥗 PantryPulse

**PantryPulse** is a "Bring Your Own Key" (BYOK) AI-powered recipe generator. It allows users to input their leftover ingredients and generate custom recipes using their own OpenAI or Gemini API keys.

Built with privacy and cost-efficiency in mind, PantryPulse stores all sensitive data locally in the browser and requires no server-side processing.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pantrypulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## 🏗️ Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will generate a `dist` folder containing the static assets ready for deployment. You can test the build locally using:

```bash
npm run preview
```

---

## ☁️ Deployment to Render

PantryPulse is a static application and can be easily deployed to [Render](https://render.com/) as a **Static Site**.

### Steps to Deploy

1. **Create a New Static Site**
   - Log in to your Render Dashboard.
   - Click **New +** and select **Static Site**.
   - Connect your GitHub or GitLab repository.

2. **Configure Your Build Settings**
   - **Name:** `pantrypulse` (or your preferred name)
   - **Branch:** `main`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

3. **Deploy**
   - Click **Create Static Site**. Render will automatically build and deploy your application.

4. **Environment Variables (Optional)**
   - Since PantryPulse is BYOK, you **do not** need to provide API keys in Render's environment variables. Users will enter their keys directly into the app, which are stored securely in their browser's `localStorage`.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Inter (Body), Playfair Display (Headings)

---

## 📄 License

Distributed under the MIT License.
