ThankYouPodcast/
├── ChatIntegration.API/     # .NET SignalR backend
│   ├── Hubs/
│   ├── Models/
│   ├── Properties/
│   ├── Services/
│   ├── Program.cs
│   ├── appsettings.json
│   └── ChatIntegration.API.csproj
├── client/                  # React frontend
│   ├── src/
│   ├── index.html
│   └── ...other React files
├── server/                  # Node.js API server
│   ├── chat-bots.ts
│   ├── index.ts
│   ├── routes.ts
│   └── ...other server files
├── shared/                  # Shared TypeScript types
│   └── schema.ts
├── package.json            # IMPORTANT: Must be in root folder
├── tsconfig.json
├── vite.config.ts
└── ChatIntegration.sln
```

## Setup Steps

### 1. Create Project Structure
1. Create a new folder named "ThankYouPodcast"
2. Copy these files to the root folder (ThankYouPodcast/):
   - package.json
   - tsconfig.json
   - vite.config.ts
   - ChatIntegration.sln
   - All other configuration files

### 2. Install Dependencies
1. Open terminal in ThankYouPodcast folder
2. Run:
   ```bash
   npm install
   ```

### 3. Start Development Server
1. In the same terminal:
   ```bash
   npm run dev