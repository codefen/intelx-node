
# README.md for Intel Search API

## Installation and Setup

### Prerequisites

- Node.js

### Installation

```bash
npm install
```

### Starting the Server

```bash
npm start
```

---

**Note:** This API requires to set up the ENV viariables in order to use it such as:

- **INTEL_KEY** `- Intelx key`
- **INTEL_DOMAIN** `- Intelx endpoint`

---

## API routes

The backend provides several endpoints based off the intelx documentation.

### Initialize Search

- **Endpoint:** `POST /v1/intel/initializeSearch`
- **Description:** Initializes a search operation with given parameters.

### Find by URL

- **Endpoint:** `POST /v1/intel/findByUrl`
- **Description:** Searches for intelligence data using specific parameters.

### Find Preview

- **Endpoint:** `POST /v1/intel/findPreview`
- **Description:** Retrieves a preview of the intelligence data based on provided identifiers.

### Read by URL

- **Endpoint:** `POST /v1/intel/readByUrl`
- **Description:** Reads the entire content of a document file from a URL.

## Pending / Todo API routes

- **Endpoint:** `a`
- **Description:** b.
