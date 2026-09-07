# Kasatria 3D Visualization

A 3D data visualization web application developed as part of the **Kasatria Software Developer Preliminary Assignment**.

The application is based on the [Three.js CSS3D Periodic Table example](https://threejs.org/examples/#css3d_periodictable) and has been customized to visualize people data retrieved dynamically from Google Sheets.

## Overview

The application visualizes **200 people records** as interactive 3D tiles.

Each tile represents a person and displays key information such as:

- Person name
- Net worth

Users can explore the dataset through four different 3D layouts:

- Table
- Sphere
- Helix
- Grid

The application also provides:

- Google authentication
- Google Sheets integration
- Net-worth-based tile coloring
- Search by name and country
- Interactive person details
- Mouse rotation and zoom
- Responsive visualization resizing

---

## Features

### Google Authentication

Users sign in through Google using **Google Identity Services**.

After signing in, the application requests authorization to read the configured Google Sheet.

### Google Sheets Integration

The visualization data is retrieved dynamically from Google Sheets using the **Google Sheets API**.

The 200 people records are not hardcoded into the application.

The Google Sheet contains the following fields:

| Field | Description |
|---|---|
| Name | Person's name |
| Photo | Person's photo URL |
| Age | Person's age |
| Country | Person's country |
| Interest | Person's interest |
| Net Worth | Person's net worth |

### Net Worth Visualization

Tile backgrounds are categorized according to Net Worth:

| Net Worth | Tile Color |
|---|---|
| Under $100K | Red |
| $100K – Under $200K | Orange |
| $200K and above | Green |

### Search

Users can search the dataset by:

- Person name
- Country

Matching tiles remain highlighted while non-matching tiles are visually de-emphasized.

### Person Details

Clicking a person tile opens a details panel containing:

- Photo
- Name
- Age
- Country
- Interest
- Net Worth

---

# 3D Visualization Layouts

## Table

The Table layout follows the assignment requirement:

**20 × 10**

With 200 records:

```text
20 × 10 = 200
```

The records are arranged across 20 columns and 10 rows.

## Sphere

All 200 records are distributed around a 3D sphere.

The layout supports interactive rotation and zooming.

## Double Helix

The default Three.js single Helix was modified into a **Double Helix** as required by the assignment.

The 200 records are distributed across two strands:

```text
100 records → Strand 1
100 records → Strand 2
```

The two strands use a phase offset to form the double-helix structure.

## Grid

The Grid layout follows the assignment requirement:

**5 × 4 × 10**

With 200 records:

```text
5 × 4 × 10 = 200
```

The records are distributed across three dimensions.

---

# Project Architecture

The project separates structure, styling, application logic, authentication, data access, visualization, and UI functionality into dedicated areas.

```text
Kasatria-3D-Visualization/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    │
    ├── app.js
    ├── config.js
    │
    ├── auth/
    │   └── googleAuth.js
    │
    ├── services/
    │   └── googleSheetsService.js
    │
    ├── visualization/
    │   ├── scene.js
    │   ├── tiles.js
    │   └── layouts.js
    │
    └── ui/
        ├── controls.js
        └── search.js
```

## Module Responsibilities

### `index.html`

Provides the application's HTML structure and loads the stylesheet and JavaScript entry point.

### `css/style.css`

Contains the application's styling and visual presentation.

Keeping CSS separate from HTML improves maintainability and keeps the HTML focused on document structure.

### `js/app.js`

The main application entry point and orchestration layer.

Responsible for:

- Initializing Google authentication
- Loading Google Sheet data
- Creating visualization tiles
- Creating layout targets
- Initializing layout controls
- Initializing search
- Starting the Three.js animation
- Displaying person details

### `js/config.js`

Contains application configuration including:

- Google OAuth Client ID
- Google Sheet ID
- Google Sheet range
- Google Sheets API scope

### `js/auth/googleAuth.js`

Handles Google authentication using Google Identity Services.

### `js/services/googleSheetsService.js`

Handles communication with the Google Sheets API and transforms spreadsheet rows into application data objects.

### `js/visualization/scene.js`

Responsible for the Three.js visualization environment, including:

- Scene
- Camera
- CSS3D renderer
- Trackball controls
- Animation loop
- Window resizing

### `js/visualization/tiles.js`

Creates the individual CSS3D person tiles and handles:

- Person information
- Net-worth-based backgrounds
- Tile creation
- Tile click events

### `js/visualization/layouts.js`

Creates target positions for:

- Table
- Sphere
- Double Helix
- Grid

### `js/ui/controls.js`

Handles layout button interactions.

### `js/ui/search.js`

Handles search functionality and visual filtering of the 3D tiles.

---

# Application Data Flow

```text
Google Sign-In
      │
      ▼
Google OAuth Authorization
      │
      ▼
Google Sheets API
      │
      ▼
Google Sheet
      │
      ▼
Data Transformation
      │
      ▼
Three.js CSS3D Objects
      │
      ├── Table
      ├── Sphere
      ├── Double Helix
      └── Grid
```

This separation keeps authentication, data retrieval, visualization, and UI responsibilities independent and maintainable.

---

# Technologies Used

- HTML5
- CSS3
- JavaScript ES Modules
- Three.js
- Three.js CSS3DRenderer
- Three.js TrackballControls
- Google Identity Services
- Google Sheets API
- Google Cloud OAuth
- GitHub Pages

---

# Local Development

## Prerequisites

- A modern web browser
- Visual Studio Code or another code editor
- A local web server
- A configured Google Cloud Project
- Access to the configured Google Sheet

## Run the Application

The application should be served through a web server.

Do not open `index.html` directly using:

```text
file:///
```

For local development, VS Code Live Server can be used.

Example:

```text
http://localhost:5500/index.html
```

## Google OAuth Configuration

The Google Cloud OAuth application must contain the authorized JavaScript origins for the environment being used.

For local development:

```text
http://localhost:5500
http://127.0.0.1:5500
```

For production, the production website origin must also be configured.

Example:

```text
https://<YOUR_USERNAME>.github.io
```

The repository path should not be included in the authorized JavaScript origin.

---

# Google Sheets Configuration

The application expects a worksheet named:

```text
Data Template
```

The expected columns are:

```text
Name | Photo | Age | Country | Interest | Net Worth
```

The application reads:

```text
Data Template!A:F
```

The Google Sheet must be accessible to the authenticated Google account.

---

# Security

The application uses Google OAuth to authorize access to the Google Sheet.

The Google OAuth Client ID is used by the frontend and is not a secret.

Sensitive credentials such as an OAuth Client Secret must never be committed to the repository or included in frontend JavaScript.

The application requests the read-only Google Sheets scope:

```text
https://www.googleapis.com/auth/spreadsheets.readonly
```

---

# Assignment Requirements

The implementation addresses the requirements specified in the Kasatria Software Developer Preliminary Assignment.

| # | Requirement | Status |
|---|---|---|
| 1 | Create Google Sheet, import supplied CSV and share with `lisa@kasatria.com` | Completed |
| 2 | Create webpage with Google login | Completed |
| 3 | Retrieve data from Google Sheet and populate the 3D visualization | Completed |
| 4 | Replace chemical elements with the supplied data | Completed |
| 5 | Color tiles based on Net Worth | Completed |
| 6 | Arrange data in Table, Sphere, Helix and Grid formats | Completed |
| 7 | Table arrangement: 20 × 10 | Completed |
| 8 | Double Helix instead of the default single Helix | Completed |
| 9 | Grid arrangement: 5 × 4 × 10 | Completed |
| 10 | Provide webpage URL | Pending deployment |

---

# Testing

The application has been tested for the following main user flows.

## Authentication

- Google Sign-In
- Google account selection
- Google Sheets authorization

## Data

- Google Sheet retrieval
- Loading 200 people records
- Data transformation
- Net Worth parsing

## Visualization

- Table layout
- Sphere layout
- Double Helix layout
- Grid layout
- 20 × 10 Table arrangement
- 5 × 4 × 10 Grid arrangement

## Interaction

- Search by name
- Search by country
- Tile selection
- Person details panel
- Mouse rotation
- Zoom
- Browser window resizing

---

# Reference

The visualization is based on the Three.js CSS3D Periodic Table example:

https://threejs.org/examples/#css3d_periodictable

The original periodic table visualization was adapted to display the supplied people dataset instead of chemical elements.

---

# Deployment

The application can be deployed as a static website using GitHub Pages.

Deployment steps:

1. Push the project to GitHub.
2. Enable GitHub Pages.
3. Configure the production Google OAuth JavaScript origin.
4. Verify Google authentication.
5. Verify Google Sheets authorization.
6. Test the application using the public URL.
7. Verify all four visualization layouts.

Production URL:

```text
https://<YOUR_USERNAME>.github.io/Kasatria-3D-Visualization/
```

---

# Author

**Kasatria Software Developer Preliminary Assignment**

**Kasatria 3D Visualization**
