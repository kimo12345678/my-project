### README

---

## **React Apollo Project**

This project is a **React** application that leverages **Apollo Client** to consume a GraphQL backend. It is styled using **Material-UI (MUI)** for global styles and **TailwindCSS** for custom layouts. The app showcases a **User Dashboard** with dynamic content for profile, personal, and financial information.

---

### **Features**

1. **GraphQL Integration**:
   - Uses Apollo Client for data fetching from a GraphQL server.
   - Fetches user data dynamically based on `userId`.

2. **Material-UI & TailwindCSS**:
   - Combines MUI for global styles (`CssBaseline`) with TailwindCSS for layout and utility classes.

3. **Reusable Components**:
   - **`UserCard`**: Displays user profile details and dynamically updates based on selected tabs (e.g., Personal, Financial).
   - **`ProfileCard`**: Renders user's profile with navigation buttons for different information tabs.
   - **`Sidebar`**: Navigation menu with interactive icons.
   - **`Header`**: Top navigation bar with breadcrumbs and action buttons (e.g., notifications, settings).
   - **`InformationCard`**: Displays user details across multiple tabs (e.g., Personal, Financial). Supports inline editing and saves updates via GraphQL mutation.

4. **Dynamic State Management**:
   - Implements `useState` hooks for interactive elements like tab selection and sidebar navigation.

5. **Responsive Design**:
   - Adapts to different screen sizes with modern CSS techniques.

---

### **Setup Instructions**

#### **1. Prerequisites**
- Node.js installed on your machine.
- A running GraphQL server at `http://localhost:4000/graphql`.

#### **2. Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/kimo12345678/my-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd my-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

#### **3. Run the App**
1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

### **File Structure**
```plaintext
src/
├── components/
│   ├── Header.tsx          # Top navigation bar
│   ├── InformationCard.tsx # Displays user details (not included in the example)
│   ├── ProfileCard.tsx     # User profile component with tabs
│   ├── Sidebar.tsx         # Sidebar navigation with icons
│   └── UserCard.tsx        # Main user details component
├── assets/
│   ├── logo.png            # Logo for sidebar
│   └── photo.jpg           # Placeholder for profile image
├── App.tsx                 # Main application entry point
└── index.tsx               # Renders the app
```

---

### **GraphQL Schema**
Ensure your GraphQL server supports the following query:

```graphql
query User($userId: Int!) {
  user(userId: $userId) {
    firstName
    fatherName
    grandfatherName
    familyName
    localizedName {
      firstName
      fatherName
      grandfatherName
      familyName
    }
    nationalId {
      idNumber
      expiryDate
    }
    maritalStatus {
      name
    }
    dependants
    contactInfo {
      email
      mobile
    }
    emergencyContact {
      name
      relation
      phone
    }
    address {
      country
      city
      postalCode
      building
      street
      floorNo
      apartment
    }
    drivingLicense {
      hasLicense
      type
      expiryDate
    }
  }
}
```

---

### **Customization**

1. **GraphQL Endpoint**:
   Update the GraphQL URI in `App.tsx`:
   ```javascript
   uri: "http://localhost:4000/graphql",
   ```

2. **User Profile Placeholder**:
   Replace `photo.jpg` and `logo.png` in the `assets` folder with actual images.

3. **Styling**:
   Modify styles in `ProfileCard.tsx`, `Sidebar.tsx`, or other components as needed.

---

### **Dependencies**

- **React**: ^18.x
- **Apollo Client**: ^3.x
- **GraphQL**: ^16.x
- **Material-UI**: ^5.x
- **React Icons**: ^4.x
- **TailwindCSS**: ^3.x

---

