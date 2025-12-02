# How to Add This Project to GitHub

Follow these steps to create a GitHub repository and push your code.

## Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer (check with `git --version`)

## Step-by-Step Instructions

### Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `nevada-license-defense` (or your preferred name)
   - **Description**: "Professional license defense website built with Next.js"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 2: Initialize Git in Your Project

Open your terminal/command prompt in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Nevada License Defense website"
```

### Step 3: Connect to GitHub and Push

After creating the repository on GitHub, you'll see a page with instructions. Use these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nevada-license-defense.git

# Rename the default branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password (or personal access token).

## Using GitHub Desktop (Easier Option)

If you prefer a graphical interface:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click **"File" → "Add Local Repository"**
4. Browse to your project folder: `C:\Users\Employee 6\Desktop\cursor practice`
5. Click **"Publish repository"** in GitHub Desktop
6. Choose a name and visibility, then click **"Publish Repository"**

## Important Notes

### Environment Variables

Your `.env.local` file is already in `.gitignore`, so it won't be uploaded. However, you should:

1. Create a `.env.example` file (or document) with placeholder values
2. Document required environment variables in your README

### What Gets Uploaded

The following will **NOT** be uploaded (already in `.gitignore`):
- `node_modules/` - Dependencies (users will run `npm install`)
- `.next/` - Build files
- `.env*.local` - Your local environment variables
- Build artifacts and cache files

### After Pushing

1. **Add a README**: Update the README.md with project description, setup instructions, etc.
2. **Add a License**: If you want to add a license file
3. **Set up GitHub Pages** (optional): If you want to host the site on GitHub Pages
4. **Add collaborators** (optional): If working with a team

## Troubleshooting

### If you get authentication errors:

GitHub no longer accepts passwords. You need a **Personal Access Token**:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Give it a name and select scopes: `repo` (full control)
4. Copy the token and use it as your password when pushing

### If you need to update the remote URL:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
```

### If you want to check your remote:

```bash
git remote -v
```

## Next Steps After Uploading

1. **Clone on another machine**: `git clone https://github.com/YOUR_USERNAME/nevada-license-defense.git`
2. **Make changes**: Edit files, then `git add .`, `git commit -m "message"`, `git push`
3. **Pull updates**: `git pull` to get the latest changes
4. **Create branches**: `git checkout -b feature-name` for new features

## Quick Reference Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log
```

