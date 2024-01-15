<h1 align="center">Doujinshi Showcase</h1>
<h2 align="center">Self-hosted media server for your doujinshi</h2>

<br/>

<p align="center">
    <img src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Golang badge"/>
    <img src="https://img.shields.io/badge/Gin-0090d1?style=flat&logo=go&logoColor=white" alt="Gin badge"/>
    <img src="https://img.shields.io/badge/TypeScript-2d79c7?style=flat&logo=typescript&logoColor=white" alt="TypeScript badge"/>
    <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=fff&style=flat" alt="Next.js badge"/>
    <img src="https://img.shields.io/badge/Docker-1D63ED?style=flat&logo=docker&logoColor=white" alt="Docker badge"/>
    <img src="https://img.shields.io/badge/Nginx-429d46?style=flat&logo=Nginx&logoColor=white" alt="Docker badge"/>
</p>

Doujinshi Showcase is a simple doujinshi reading server, where you can set up your doujinshi library and view it from any browser.

> Doujinshi (同人誌) is the Japanese term for self-published print works, such as magazines, manga, and novels.
> Doujinshi are often derivative of existing works and created by amateurs, though some professional artists participate in order to publish material outside the regular industry.
>
> &mdash; <cite>Wikipedia</cite>

## 📷 Demo images

![Library](https://raw.githubusercontent.com/JMOrbegoso/doujinshi-showcase/main/img/library.webp 'Library')

![Reading a doujinshi](https://raw.githubusercontent.com/JMOrbegoso/doujinshi-showcase/main/img/read.webp 'Reading a doujinshi')

## ✨ Features

- Databaseless: Do not use a database, instead it read all the doujinshi data from a json file inside each doujinshi folder in your library.
- Fast: It uses infinite scroll with pagination to not slow down the user experience, even in big libraries.
- Secure: Mount your library as a read-only volume without any problems.
- Flexible: Add, edit or remove items to your library on the fly without re-deploying the service.
- Advanced search functions:
  - Search by title.
  - Search by artist.
  - Search by doujinshi circle.
  - Search by tag.
  - Search by parody.
  - Search by parodied character.
- Customization:
  - Choose between dark and light themes.
  - Change the number of doujinshi shown on the home page.

## 📃 Library file structure

In order for your library to be recognized, it must follow this pattern:

```tree
├── 📂 Library
│   ├── 📂 Doujinshi 1
│   │   ├── 🖼️ 001.jpg
│   │   ├── 🖼️ 002.jpg
│   │   ├── 🖼️ .
│   │   ├── 🖼️ .
│   │   ├── 🖼️ .
│   │   └── 📄 metadata.json
│   ├── 📂 Doujinshi 2
│   │   ├── 🖼️ 001.jpg
│   │   ├── 🖼️ 002.png
│   │   ├── 🖼️ .
│   │   ├── 🖼️ .
│   │   ├── 🖼️ .
│   │   └── 📄 metadata.json
│   ├── 📁 Doujinshi 3
│   ├── 📁 .
│   ├── 📁 .
│   ├── 📁 .
```

- **Library root folder** (`Library` in the example above): It can have any name and it is mounted as a Docker volume.
- **Doujinshi folder** (`Doujinshi 1`, `Doujinshi 2`, `Doujinshi 3` folders in the example above): These are the folders of each doujinshi in your library, they contain all the image files of the doujinshi and the `metadata.json` file.
- **Metadata file** (`metadata.json` files in the example above) : Is a JSON file that contains all the metadata of the doujinshi. It follow this schema:

```JSON
{
  "title": "title",
  "artists": [
    "artist 1",
    "artist 2"
  ],
  "circles": [
    "circle 1",
    "circle 2"
  ],
  "category": "doujinshi",
  "tags": [
    "color"
  ],
  "parodies": [
    "parody 1",
    "parody 2"
  ],
  "characters": [
    "character 1",
    "character 2"
  ],
}
```

## 🚀 Running

### 🐋 Run with Docker

```YAML
version: '3.8'
services:
  doujinshi-showcase-api:
    container_name: 'doujinshi-showcase-api'
    image: 'ghcr.io/jmorbegoso/doujinshi-showcase-api:latest'
    restart: 'always'
    user: '1000:1000'
    environment:
      - 'TZ=America/New_York'
      - 'SERVER_URL=http://localhost:3000'
    volumes:
      - '~/library:/library:ro'

  doujinshi-showcase-web:
    container_name: 'doujinshi-showcase-web'
    image: 'ghcr.io/jmorbegoso/doujinshi-showcase-web:latest'
    restart: 'always'
    user: '1000:1000'
    environment:
      - 'TZ=America/New_York'
      - 'API_URL=http://doujinshi-showcase-api:8080'
    depends_on:
      - 'doujinshi-showcase-api'

  doujinshi-showcase-server:
    container_name: 'doujinshi-showcase-server'
    image: 'ghcr.io/jmorbegoso/doujinshi-showcase-server:latest'
    restart: 'always'
    environment:
      - 'TZ=America/New_York'
    volumes:
      - '~/library:/library:ro'
    ports:
      - '3000:80'
    depends_on:
      - 'doujinshi-showcase-api'
      - 'doujinshi-showcase-web'
```

#### Docker compose environment variables

| Variable   | Description                | Services         | Example                         |
| ---------- | -------------------------- | ---------------- | ------------------------------- |
| TZ         | Timezone                   | api, web, server | America/New_York                |
| SERVER_URL | External url of the Server | api              | http\:\/\/192\.168\.1\.10\:3000 |

## 🧑‍💻 Author

**JMOrbegoso**

- Website: [jmorbegoso.com](https://www.jmorbegoso.com)
- Github: [@JMOrbegoso](https://github.com/JMOrbegoso/)
- LinkedIn: [@jmorbegosodev](https://www.linkedin.com/in/jmorbegosodev/)
