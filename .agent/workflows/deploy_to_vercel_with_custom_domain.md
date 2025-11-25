---
description: How to deploy the Next.js blog to Vercel and configure a custom domain
---

# Deploying to Vercel with a Custom Domain

This guide explains how to deploy your Next.js application to Vercel and connect your own domain name.

## Prerequisites
- A GitHub, GitLab, or Bitbucket account.
- A Vercel account (can be created with your Git account).
- A domain name purchased from a registrar (e.g., Google Domains, GoDaddy, Onamae.com).

## Step 1: Push Code to a Git Repository

1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub (or your preferred provider).
3.  Link your local repository to the remote one and push:
    ```bash
    git remote add origin <your-repository-url>
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel

1.  Log in to [Vercel](https://vercel.com).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the Git repository you just created.
4.  In the "Configure Project" screen:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `./` (default).
    - Click **"Deploy"**.
5.  Wait for the build to complete. Your site is now live on a `*.vercel.app` domain.

## Step 3: Configure Custom Domain

1.  Go to your project dashboard on Vercel.
2.  Click on **"Settings"** -> **"Domains"**.
3.  Enter your custom domain (e.g., `example.com`) in the input field and click **"Add"**.
4.  Choose the recommended option (usually adding both `example.com` and `www.example.com`).

## Step 4: Update DNS Records

Vercel will provide you with the necessary DNS records to add to your domain registrar.

1.  Log in to your domain registrar's console (where you bought the domain).
2.  Find the DNS settings (sometimes called "DNS Management" or "Name Server Settings").
3.  Add the records shown in Vercel. Typically:
    - **Type**: `A`
    - **Name**: `@` (or blank)
    - **Value**: `76.76.21.21` (Vercel's IP)
    - **Type**: `CNAME`
    - **Name**: `www`
    - **Value**: `cname.vercel-dns.com`
4.  Save the changes.

> [!NOTE]
> DNS propagation can take anywhere from a few minutes to 24 hours. Vercel will automatically provision an SSL certificate (HTTPS) once the DNS is verified.

## Step 5: Verify

Visit your custom domain in a browser. You should see your AFBlog live!
