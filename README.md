ThankYouPodcast/
├── ChatIntegration.API/     # .NET SignalR backend
├── client/                  # React frontend
├── server/                  # Node.js API server
├── shared/                  # Shared TypeScript types
├── package.json            # Node.js dependencies
└── ChatIntegration.sln
```

## Prerequisites
- Node.js 18 or later
- .NET 8.0 SDK
- Visual Studio 2022 or later

## Local Development Setup

### 1. Initial Setup
1. Create a folder named "ThankYouPodcast"
2. Copy ALL project files maintaining the exact folder structure shown above
3. **Important**: Ensure package.json is in the root folder (ThankYouPodcast/)

### 2. Frontend & Node.js API Setup
1. Open a terminal in the ThankYouPodcast folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev