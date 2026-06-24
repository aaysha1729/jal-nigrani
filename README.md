# 💧 जल निगरानी | Jal Nigrani

> **Rural Water Quality & Supply Monitoring System**
> Developed under the Jal Jeevan Mission initiative to ensure clean, safe, and adequate water supply to rural communities through real-time monitoring and analytics.

---

## 🚀 Live Demo
The application is deployed on GitHub Pages:
🔗 **[https://aaysha1729.github.io/jal-nigrani/](https://aaysha1729.github.io/jal-nigrani/)**

---

## 🌟 Key Features

- **Real-Time Dashboards**: Interactive data visualization showing water quality parameters (pH, Turbidity, Chlorine), pressure, and flow rates.
- **Role-Based Access Control**:
  - **District Officers**: High-level regional monitoring, analytical reports, and system configuration.
  - **Jal Bahinis (Local Operators)**: Village-level daily tracking, report submissions, pipeline monitoring, and alert resolution.
  - **Villagers (Public View)**: Simple, bilingual status check on water availability, purity, and active maintenance schedules.
- **Pipeline Monitoring**: Node-by-node status tracking of rural water distribution pipelines with pressure leak indicators.
- **Reporting & Ticketing**: Easy-to-use issue reporter for citizens and local operators to flag contaminants, leakage, or supply cuts.
- **Bilingual Interface**: Designed for local communities with dual Hindi & English localization support.

---

## 🔑 Role-Based Access & Test Credentials

The application uses role-based authentication to serve different dashboards and views depending on the user. Access the respective pages using the mock credentials below:

| Role | Username | Password | Access / Redirects To | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Villager** | `villager1` | `pass123` | `/village-status` | View public status of water availability and quality reports in the village. |
| **Jal Bahini** | `jalbahini1` | `pass123` | `/dashboard` | Monitor local pipeline sensors, submit logs, track alerts, and submit reports. |
| **District Officer** | `officer1` | `pass123` | `/officer-dashboard` | Manage regional datasets, review district-wide metrics, and configure alerts. |

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, TypeScript
- **Build Tooling**: Vite 8, PostCSS, Autoprefixer
- **Styling**: Tailwind CSS v4
- **Charts & Graphs**: Recharts
- **Routing**: React Router v7
- **Hosting Options**: GitHub Pages (via GitHub Actions), Firebase Hosting, Vercel

---

## 📁 Project Structure

```text
jal-nigrani/
├── .github/workflows/   # CI/CD deployment pipelines (GitHub Pages)
├── public/              # Static assets (Favicons, 404 handler)
├── src/
│   ├── components/      # Reusable UI components (Sidebar, TopBar, MetricCards)
│   ├── context/         # React Contexts (Auth state)
│   ├── pages/           # Page views (LoginPage, VillagerView, Dashboards)
│   ├── App.jsx          # Root component & React Router configuration
│   └── main.jsx         # Application entry point
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite bundler configuration
```

---

## 💻 Local Development

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/aaysha1729/jal-nigrani.git
cd jal-nigrani
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
To build the application for general hosting (Vercel/Firebase):
```bash
npm run build
```

To test the GitHub Pages production build locally:
```bash
GITHUB_PAGES=true npm run build
```

---

## 🌐 Deploying to GitHub Pages (CI/CD)

This project has an automated GitHub Actions pipeline configured in `.github/workflows/deploy.yml`. 

To set up deployment on your repository:
1. Go to your repository settings on GitHub (**Settings** > **Pages**).
2. Set **Build and deployment** > **Source** to **GitHub Actions**.
3. Push new changes to the `main` branch. GitHub Actions will automatically compile the code and update the site.
