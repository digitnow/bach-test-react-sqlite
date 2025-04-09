# bach-test-react-sqlite
Tester løsninger for en bach-gruppe.

# Opprett mappestruktur
mkdir -p my-app/{client,server}

# Klient (React) versjon 5.1.0
npx create-react-app my-app/client

# eller med Vite:
npm create vite@latest my-app/client -- --template react

# Server (Express)
cd my-app/server
npm init -y
npm install express sqlite3 cors
touch index.js
