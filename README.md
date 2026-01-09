# 🎯 Angular Todo App with Signals | Modern Task Management Application



[]

> **A modern Angular 21 Todo Application using Signals, Standalone Components, and LocalStorage (Work in Progress). This tutorial project demonstrates the initial phase of building a task management app.**



---

## 📋 Table of Contents

- [Overview](#overview)
- [Progress Status](#progress-status)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Tutorial Reference](#tutorial-reference)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🌟 Overview

**Task Master** is a modern Angular Todo Application project currently under development. The goal is to build a production-ready app with **Angular Signals, Standalone Components, and LocalStorage**.

This project is a **learning journey**: it allows you to explore modern Angular features while building a functional Todo app step by step.

Currently, the project **includes the initial setup and component creation** as per the tutorial. More features like task editing, filtering, sorting, and persistent storage will be implemented in later stages.

---

## ⏳ Progress Status

**Current Completion:** \~15–20%

### Completed So Far (Initial Phase)

- Angular project created (`ng new todo-app`)
- `todo-app` component generated
- Root component (`app.ts` and `app.html`) updated to include `todo-app`
- Initial imports and Angular modules added (`FormsModule`, `NgClass`, `DatePipe`)
- Standalone component setup for `todo-app`

### Next Steps

- Implement **task creation and display**
- Add **task editing and deletion**
- Integrate **LocalStorage persistence**
- Add **status filtering, sorting, and search**
- Finalize **modern UI with animations**

> ⚠️ Note: This is an ongoing project. The tutorial is being followed step by step, and features will be added progressively.

---

## ✨ Key Features (Planned)

- 📝 **Create Tasks**
- ✏️ **Edit Tasks**
- 🗑️ **Delete Tasks**
- ✅ **Toggle Completion Status**
- 🔍 **Search Tasks**
- 🎯 **Filter by Status**
- 🔄 **Sort Tasks**
- 💾 **LocalStorage Persistence**
- 🎨 **Modern Dark Theme with Animations**
- 📱 **Responsive Design**

---

## 🛠️ Technologies Used

| Technology                       | Purpose              | Version        |
| -------------------------------- | -------------------- | -------------- |
| Angular                          | Frontend Framework   | 21             |
| TypeScript                       | Programming Language | 5.0+           |
| Signals                          | State Management     | Built-in       |
| Standalone Components            | Architecture         | Angular 21     |
| FormsModule / NgClass / DatePipe | UI & Forms           | Angular Common |
| Bootstrap 5                      | Styling              | 5.3+           |
| Font Awesome                     | Icons                | 6+             |
| CSS3                             | Styling & Animations | Latest         |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Angular CLI** ≥ 18

```bash
npm install -g @angular/cli@latest
ng version
```

### Installation

```bash
git clone https://github.com/yourusername/angular-todo-app.git
cd angular-todo-app
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) to view the app.

---

## 📁 Project Structure (Initial Phase)

```
angular-todo-app/
├── src/
│   ├── app/
│   │   ├── todo-app/
│   │   │   ├── todo-app.ts      # Standalone component logic (initial setup)
│   │   │   ├── todo-app.html    # Template placeholder
│   │   │   ├── todo-app.css     # Initial styles
│   │   │   └── todo-app.spec.ts # Unit test scaffold
│   │   ├── app.ts               # Root component
│   │   ├── app.html             # Root template
│   │   └── app.config.ts        # Config (empty / placeholder)
├── index.html
├── main.ts
├── styles.css
├── angular.json
├── package.json
├── README.md
└── TUTORIAL.md                  # Step-by-step guide being followed
```

---

## 📖 Tutorial Reference

This project is being built following a **step-by-step tutorial**:

- **Step 1:** Create Angular project
- **Step 2:** Generate `todo-app` component
- **Step 3:** Update root component to use `todo-app`
- **Step 4:** Import required Angular modules
- **Step 5:** Initial component setup and standalone configuration

> Progress beyond this tutorial is planned but **not yet implemented**.

---

## 🤝 Contributing

Contributions are welcome! Even though this is a work-in-progress, feel free to:

- Report issues
- Suggest improvements
- Submit Pull Requests

---

## 📄 License

MIT License – see [LICENSE](LICENSE)

---

## 💬 Support

- 📖 [Tutorial](todoAppTutorial.md)
- 🐛 [Report Issues](https://github.com/yourusername/angular-todo-app/issues)
- 💬 [Discussions](https://github.com/yourusername/angular-todo-app/discussions)

---

> ⚡ **Note:** This README is meant to show **project progress so far**. The app is in early stages, and features will be implemented incrementally following the tutorial steps.


