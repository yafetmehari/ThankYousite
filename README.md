ThankYouPodcast/
├── ChatIntegration.API/     # .NET SignalR backend
│   ├── Hubs/
│   │   └── ChatHub.cs
│   ├── Models/
│   │   └── ChatMessage.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Services/
│   │   ├── YouTubeChatService.cs
│   │   └── DiscordChatService.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── ChatIntegration.API.csproj
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
├── server/                  # Node.js API server
│   ├── chat-bots.ts
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/                  # Shared TypeScript types
│   └── schema.ts
├── package.json            # IMPORTANT: Must be in root folder
├── tsconfig.json
├── vite.config.ts
├── theme.json
├── tailwind.config.ts
├── postcss.config.js
└── ChatIntegration.sln

```

## Setup Instructions

### 1. Create Base Directory
1. Create a new folder named "ThankYouPodcast"
2. Open Command Prompt or Terminal
3. Navigate to where you want to create the project:
   ```bash
   cd C:\Users\YourUsername\Desktop
   mkdir ThankYouPodcast
   cd ThankYouPodcast
   ```

### 2. Copy Configuration Files
First, copy these files to the root folder (ThankYouPodcast/):
- package.json
- tsconfig.json
- vite.config.ts
- theme.json
- tailwind.config.ts
- postcss.config.js
- ChatIntegration.sln
- drizzle.config.ts

### 3. Create Subdirectories
Create these folders with their respective files:
```bash
mkdir ChatIntegration.API
mkdir client
mkdir server
mkdir shared
```

### 4. Copy Source Files
1. Copy all .NET files into ChatIntegration.API/
2. Copy all React files into client/
3. Copy all server files into server/
4. Copy schema.ts into shared/

### 5. Verify Setup
Before running npm install, verify:
1. package.json is in the root folder
2. All config files (.ts, .json) are in the root
3. Each subdirectory contains its respective files
4. ChatIntegration.sln is in the root folder

### 6. Install Dependencies
Once structure is verified:
1. Open terminal in ThankYouPodcast folder
2. Run:
   ```bash
   npm install
   ```

### 7. Start Development
1. Start the development server:
   ```bash
   npm run dev