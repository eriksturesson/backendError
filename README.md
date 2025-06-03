<center>

# Backend-error

Simple logging

<img alt="GitHub package.json version (master)" src="https://img.shields.io/github/package-json/v/eriksturesson/backendError/master">
<img alt="npm" src="https://img.shields.io/npm/dy/@eriksturesson/backend-error?label=npm%20downloads">

</center>

## Installation

```bash
npm install @eriksturesson/backend-error
```

## 🔥 Custom BackendError class

Use `BackendError` class for standardized backend error handling:

## Usage

```ts
import { BackendError } from "@eriksturesson/backend-error";

throw BackendError.BadRequest("Missing required field");
```

Or construct it manually for full control:

```ts
const error = new BackendError({
  message: "Something went terribly wrong",
  severity: "critical",
  showUser: true,
  code: 500,
  data: { context: "PaymentService", id: 12345 },
});
```

Properties available:

- `message`: The error message
- `code`: HTTP status code
- `isOperational`: Marks it as a handled error (vs. crash)
- `showUser`: Whether frontend should show the message
- `severity`: "info" | "warning" | "error" | "critical"
- `data`: Additional metadata (optional and anything accepted)

You can extend it for custom domains too.

## 🧠 Example: With Express + showUser handling

```ts
import { BackendError } from "@eriksturesson/backend-error";

app.get("/user/:id", async (req, res, next) => {
  try {
    const user = null;
    if (!user) throw BackendError.NotFound("User not found");
    res.json(user);
  } catch (err) {
    if (err instanceof BackendError && err.showUser) {
      res.status(err.code ?? 400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
    next(err);
  }
});
```

## Available static error constructors

- `BackendError.BadRequest(message: string)` // 400, showUser: true
- `BackendError.Unauthorized(message: string)` // 401, showUser: true
- `BackendError.Forbidden(message: string)` // 403, showUser: true
- `BackendError.NotFound(message: string)` // 404, showUser: true
- `BackendError.Conflict(message: string)` // 409, showUser: true
- `BackendError.UnprocessableEntity(message: string)`// 422, showUser: true
- `BackendError.Internal(message: string)` // 500, showUser: false
- `BackendError.ServiceUnavailable(message: string)` // 503, showUser: false

## 🧩 httpErrorFormatter(error) – Format backend errors for HTTP responses

This helper takes an Error (or BackendError) and returns a plain object with:

✅ status – an HTTP status code (number)

✅ body – a JSON.stringify'd string representing the error (already parsed)

It’s designed to be simple and universal – you can use it with any framework (Azure Functions, Express, etc).

🔧 Example usage

```ts
import { BackendError, httpErrorFormatter } from "@eriksturesson/backend-error";

try {
  throw BackendError.Internal("Something went very wrong."); // 👈 your static factory pattern
} catch (err) {
  const { status, body } = await httpErrorFormatter(err);

  return {
    status,
    headers: {
      ...getCorsHeaders(request.headers.get("origin")), // Add CORS headers yourself
    },
    body,
  };
}
```

⚠️ Important
This function does not include any HTTP headers – especially no CORS headers.
Why? Because every environment has different CORS rules.

If you're using Azure Functions, Express, or something else, you'll need to add CORS manually:

## 🧩 Types

```ts
export type Severity = "info" | "warning" | "error" | "critical";
```

```ts
export interface BackendErrorOptions {
  message: string;
  isOperational?: boolean;
  showUser?: boolean;
  severity?: Severity;
  code?: number;
  data?: any;
}
```

---

## 🌐 Repo

[https://github.com/eriksturesson/backendError](https://github.com/eriksturesson/cloud-logger)

---

Created by [@eriksturesson](https://eriksturesson.se)
