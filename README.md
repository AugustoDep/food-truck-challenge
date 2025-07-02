# 🚚 Food Truck Challenge

An interactive web application that allows users to explore a curated list of food trucks by location, name, and food type — served with dynamic maps, intuitive filters, and a polished user experience. Built with Angular and ASP.NET Core.

---

## 📸 Demo

> https://food-truck-challenge-g7bafvg0cueqfdg8.brazilsouth-01.azurewebsites.net/

---

## 🧱 Tech Stack

| Layer       | Technology                  | Purpose                                  |
|-------------|------------------------------|------------------------------------------|
| Frontend    | Angular                      | UI rendering, dynamic interactions       |
| Backend     | ASP.NET Core (.NET 8)        | RESTful API, business logic              |
| Mapping     | Google Maps JavaScript API   | Real-time map, markers, InfoWindows      |
| Hosting     | Azure App Service            | Production deployment                    |

---

## 🚀 Features

- 🗺️ Interactive map with dynamic food truck markers
- 🔍 Filterable listings by food type, vendor, or name
- 💬 Custom InfoWindows with live location awareness
- 🔐 Clean separation between frontend and backend logic

---

## ⚙️ Environment Setup

### 🔧 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js + Angular CLI](https://angular.io/cli)
- Google Maps API Key

### 🛠️ Run Locally

```bash
# Clone the repo
git clone https://github.com/AugustoDep/food-truck-challenge
cd food-truck-challenge

# Install Angular dependencies
cd ClientApp
npm install
ng serve
